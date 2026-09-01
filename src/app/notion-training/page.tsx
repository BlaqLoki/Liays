/* Hallmark · genre: editorial · macrostructure: Split Studio · design-system: design.md · designed-as-app */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BOOKING } from "@/lib/links";
import { website, notion, notionSystemBuild } from "@/lib/offers";

/* Derived so the total can never drift from the two numbers it adds together. */
const pairPrice = `$${(
  Number(website.price.replace(/[^0-9.]/g, "")) +
  Number(notion.price.replace(/[^0-9.]/g, ""))
).toLocaleString("en-CA")}`;

export const metadata: Metadata = {
  title: "Notion Training — Liays Inc",
  description: "Hands-on Notion workshops and consulting for Winnipeg teams.",
};

const formats = [
  {
    title: "Team Workshop",
    length: "Half-day or full-day",
    price: notion.price,
    copy: "On-site or remote, for teams of 4–25. We build your real workspace live, together.",
  },
  {
    title: "System build",
    length: "Done for you",
    price: notionSystemBuild.price,
    copy: "You don't want to learn Notion — you want it working. We build it and hand it over.",
  },
  {
    title: "1:1 Consulting",
    length: "Ongoing, by the hour",
    price: "Let's talk",
    copy: "Founders and ops leads who want a Notion architect on call as things evolve.",
    id: "consulting",
  },
  {
    title: "New Hire Onboarding",
    length: "60–90 minutes",
    price: "Let's talk",
    copy: "A repeatable session that gets every new team member fluent in your systems fast.",
  },
];

const agenda = [
  "Audit how your team currently tracks work, clients, and content",
  "Design a workspace structure matched to your actual workflows",
  "Build it together, live — databases, views, templates, automations",
  "Train every role on the parts of the system they'll touch daily",
  "Leave with documentation and 30 days of async support",
];

export default function NotionTrainingPage() {
  return (
    <>
      {/* Hero — claim left, formats ledger right */}
      <section className="px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-20">
          <Reveal>
            <h1 className="font-display text-balance text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Stop paying for a tool your team avoids.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              We run live, hands-on Notion training built around how your
              business actually operates — not a generic template tour. Your team
              leaves having built the system themselves.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={BOOKING.freeConsult} external className="whitespace-nowrap">
                Book a training session
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton
                href="#workshops"
                variant="ghost"
                className="whitespace-nowrap"
              >
                See formats
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border-t border-white/15 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Starting at
              </p>
              <p className="font-display mt-4 text-5xl font-bold tabular-nums tracking-tight">
                {notion.price}
              </p>
              <p className="mt-2 text-sm text-white/55">
                Half-day workshop, custom templates, 14 days of async support
                after.
              </p>
              {/* Derived from offers.ts, not typed in. The old line claimed the
                  pair came to $3,000 — true against a website tier that no
                  longer exists. The website is $995 now, so that sentence was
                  overstating the total by more than the website costs. */}
              <p className="mt-6 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
                Pair it with the {website.price} five-day website and the two
                together come to {pairPrice} —{" "}
                <Link href="/pricing" className="focus-ring text-accent hover:underline">
                  see pricing
                </Link>{" "}
                for the full breakdown.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Formats — one row each, not a card grid */}
      <section
        id="workshops"
        className="scroll-mt-24 border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Choose the format that fits your team.
            </h2>
          </Reveal>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div
                  id={f.id}
                  className="grid scroll-mt-24 gap-4 py-6 lg:grid-cols-[5fr_7fr] lg:gap-16"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/45">{f.length}</p>
                    </div>
                    <span className="font-display shrink-0 text-lg font-bold tabular-nums tracking-tight text-accent">
                      {f.price}
                    </span>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-white/60">
                    {f.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda — paper, direction flips */}
      <section className="bg-paper px-6 py-16 text-ink lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Practical, not theoretical.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-black/60">
              No generic slide decks. We work in your actual workspace, on your
              actual projects, so what we build is what your team uses on Monday
              morning.
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-black/60">
              And you&apos;re not on your own after we leave — every training
              includes 30 days of async support. Send a question, get an answer,
              keep the workspace improving.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:order-1">
            <ol className="divide-y divide-black/10 border-y border-black/10">
              {agenda.map((item, i) => (
                <li key={item} className="flex gap-5 py-4">
                  <span className="font-display shrink-0 text-sm font-bold tabular-nums text-black/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-black/70">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Ready to make Notion click for your whole team?
            </h2>
            <div className="mt-10">
              <MagneticButton href={BOOKING.freeConsult} external className="whitespace-nowrap">
                Book a session
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
