"use client";

import { useState, useEffect, useCallback, useRef, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";
import type { AuditResult, Finding } from "@/lib/audit";
import { BOOKING } from "@/lib/links";

type State =
  | { status: "idle" }
  | { status: "running" }
  | { status: "done"; result: AuditResult }
  | { status: "error"; message: string };

const severityStyle: Record<Finding["severity"], { dot: string; label: string }> = {
  critical: { dot: "bg-accent", label: "Needs fixing" },
  warning: { dot: "bg-gold", label: "Worth improving" },
  good: { dot: "bg-white/30", label: "Fine" },
};

export function AuditTool() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [url, setUrl] = useState("");

  /**
   * A shared report is just ?site=theirdomain.ca — the audit re-runs rather than
   * loading a stored result. Nothing to persist, and the link can never show a
   * score that's months out of date.
   */
  const searchParams = useSearchParams();
  const sharedSite = searchParams.get("site");
  const autoRan = useRef(false);

  const runAudit = useCallback(async (target: string) => {
    const trimmed = target.trim();
    if (!trimmed) return;

    setState({ status: "running" });

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Something went wrong." });
        return;
      }

      setState({ status: "done", result: data });

      // Make the current report linkable without a navigation.
      if (typeof window !== "undefined") {
        const next = new URL(window.location.href);
        next.searchParams.set("site", trimmed);
        window.history.replaceState(null, "", next.toString());
      }
    } catch {
      setState({
        status: "error",
        message: "Couldn't reach the checker. Check your connection and try again.",
      });
    }
  }, []);

  // Arriving on a shared link runs the check straight away.
  useEffect(() => {
    if (!sharedSite || autoRan.current) return;
    autoRan.current = true;
    setUrl(sharedSite);
    runAudit(sharedSite);
  }, [sharedSite, runAudit]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runAudit(url);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="audit-url" className="sr-only">
          Your website address
        </label>
        <input
          id="audit-url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.ca"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={state.status === "running"}
          className="focus-ring min-h-[52px] w-full rounded-full border border-white/15 bg-ink px-6 py-3.5 text-base text-[var(--color-fg-on-ink)] placeholder:text-white/40 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state.status === "running" || !url.trim()}
          className="focus-ring inline-flex min-h-[52px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === "running" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Checking…
            </>
          ) : (
            "Check my site"
          )}
        </button>
      </form>

      <p className="mt-3 text-xs text-white/40">
        Free, no email required. Takes about 20 seconds — we run Google&apos;s own
        Lighthouse test against your site.
      </p>

      {state.status === "running" && (
        <p role="status" aria-live="polite" className="mt-8 text-sm text-white/55">
          Running Google&apos;s mobile test. This genuinely takes a few seconds —
          it loads your whole site the way a phone would.
        </p>
      )}

      {state.status === "error" && (
        <p role="alert" className="mt-8 text-sm text-accent-soft">
          {state.message}
        </p>
      )}

      {state.status === "done" && <Results result={state.result} />}
    </div>
  );
}

/**
 * Copies a link to this exact report.
 *
 * This is the outbound move: run the check on a prospect's site before you call
 * them, copy the link, and send it. They open it, it re-runs against their own
 * site, and the numbers come from Google rather than from you.
 */
function ShareReport({ site }: { site: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const link = `${window.location.origin}/audit?site=${encodeURIComponent(site)}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, or the viewer declined). Select the
      // link instead so it can still be copied by hand.
      window.prompt("Copy this link:", link);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="focus-ring mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-2 whitespace-nowrap text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
    >
      {copied ? "Link copied" : "Copy link to this report"}
    </button>
  );
}

function Results({ result }: { result: AuditResult }) {
  const criticals = result.findings.filter((f) => f.severity === "critical");

  return (
    <div aria-live="polite" className="mt-12 border-t border-white/15 pt-10">
      <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Mobile score
          </p>
          <p className="font-display mt-3 text-6xl font-bold tabular-nums leading-none tracking-tight">
            {result.score ?? "—"}
            <span className="text-2xl text-white/40">/100</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{result.summary}</p>
          <p className="mt-2 break-all text-xs text-white/40">{result.url}</p>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/45">
            Google scores mobile speed on a simulated mid-range phone over a slow
            connection, so your site will feel faster than this on a good phone
            and a strong signal. These are the conditions Google uses when it
            decides where you rank.
          </p>
          <ShareReport site={result.url} />
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {result.findings.map((f) => (
            <li key={f.id} className="flex gap-4 py-4">
              <span
                aria-hidden="true"
                className={`mt-2 h-2 w-2 shrink-0 rounded-full ${severityStyle[f.severity].dot}`}
              />
              <div>
                <p className="text-sm font-semibold">
                  {f.title}
                  <span className="sr-only"> — {severityStyle[f.severity].label}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{f.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 border-t border-white/10 pt-8">
        {criticals.length > 0 ? (
          <>
            <p className="font-display max-w-2xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Most of this is fixable in a couple of weeks.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
              A rebuild starts at $999 and our full pricing is published — no call
              required to find out what it costs.
            </p>
          </>
        ) : (
          <>
            <p className="font-display max-w-2xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Your site is in good shape.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
              We&apos;d rather tell you that than sell you something you don&apos;t
              need. If you ever want a second pair of eyes on the business
              systems behind it, that&apos;s the other half of what we do.
            </p>
          </>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={criticals.length > 0 ? BOOKING.projectCall : BOOKING.freeConsult}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft"
          >
            {criticals.length > 0 ? "Get a quote to fix it" : "Talk to us"}
            <ArrowUpRight size={16} />
          </a>
          <a
            href="/pricing"
            className="focus-ring inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-[var(--color-fg-on-ink)] transition-colors duration-200 hover:border-white/50"
          >
            See pricing
          </a>
        </div>
      </div>
    </div>
  );
}
