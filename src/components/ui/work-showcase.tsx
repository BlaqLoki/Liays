"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WorkCarousel, type WorkSlide } from "@/components/ui/work-carousel";

/**
 * The section directly under the hero: proof, then the ask.
 *
 * Three real builds and two open slots. The empty ones are labelled rather than
 * hidden, because "we're taking the next three at the founding rate" is the
 * actual offer — showing the gaps makes the scarcity legible instead of asking
 * the reader to take it on faith.
 */

const slides: WorkSlide[] = [
  {
    slug: "onuwas",
    title: "Onuwa's Kitchen",
    tag: "E-commerce · Winnipeg",
    href: "https://www.onuchinchinsnacks.ca",
    image: "/work/onuwas.webp",
    alt: "The Onuwa's Kitchen homepage",
  },
  {
    slug: "eventsplit",
    title: "EventSplit",
    tag: "SaaS · Event finance",
    href: "https://www.eventsplit.ca",
    image: "/work/eventsplit.webp",
    alt: "The EventSplit homepage",
  },
  {
    slug: "ezirim",
    title: "Ezirim Foundation",
    tag: "Non-profit · Winnipeg",
    href: "https://www.ezirimfoundation.ca",
    image: "/work/ezirim.webp",
    alt: "The Ezirim Foundation homepage",
  },
  {
    slug: "open-1",
    title: "Your business here",
    tag: "Founding rate · $995",
    image: "/hero/placeholder-a.webp",
    alt: "An open founding-client slot",
    placeholder: true,
  },
  {
    slug: "open-2",
    title: "Your business here",
    tag: "Founding rate · $995",
    image: "/hero/placeholder-b.webp",
    alt: "An open founding-client slot",
    placeholder: true,
  },
];

export function WorkShowcase() {
  return (
    <section className="border-t border-white/10 bg-ink px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Recent work
            </p>
            <h2 className="font-display mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Sites that give people somewhere to go.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60">
              Every one of these was designed, built and launched by us — and we
              still run them.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <WorkCarousel slides={slides} className="mt-12" />
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton href="/contact" className="whitespace-nowrap">
              Claim a founding slot — $995
              <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="/work" variant="ghost" className="whitespace-nowrap">
              See the full portfolio
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
