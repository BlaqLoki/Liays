import { NextResponse } from "next/server";
import { validateTarget, runAudit, QuotaError, type AuditResult } from "@/lib/audit";

/**
 * Public audit endpoint.
 *
 * This calls a quota-limited Google API on behalf of anonymous visitors, so it
 * needs three guards: URL vetting (in lib/audit.ts), a per-IP rate limit, and a
 * result cache so the same site checked twice only costs one upstream call.
 *
 * The cache and rate limiter live in module memory. On serverless that means
 * per-instance rather than global — imperfect, but it flattens the common cases
 * (someone refreshing, or a page of visitors auditing the same popular site)
 * without adding a database to a marketing site.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const CACHE_TTL_MS = 60 * 60 * 1000;

const hits = new Map<string, number[]>();
const cache = new Map<string, { at: number; result: AuditResult }>();

function clientIp(request: Request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t > RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "That's a few checks in a short time. Try again in ten minutes." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const raw = typeof (body as { url?: unknown })?.url === "string" ? (body as { url: string }).url : "";

  const target = await validateTarget(raw);
  if (!target.ok) {
    return NextResponse.json({ error: target.error }, { status: 400 });
  }

  const cached = cache.get(target.url);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return NextResponse.json({ ...cached.result, cached: true });
  }

  try {
    const result = await runAudit(target.url);

    cache.set(target.url, { at: Date.now(), result });
    if (cache.size > 500) {
      const oldest = [...cache.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      if (oldest) cache.delete(oldest[0]);
    }

    return NextResponse.json(result);
  } catch (err) {
    // Our quota, not their site. Say so — telling a visitor their site is
    // broken when it isn't would be both wrong and embarrassing on a later call.
    if (err instanceof QuotaError) {
      console.error("[audit] PageSpeed quota exhausted. Set PAGESPEED_API_KEY to raise it.");
      return NextResponse.json(
        {
          error:
            "We've hit our checking limit for the moment — this is on our end, not your site. Try again in a few minutes.",
        },
        { status: 503 }
      );
    }

    console.error("[audit] failed:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't check that site. It may be blocking automated requests, or too slow to respond.",
      },
      { status: 502 }
    );
  }
}
