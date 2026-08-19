/* Hallmark · genre: editorial · macrostructure: Split Studio · design-system: design.md · designed-as-app */
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BOOKING } from "@/lib/links";

export const metadata: Metadata = {
  title: "Services — Liays Inc",
  description:
    "Website design & build, and Notion-powered systems consulting for Winnipeg businesses.",
};

const process = [
  {
    title: "Discover",
    copy: "A working session on your business, customers, and what the site needs to do.",
  },
  {
    title: "Design",
    copy: "A distinct visual direction — not a template — reviewed with you before a line of code is written.",
  },
  {
    title: "Build",
    copy: "Fast, accessible, responsive code. You get staging links to watch it come together.",
  },
  {
    title: "Launch",
    copy: "Domain, hosting, analytics, and a walkthrough so you're never locked out of your own site.",
  },
];

const included = [
  "Custom design — no drag-and-drop templates",
  "Mobile, tablet & desktop responsive layouts",
  "On-page SEO & fast load times built in",
  "Contact forms, booking, or e-commerce as needed",
  "30 days of post-launch support",
  "Optional ongoing care plan",
];

const consultingItems = [
  {
    title: "Workspace architecture",
    copy: "We map your workflows and build a Notion (or broader tool) structure suited to how your team actually works.",
  },
  {
    title: "Automation & integrations",
    copy: "Connect forms, calendars, and client tools so information moves without manual re-entry.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero — positioning left, index of the two crafts right */}
      <section className="px-6 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-20">
          <Reveal>
            <h1 className="font-display text-balance text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Two crafts, built to work together.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              A great website gets people in the door. A workspace your team
              actually uses keeps the business running once they&apos;re there.
              We do both.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="divide-y divide-white/10 border-y border-white/10">
              <Link
                href="#web-design"
                className="focus-ring group flex items-baseline justify-between gap-6 py-5"
              >
                <span className="text-sm font-semibold transition-colors group-hover:text-accent">
                  Website design &amp; build
                </span>
                <span className="font-display shrink-0 text-sm font-bold tabular-nums text-accent">
                  01
                </span>
              </Link>
              <Link
                href="#consulting"
                className="focus-ring group flex items-baseline justify-between gap-6 py-5"
              >
                <span className="text-sm font-semibold transition-colors group-hover:text-accent">
                  Systems &amp; consulting
                </span>
                <span className="font-display shrink-0 text-sm font-bold tabular-nums text-accent">
                  02
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 01 — web design. Claim left, process right. */}
      <section
        id="web-design"
        className="scroll-mt-24 border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-display text-sm font-bold tabular-nums text-accent">01</p>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              A site that looks like it cost more than it did — because it works this hard.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              Most marketing sites launch in 3–5 weeks. Larger builds with
              booking, e-commerce, or custom integrations run 6–9 weeks.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="/pricing" className="whitespace-nowrap">
                See pricing
              </MagneticButton>
              <MagneticButton
                href={BOOKING.projectCall}
                external
                variant="outline"
                className="whitespace-nowrap"
              >
                Get a quote
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {process.map((step, i) => (
                <li key={step.title} className="flex gap-5 py-5">
                  <span className="font-display shrink-0 text-sm font-bold tabular-nums text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                      {step.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Included — direction flips: checklist left, framing right. */}
      <section className="border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              What&apos;s included, every time.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              No tier strips these out. They&apos;re the floor, not the upsell.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:order-1">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 py-4">
                  <Check size={16} className="mt-1 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 02 — consulting. Paper section, text right. */}
      <section
        id="consulting"
        className="scroll-mt-24 bg-paper px-6 py-20 text-ink lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <p className="font-display text-sm font-bold tabular-nums text-accent">02</p>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              The tools you already pay for, finally pulling their weight.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-black/60">
              Looking for hands-on team training on Notion specifically? That has
              its own page.
            </p>
            <div className="mt-8">
              <MagneticButton href="/notion-training" className="whitespace-nowrap">
                Notion training
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:order-1">
            <dl className="divide-y divide-black/10 border-y border-black/10">
              {consultingItems.map((item) => (
                <div key={item.title} className="py-5">
                  <dt className="font-display text-base font-semibold tracking-tight">
                    {item.title}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-black/60">
                    {item.copy}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Not sure which service fits? Let&apos;s figure it out together.
            </h2>
            <div className="mt-10">
              <MagneticButton href={BOOKING.freeConsult} external className="whitespace-nowrap">
                Book a free consult
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
