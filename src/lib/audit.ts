import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/**
 * Shared logic for the public site audit tool.
 *
 * This module accepts a URL typed by a stranger and makes the server fetch it,
 * which is a server-side request forgery risk if left unguarded. Everything in
 * `validateTarget` exists to stop someone using liays.ca as a probe into
 * private networks.
 */

export type Finding = {
  id: string;
  severity: "critical" | "warning" | "good";
  title: string;
  detail: string;
};

export type AuditResult = {
  url: string;
  score: number | null;
  seo: number | null;
  lcpSeconds: number | null;
  findings: Finding[];
  summary: string;
};

/** Hostnames that must never be fetched, whatever the visitor types. */
const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "metadata.google.internal",
  "169.254.169.254", // cloud instance metadata
]);

function isPrivateIPv4(ip: string) {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => Number.isNaN(n))) return true;
  const [a, b] = p;
  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    a >= 224
  );
}

function isPrivateIPv6(ip: string) {
  const v = ip.toLowerCase();
  return (
    v === "::1" ||
    v === "::" ||
    v.startsWith("fc") ||
    v.startsWith("fd") ||
    v.startsWith("fe80") ||
    v.startsWith("::ffff:")
  );
}

/**
 * Parse and vet a visitor-supplied URL.
 * Resolves DNS and checks the answer, so a public hostname pointing at a
 * private address is rejected too.
 */
export async function validateTarget(
  raw: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const trimmed = (raw || "").trim();
  if (!trimmed) return { ok: false, error: "Enter a website address." };
  if (trimmed.length > 300) return { ok: false, error: "That address is too long." };

  let parsed: URL;
  try {
    // Only assume https for a bare hostname. If the visitor typed a scheme,
    // parse it as-is so the protocol check below actually sees it.
    const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed);
    parsed = new URL(hasScheme ? trimmed : `https://${trimmed}`);
  } catch {
    return { ok: false, error: "That doesn't look like a website address." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "Only http and https addresses can be checked." };
  }

  if (parsed.username || parsed.password) {
    return { ok: false, error: "Remove the login details from the address." };
  }

  const host = parsed.hostname.toLowerCase().replace(/\.$/, "");

  if (BLOCKED_HOSTNAMES.has(host) || host.endsWith(".localhost") || host.endsWith(".internal")) {
    return { ok: false, error: "That address can't be checked." };
  }

  // A bare hostname with no dot can't be a public site.
  if (!host.includes(".") && !isIP(host)) {
    return { ok: false, error: "Enter a full address, like yourbusiness.ca" };
  }

  if (isIP(host)) {
    const priv = isIP(host) === 4 ? isPrivateIPv4(host) : isPrivateIPv6(host);
    if (priv) return { ok: false, error: "That address can't be checked." };
  } else {
    // Resolve and check where it actually points.
    try {
      const answers = await lookup(host, { all: true });
      if (answers.length === 0) {
        return { ok: false, error: "We couldn't find that domain." };
      }
      for (const a of answers) {
        const priv = a.family === 4 ? isPrivateIPv4(a.address) : isPrivateIPv6(a.address);
        if (priv) return { ok: false, error: "That address can't be checked." };
      }
    } catch {
      return { ok: false, error: "We couldn't find that domain — check the spelling." };
    }
  }

  return { ok: true, url: parsed.origin + (parsed.pathname === "/" ? "" : parsed.pathname) };
}

/**
 * Raised when OUR quota with Google is exhausted — nothing to do with the
 * visitor's site. Kept distinct so we never tell someone their site is broken
 * when the truth is we ran out of checks.
 */
export class QuotaError extends Error {
  constructor() {
    super("PageSpeed quota exhausted");
    this.name = "QuotaError";
  }
}

/**
 * Did Lighthouse actually run this audit AND find a problem?
 *
 * A missing audit is NOT a failure. `is-on-https` lives in the best-practices
 * category, so if that category isn't requested the audit is absent — and
 * `undefined === 1` is false, which once made this tool report "No HTTPS" about
 * sites served over HTTPS. Saying a site is broken when it isn't is worse than
 * saying nothing, especially when these findings get read aloud on a call.
 */
function auditFailed(audits: Record<string, unknown>, id: string): boolean {
  const entry = audits?.[id] as
    | { score?: unknown; scoreDisplayMode?: string }
    | undefined;

  if (!entry) return false;
  if (entry.scoreDisplayMode === "notApplicable") return false;
  if (entry.scoreDisplayMode === "informative") return false;
  if (entry.scoreDisplayMode === "manual") return false;

  return typeof entry.score === "number" && entry.score < 1;
}

/** Google's own mobile assessment. */
async function runPageSpeed(url: string) {
  const key = process.env.PAGESPEED_API_KEY;
  const endpoint =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed" +
    `?url=${encodeURIComponent(url)}&strategy=mobile` +
    // best-practices is what carries is-on-https. Without it that audit is
    // simply absent from the response.
    "&category=performance&category=seo&category=accessibility&category=best-practices" +
    (key ? `&key=${key}` : "");

  const res = await fetch(endpoint, { signal: AbortSignal.timeout(60000) });

  if (res.status === 429) throw new QuotaError();
  if (!res.ok) throw new Error(`PageSpeed returned ${res.status}`);

  const data = await res.json();
  const cats = data?.lighthouseResult?.categories ?? {};
  const audits = data?.lighthouseResult?.audits ?? {};
  const pct = (v: unknown) => (typeof v === "number" ? Math.round(v * 100) : null);

  return {
    performance: pct(cats.performance?.score),
    seo: pct(cats.seo?.score),
    accessibility: pct(cats.accessibility?.score),
    lcpSeconds:
      typeof audits["largest-contentful-paint"]?.numericValue === "number"
        ? +(audits["largest-contentful-paint"].numericValue / 1000).toFixed(1)
        : null,
    // Positively failed, not merely unmeasured.
    httpsFailed: auditFailed(audits, "is-on-https"),
    viewportFailed: auditFailed(audits, "viewport"),
  };
}

export async function runAudit(url: string): Promise<AuditResult> {
  const psi = await runPageSpeed(url);
  const findings: Finding[] = [];

  const add = (f: Finding) => findings.push(f);

  if (typeof psi.performance === "number") {
    if (psi.performance < 50) {
      add({
        id: "speed",
        severity: "critical",
        title: `Mobile speed: ${psi.performance}/100`,
        detail:
          "Google rates anything under 50 as poor. Slow pages lose visitors before they see anything, and speed is a ranking factor.",
      });
    } else if (psi.performance < 90) {
      add({
        id: "speed",
        severity: "warning",
        title: `Mobile speed: ${psi.performance}/100`,
        detail: "Google calls 90+ good. There's real room here.",
      });
    } else {
      add({
        id: "speed",
        severity: "good",
        title: `Mobile speed: ${psi.performance}/100`,
        detail: "Google rates this as good. Nice.",
      });
    }
  }

  if (typeof psi.lcpSeconds === "number") {
    add({
      id: "lcp",
      severity: psi.lcpSeconds > 4 ? "critical" : psi.lcpSeconds > 2.5 ? "warning" : "good",
      title: `Main content appears in ${psi.lcpSeconds}s`,
      detail:
        psi.lcpSeconds > 2.5
          ? "Google's threshold for a good experience is 2.5 seconds on mobile."
          : "Comfortably inside Google's 2.5 second threshold.",
    });
  }

  if (psi.viewportFailed) {
    add({
      id: "viewport",
      severity: "critical",
      title: "Not set up for phones",
      detail:
        "The page has no mobile viewport tag, so phones render it at desktop width. Most local searches happen on a phone.",
    });
  }

  if (psi.httpsFailed) {
    add({
      id: "https",
      severity: "critical",
      title: "No HTTPS",
      detail: "Chrome shows “Not secure” in the address bar next to the business name.",
    });
  }

  if (typeof psi.seo === "number") {
    add({
      id: "seo",
      severity: psi.seo < 70 ? "critical" : psi.seo < 90 ? "warning" : "good",
      title: `Search readiness: ${psi.seo}/100`,
      detail:
        psi.seo < 90
          ? "Google's automated SEO checks found issues — usually missing titles, descriptions, or link text."
          : "The basics Google looks for are in place.",
    });
  }

  if (typeof psi.accessibility === "number") {
    add({
      id: "a11y",
      severity: psi.accessibility < 70 ? "warning" : "good",
      title: `Accessibility: ${psi.accessibility}/100`,
      detail:
        psi.accessibility < 70
          ? "Contrast, labels, or alt text need work. This affects real customers, and in some sectors it's a legal requirement."
          : "No major accessibility problems detected.",
    });
  }

  const criticals = findings.filter((f) => f.severity === "critical").length;
  const warnings = findings.filter((f) => f.severity === "warning").length;

  const summary =
    criticals > 0
      ? `We found ${criticals} serious issue${criticals === 1 ? "" : "s"}${warnings ? ` and ${warnings} smaller one${warnings === 1 ? "" : "s"}` : ""}.`
      : warnings > 0
        ? `No serious problems, but ${warnings} thing${warnings === 1 ? "" : "s"} worth improving.`
        : "This site is in good shape. Genuinely — nothing major to flag.";

  return {
    url,
    score: psi.performance,
    seo: psi.seo,
    lcpSeconds: psi.lcpSeconds,
    findings,
    summary,
  };
}
