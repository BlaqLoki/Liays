/* Hallmark · genre: editorial · macrostructure: Portfolio Grid · design-system: design.md · designed-as-app
 * Three real projects, shown as screenshots of the live sites. Generated
 * abstract art stood in here while there was nothing worth photographing.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BOOKING } from "@/lib/links";
import { ProjectCard } from "@/components/ui/project-card";

export const metadata: Metadata = {
  title: "Work — Liays Inc",
  description:
    "Websites and Notion systems built for Winnipeg businesses and beyond.",
};

/* The screenshots in /public/work are captures of the live sites at 1440×900,
   which is why the cards are 16:10 — the crop is the shot, so nothing is cut
   off at an arbitrary point. Re-capture them when a site changes materially;
   a portfolio showing a design the client no longer has is worse than none. */
const projects: {
  title: string;
  tag: string;
  result: string;
  slug: string;
  imageAlt: string;
  href: string;
}[] = [
  {
    title: "Onuwa's Kitchen",
    tag: "E-commerce · Web Design & Build",
    result:
      "A single-product storefront for a Winnipeg chin chin maker — scroll-driven product animation, Stripe checkout, and pickup scheduling, built and launched on her own domain.",
    slug: "onuwas",
    imageAlt: "The Onuwa's Kitchen homepage, showing two bags of chin chin",
    href: "https://www.onuchinchinsnacks.ca",
  },
  {
    title: "EventSplit",
    tag: "SaaS · Event Finance Platform",
    result:
      "A full event-finance platform, designed and shipped end to end — collaborator offers, e-signed agreements, expense tracking, sponsorships, and automated profit distribution.",
    slug: "eventsplit",
    imageAlt: "The EventSplit homepage, showing the event finance dashboard",
    href: "https://www.eventsplit.ca",
  },
  {
    title: "Ezirim Foundation",
    tag: "Non-Profit · Web Design & Build",
    result:
      "A full multi-page site — programs, partners, applications — live to support the Foundation's first cohort launch.",
    slug: "ezirim",
    imageAlt: "The Ezirim Foundation homepage",
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
              {/* Says what we did — designed, built, still maintain — without
                  characterising the commercial relationship behind each one.
                  All three statements are true of all three projects. */}
              <p className="text-sm leading-relaxed text-white/60">
                We&apos;re a new studio, so this list is short — three projects
                we designed and built end to end, all live, all still ours to
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

      {/* The grid.

          `perspective` belongs on this container, not on the cards. A card that
          sets its own perspective gets its own vanishing point, so each one
          tilts toward a different imaginary camera and the row stops reading as
          a single plane. One value here, shared by all of them. */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div
          className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:gap-14"
          style={{ perspective: "1200px" }}
        >
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <ProjectCard
                title={p.title}
                tag={p.tag}
                blurb={p.result}
                slug={p.slug}
                imageAlt={p.imageAlt}
                href={p.href}
                priority={i === 0}
              />
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
