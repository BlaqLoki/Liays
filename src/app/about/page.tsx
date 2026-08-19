/* Hallmark · genre: editorial · macrostructure: Long Document · design-system: design.md · designed-as-app
 * Content page: continuous prose, inline heads, no marketing scaffolding.
 */
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BOOKING } from "@/lib/links";

export const metadata: Metadata = {
  title: "About — Liays Inc",
  description:
    "Liays Inc is a Winnipeg studio building websites and Notion systems for local businesses.",
};

const values = [
  {
    title: "Built to be used",
    copy: "A beautiful site nobody updates and a Notion workspace nobody opens are the same failure. We design for the Monday after launch.",
  },
  {
    title: "Plain language, always",
    copy: "No jargon-first pitches. We explain trade-offs clearly so you're deciding with us, not guessing.",
  },
  {
    title: "Local, and proud of it",
    copy: "We work with Winnipeg businesses because we understand the market — and we show up in person when it helps.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Opening — a document, not a hero */}
      <section className="px-6 pb-12 pt-12 lg:px-10 lg:pt-20">
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-accent">Winnipeg, Manitoba</p>
          <h1 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            We started Liays because we kept seeing the same gap.
          </h1>
        </Reveal>
      </section>

      {/* Continuous prose */}
      <section className="px-6 pb-16 lg:px-10 lg:pb-24">
        <Reveal className="mx-auto max-w-3xl">
          <div className="space-y-6 text-lg leading-relaxed text-white/65">
            <p>
              Businesses would pay for a beautiful new website and a shiny new
              Notion workspace — and six months later, nobody on the team was
              actually using either one. Liays Inc exists to close that gap: we
              build the thing, then we make sure your team can run it without us.
            </p>
            <p>
              The pattern was always the same, on both sides of the work. The
              tools were never the problem. The handoff was. A site gets built by
              people who leave, and an internal system gets set up by someone who
              never has to live in it.
            </p>
            <p>
              So we do both under one roof. The same people who design your site
              can sit down with your staff and build the Notion workspace that
              keeps the business running behind the scenes. No handoff, no lost
              context, no third vendor to brief.
            </p>
          </div>

          <hr className="my-14 border-white/10" />

          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Where we are right now
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-white/65">
            <p>
              We&apos;re early, and we&apos;d rather say so than pretend
              otherwise. Two projects are live and built end to end — EventSplit,
              a full event-finance platform we still run, and a complete site for
              the Ezirim Foundation.
            </p>
            <p>
              We&apos;re building for restaurants, cleaning companies, plumbers,
              real estate agents, clinics, and non-profits across Winnipeg — and
              we&apos;re taking founding clients at founding rates while the list
              is still short. Our prices are published on the site, in full,
              because you shouldn&apos;t have to book a call to learn what
              something costs.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values — inline within the document, not a card grid */}
      <section className="bg-paper px-6 py-16 text-ink lg:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            A few things we won&apos;t compromise on.
          </h2>
          <dl className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {values.map((v) => (
              <div key={v.title} className="py-6">
                <dt className="font-display text-lg font-semibold tracking-tight">
                  {v.title}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-black/60">
                  {v.copy}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Want to talk it through before you commit?
          </h2>
          <div className="mt-10">
            <MagneticButton href={BOOKING.freeConsult} external className="whitespace-nowrap">
              Book a free consult
              <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
