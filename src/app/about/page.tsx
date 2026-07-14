import type { Metadata } from "next";
import { ArrowUpRight, MapPin, Heart, Zap, Users2 } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "About — Liays Inc",
  description: "Liays Inc is a Winnipeg-based agency building websites and Notion systems for local businesses.",
};

const values = [
  {
    icon: Zap,
    title: "Built to be used",
    copy: "A beautiful site nobody updates and a Notion workspace nobody opens are the same failure. We design for the Monday after launch.",
  },
  {
    icon: Users2,
    title: "Plain language, always",
    copy: "No jargon-first pitches. We explain trade-offs clearly so you're deciding with us, not guessing.",
  },
  {
    icon: Heart,
    title: "Local, and proud of it",
    copy: "We work with Winnipeg businesses because we understand the market — and we show up in person when it helps.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>About Liays</SectionLabel>
            <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              We started Liays because we kept seeing the same gap.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              Businesses would pay for a beautiful new website and a shiny new
              Notion workspace — and six months later, nobody on the team was
              actually using either one. Liays Inc exists to close that gap:
              we build the thing, then we make sure your team can run it
              without us.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/70">
              <MapPin size={13} className="text-accent" />
              Based in Winnipeg, Manitoba
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>How we work</SectionLabel>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              A few things we won&apos;t compromise on
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-3">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-soft p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-accent">
                    <v.icon size={22} />
                  </div>
                  <h3 className="font-display mt-6 text-xl font-semibold tracking-tight">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{v.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Story — paper section */}
      <section className="bg-paper px-6 py-24 text-ink lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-3xl">
          <SectionLabel tone="onPaper">The short version</SectionLabel>
          <h2 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Two disciplines, one team.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-black/65">
            <p>
              Liays Inc was founded in Winnipeg by a small team that had spent
              years split between client-side web design work and internal
              operations consulting. We noticed the same pattern on both
              sides: the tools were never the problem — the handoff was.
            </p>
            <p>
              So we built an agency that does both under one roof. The same
              team that designs your site can sit down with your staff and
              build the Notion workspace that keeps the business running
              behind the scenes. No handoff, no lost context.
            </p>
            <p>
              Today we work with real estate offices, clinics, retailers, and
              service businesses across Winnipeg — building sites that convert
              and systems that stick.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 lg:px-10 lg:py-36">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Want to meet the team before you commit?
          </h2>
          <MagneticButton href="/contact" className="whitespace-nowrap">
            Book a free consult
            <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
