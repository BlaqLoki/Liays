/* Hallmark · genre: editorial · macrostructure: Portfolio Grid · design-system: design.md · designed-as-app
 * Two real projects. A 3-up grid would advertise the two empty slots, so the
 * grid tops out at 2 and the page says plainly that it's early.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BOOKING } from "@/lib/links";
import { ProjectArt, type ProjectArtVariant } from "@/components/ui/project-art";

export const metadata: Metadata = {
  title: "Work — Liays Inc",
  description:
    "Websites and Notion systems built for Winnipeg businesses and beyond.",
};

const projects: {
  title: string;
  tag: string;
  service: string;
  result: string;
  base: string;
  variant: ProjectArtVariant;
  glow: "accent" | "gold";
  href?: string;
}[] = [
  {
    title: "EventSplit",
    tag: "SaaS · Event Finance Platform",
    service: "Web Design & Build",
    result:
      "A full event-finance platform, designed and shipped end to end — collaborator offers, e-signed agreements, expense tracking, sponsorships, and automated profit distribution.",
    base: "#221d12",
    variant: "dot-network",
    glow: "gold",
    href: "https://www.eventsplit.ca",
  },
  {
    title: "Ezirim Foundation",
    tag: "Non-Profit · Web Design & Build",
    service: "Web Design & Build",
    result:
      "A full multi-page site — programs, partners, applications — live to support the Foundation's first cohort launch.",
    base: "#241a12",
    variant: "organic-bloom",
    glow: "accent",
    href: "https://www.ezirimfoundation.ca",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Hero — claim left, standing note right */}
      <section className="px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-20">
          <Reveal>
            <h1 className="font-display text-balance text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Platforms we built and still run.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Not just landing pages — full products we designed, shipped, and
              maintain. The systems we hand you are the ones we trust with our
              own work.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border-t border-white/15 pt-6">
              <p className="text-sm leading-relaxed text-white/60">
                We&apos;re a new studio, so this list is short and honest — two
                projects we built end to end, both live, both still ours to
                maintain.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                We&apos;re taking on founding clients now, at founding rates.
              </p>
              <Link
                href="/pricing"
                className="focus-ring mt-6 inline-flex items-center gap-1.5 whitespace-nowrap py-3 text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
              >
                See founding rates
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The grid */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:gap-14">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link href={p.href ?? "/contact"} className="focus-ring group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <ProjectArt
                    variant={p.variant}
                    base={p.base}
                    glow={p.glow}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                    {p.tag}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/55">
                    {p.result}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors group-hover:text-accent">
                    Visit live site
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Want your business in this list next?
            </h2>
            <div className="mt-10">
              <MagneticButton href={BOOKING.projectCall} external className="whitespace-nowrap">
                Start a project
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
