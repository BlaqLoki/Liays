import type { Metadata } from "next";
import { ArrowUpRight, Users, Laptop, GraduationCap, LifeBuoy } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Notion Training — Liays Inc",
  description: "Hands-on Notion workshops and consulting for Winnipeg teams.",
};

const formats = [
  {
    icon: Users,
    title: "Team Workshop",
    length: "Half-day or full-day",
    copy: "On-site or remote, for teams of 4–25. We build your real workspace live, together.",
  },
  {
    icon: Laptop,
    title: "1:1 Consulting",
    length: "Ongoing, by the hour",
    copy: "Founders and ops leads who want a Notion architect on call as things evolve.",
    id: "consulting",
  },
  {
    icon: GraduationCap,
    title: "New Hire Onboarding",
    length: "60–90 minutes",
    copy: "A repeatable session that gets every new team member fluent in your systems fast.",
  },
];

const agenda = [
  "Audit how your team currently tracks work, clients, and content",
  "Design a workspace structure matched to your actual workflows",
  "Build it together, live — databases, views, templates, automations",
  "Train every role on the parts of the system they'll touch daily",
  "Leave with documentation and 30 days of async Slack/email support",
];

export default function NotionTrainingPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Notion training</SectionLabel>
            <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Stop paying for a tool your team avoids.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              We run live, hands-on Notion training built around how your business
              actually operates — not a generic template tour. Your team leaves
              having built the system themselves.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="/contact">
                Book a training session
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton href="#workshops" variant="outline">
                See formats
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Formats */}
      <section id="workshops" className="scroll-mt-24 border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Formats</SectionLabel>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Choose the format that fits your team
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-3">
            {formats.map((f) => (
              <RevealItem key={f.title} className="h-full">
                <div id={f.id} className="scroll-mt-24 flex h-full flex-col rounded-2xl border border-white/10 bg-ink-soft p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-accent">
                    <f.icon size={22} />
                  </div>
                  <h3 className="font-display mt-6 text-xl font-semibold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent/80">
                    {f.length}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{f.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Agenda — paper section */}
      <section className="bg-paper px-6 py-24 text-ink lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionLabel tone="onPaper">What a session looks like</SectionLabel>
            <h2 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Practical, not theoretical.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/60">
              No generic slide decks. We work in your actual workspace, on your actual
              projects, so what we build is what your team uses on Monday morning.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="space-y-4">
              {agenda.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm"
                >
                  <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-black/75">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Support */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-2xl border border-white/10 bg-ink-soft p-10 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent">
            <LifeBuoy size={26} />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight">
              You&apos;re not on your own after we leave
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
              Every training includes 30 days of async support — send a question, get
              an answer, keep the workspace improving long after the session ends.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 pb-28 lg:px-10 lg:pb-36">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Ready to make Notion click for your whole team?
          </h2>
          <MagneticButton href="/contact" className="whitespace-nowrap">
            Book a session
            <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
