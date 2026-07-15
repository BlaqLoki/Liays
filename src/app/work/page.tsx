import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectArt, type ProjectArtVariant } from "@/components/ui/project-art";
import { SpotlightSurface } from "@/components/ui/spotlight-surface";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export const metadata: Metadata = {
  title: "Work — Liays Inc",
  description: "Recent website and Notion systems work for Winnipeg businesses.",
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
    result: "Live platform now tracking $1.28M in funding across 89 events for 342+ organizers.",
    base: "#221d12",
    variant: "dot-network",
    glow: "gold",
    href: "https://www.eventsplit.ca",
  },
  {
    title: "Ezirim Foundation",
    tag: "Non-Profit · Web Design & Build",
    service: "Web Design & Build",
    result: "A full multi-page site — programs, partners, applications — live to support the Foundation's first cohort launch.",
    base: "#241a12",
    variant: "organic-bloom",
    glow: "accent",
    href: "https://www.ezirimfoundation.ca",
  },
  {
    title: "Prairie Realty",
    tag: "Real Estate",
    service: "Web Design & Build",
    result: "Lead form submissions up 64% in the first quarter post-launch.",
    base: "#202a1a",
    variant: "horizon-grid",
    glow: "accent",
  },
  {
    title: "Northgate Dental",
    tag: "Healthcare",
    service: "Web + Online Booking",
    result: "Online booking now handles 40% of new patient intake.",
    base: "#241f1a",
    variant: "concentric-arcs",
    glow: "gold",
  },
  {
    title: "Forks Market Co.",
    tag: "Retail",
    service: "Notion Ops System",
    result: "Cut weekly inventory reconciliation time from 6 hours to 1.",
    base: "#2a1c16",
    variant: "stacked-shelves",
    glow: "accent",
  },
  {
    title: "Bison Freight",
    tag: "Logistics",
    service: "Web Design & Build",
    result: "New site plus a dispatcher-facing Notion tracker.",
    base: "#262415",
    variant: "directional-flow",
    glow: "accent",
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
            <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Real projects. Real results.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              From a live SaaS platform to a non-profit launch, plus website
              builds and Notion systems across real estate, healthcare, retail,
              and logistics.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 lg:py-28">
        <RevealGroup className="mx-auto flex max-w-7xl snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-10 sm:pb-0 lg:grid-cols-3">
          {projects.map((p) => {
            const cardBody = (
              <>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <ProjectArt
                    variant={p.variant}
                    base={p.base}
                    glow={p.glow}
                    className="absolute inset-0 h-full w-full"
                  />
                  <div className="absolute left-6 top-6 inline-flex items-center rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                    {p.tag}
                  </div>
                  <div className="absolute inset-x-6 bottom-6 flex items-center justify-between">
                    {p.href && (
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50 transition-colors duration-300 group-hover:text-accent">
                        Visit live site
                      </span>
                    )}
                    <ArrowUpRight
                      size={20}
                      className="ml-auto text-white/40 transition-all duration-300 group-hover:text-accent"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    {p.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-accent">{p.service}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.result}</p>
                </div>
              </>
            );

            return (
              <RevealItem key={p.title} className="w-[82%] shrink-0 snap-start sm:w-auto">
                {p.href ? (
                  <SpotlightCard href={p.href} glow={p.glow} className="h-full rounded-2xl">
                    {cardBody}
                  </SpotlightCard>
                ) : (
                  <SpotlightSurface glow={p.glow} className="h-full rounded-2xl">
                    <article className="h-full">{cardBody}</article>
                  </SpotlightSurface>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      <section className="px-6 py-28 lg:px-10 lg:py-36">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Want your business in this list next?
          </h2>
          <MagneticButton href="/contact" className="whitespace-nowrap">
            Start a project
            <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
