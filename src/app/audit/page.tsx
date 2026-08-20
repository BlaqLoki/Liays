/* Hallmark · genre: editorial · macrostructure: Split Studio · design-system: design.md · designed-as-app
 * Tool page. The instrument is the hero — no enrichment, no preamble above it.
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AuditTool } from "@/components/audit-tool";

export const metadata: Metadata = {
  title: "Free website check — Liays Inc",
  description:
    "Check how your website performs on mobile using Google's own test. Free, instant, no email required. Built by Liays Inc, Winnipeg.",
};

const checks = [
  {
    title: "Mobile speed",
    copy: "How fast the page loads on a phone, scored by Google's Lighthouse engine.",
  },
  {
    title: "Search readiness",
    copy: "Whether the basics Google looks for — titles, descriptions, link text — are in place.",
  },
  {
    title: "Phone layout",
    copy: "Whether the site was actually built for phones, or just renders desktop-width and shrinks.",
  },
  {
    title: "Accessibility",
    copy: "Contrast, labels, and alt text — which affect real customers and, in some sectors, compliance.",
  },
];

export default function AuditPage() {
  return (
    <>
      {/* The tool is the hero. */}
      <section className="px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1 className="font-display text-balance text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
              How does your site actually perform?
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/60">
              Enter your address and we&apos;ll run Google&apos;s own mobile test
              against it. You get the real numbers — the same ones Google uses
              when deciding where you rank.
            </p>
            {/* Suspense is required: AuditTool reads ?site= via useSearchParams,
                and without a boundary that would force the whole page to render
                dynamically on every request. */}
            <div className="mt-10">
              <Suspense
                fallback={
                  <div className="min-h-[52px] rounded-full border border-white/15 bg-ink" />
                }
              >
                <AuditTool />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What it measures — claim left, list right */}
      <section className="border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              What we check, and why it costs you money.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              These aren&apos;t our opinions. Every number comes from Lighthouse,
              the same open-source tool Google runs against your site whether you
              ask it to or not.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {checks.map((c) => (
                <div key={c.title} className="py-5">
                  <dt className="font-display text-base font-semibold tracking-tight">
                    {c.title}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-white/55">{c.copy}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Honest framing — paper, direction flips */}
      <section className="bg-paper px-6 py-20 text-ink lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              If your site is fine, we&apos;ll say so.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-black/60">
              This isn&apos;t a lead magnet that finds a problem no matter what.
              Plenty of sites come back healthy, and when yours does the tool says
              exactly that.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-black/60">
              We publish our prices for the same reason. You should be able to
              work out whether we&apos;re worth talking to before you talk to us.
            </p>
            <div className="mt-8">
              <MagneticButton href="/pricing" className="whitespace-nowrap">
                See what a rebuild costs
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:order-1">
            <dl className="divide-y divide-black/10 border-y border-black/10">
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-black/60">Cost to check</dt>
                <dd className="font-display text-sm font-bold tabular-nums">Free</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-black/60">Email required</dt>
                <dd className="font-display text-sm font-bold">No</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-black/60">Time to run</dt>
                <dd className="font-display text-sm font-bold tabular-nums">~20 sec</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-black/60">Rebuild starts at</dt>
                <dd className="font-display text-sm font-bold tabular-nums">$999</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
