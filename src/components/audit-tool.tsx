"use client";

import { useState, type FormEvent } from "react";
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!url.trim()) return;

    setState({ status: "running" });

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Something went wrong." });
        return;
      }

      setState({ status: "done", result: data });
    } catch {
      setState({
        status: "error",
        message: "Couldn't reach the checker. Check your connection and try again.",
      });
    }
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
