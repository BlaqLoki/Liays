import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Compass, PenTool, Code2, Rocket, LayoutGrid, Workflow } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Services — Liays Inc",
  description: "Website design & build, and Notion-powered systems consulting for Winnipeg businesses.",
};

const process = [
  { icon: Compass, title: "Discover", copy: "A working session on your business, customers, and what the site needs to do." },
  { icon: PenTool, title: "Design", copy: "A distinct visual direction — not a template — reviewed with you before a line of code is written." },
  { icon: Code2, title: "Build", copy: "Fast, accessible, responsive code. You get staging links to watch it come together." },
  { icon: Rocket, title: "Launch", copy: "Domain, hosting, analytics, and a walkthrough so you're never locked out of your own site." },
];

const included = [
  "Custom design — no drag-and-drop templates",
  "Mobile, tablet & desktop responsive layouts",
  "On-page SEO & fast load times built in",
  "Contact forms, booking, or e-commerce as needed",
  "30 days of post-launch support",
  "Optional ongoing maintenance plan",
];

const consultingItems = [
  { icon: LayoutGrid, title: "Workspace architecture", copy: "We map your workflows and build a Notion (or broader tool) structure suited to how your team actually works." },
  { icon: Workflow, title: "Automation & integrations", copy: "Connect forms, calendars, and client tools so information moves without manual re-entry." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Two crafts, built to work together.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              A great website gets people in the door. A workspace your team actually
              uses keeps the business running once they&apos;re there. We do both.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Web Design */}
      <section id="web-design" className="scroll-mt-24 border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Website design &amp; build</SectionLabel>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              A site that looks like it cost more than it did — because it works this hard.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-soft p-7">
                  <span className="font-display text-sm font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-accent">
                    <step.icon size={20} />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{step.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                What&apos;s included
              </h3>
              <ul className="mt-6 space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-ink-soft p-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Typical timeline
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Most marketing sites launch in 3–5 weeks. Larger builds with
                  booking, e-commerce, or custom integrations run 6–9 weeks.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton href="/pricing">See pricing</MagneticButton>
                  <MagneticButton href="/contact" variant="outline">
                    Get a quote
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Consulting */}
      <section id="consulting" className="scroll-mt-24 bg-paper px-6 py-24 text-ink lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel tone="onPaper">Systems &amp; consulting</SectionLabel>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              The tools you already pay for, finally pulling their weight.
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2">
            {consultingItems.map((item) => (
              <RevealItem key={item.title}>
                <div className="h-full rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-accent">
                    <item.icon size={22} />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">{item.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl border border-black/10 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-base leading-relaxed text-black/70">
                Looking for hands-on team training on Notion specifically? That has its own page.
              </p>
              <Link
                href="/notion-training"
                className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Notion Training
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 lg:px-10 lg:py-36">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Not sure which service fits? Let&apos;s figure it out together.
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
