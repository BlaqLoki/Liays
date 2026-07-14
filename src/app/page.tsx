import Link from "next/link";
import { ArrowUpRight, Globe, LayoutGrid, Sparkles, Check, Tag } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionLabel } from "@/components/ui/section-label";
import { Marquee } from "@/components/ui/marquee";
import { HeroBackground } from "@/components/hero-background";
import { HeroScreens } from "@/components/hero-screens";
import { ProjectArt } from "@/components/ui/project-art";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { RevealMask } from "@/components/ui/reveal-mask";

const clients = ["EventSplit", "Ezirim Foundation", "Prairie Realty", "Northgate Dental", "Forks Market Co.", "Bison Freight"];

const services = [
  {
    icon: Globe,
    title: "Website Design & Build",
    copy: "Fast, elegant, conversion-minded websites — from brand-new builds to full redesigns.",
    href: "/services#web-design",
  },
  {
    icon: LayoutGrid,
    title: "Notion Training",
    copy: "Hands-on sessions that get your whole team actually using Notion, not just staring at it.",
    href: "/notion-training",
  },
  {
    icon: Sparkles,
    title: "Systems & Consulting",
    copy: "Workspace architecture, workflow automation, and ongoing support as you grow.",
    href: "/services#consulting",
  },
];

const work = [
  {
    title: "EventSplit",
    tag: "SaaS · Event Finance Platform",
    base: "#1c2a29",
    variant: "dot-network" as const,
    glow: "violet" as const,
    href: "https://www.eventsplit.ca",
  },
  {
    title: "Ezirim Foundation",
    tag: "Non-Profit · Web Design & Build",
    base: "#231c2a",
    variant: "organic-bloom" as const,
    glow: "accent" as const,
    href: "https://www.ezirimfoundation.ca",
  },
  {
    title: "Prairie Realty",
    tag: "Real Estate · Web Design",
    base: "#1c2b1f",
    variant: "horizon-grid" as const,
    glow: "accent" as const,
    href: "/work",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center lg:px-10">
        <HeroBackground />
        <HeroScreens />

        <div className="relative z-10 mx-auto max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/40 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              <Tag size={13} className="text-accent" />
              Website design from $999 — limited spots this season
            </div>
          </Reveal>

          <h1 className="font-display mt-8 text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
            <RevealMask trigger="mount" delay={0.08}>
              We build the site.
            </RevealMask>
            <RevealMask trigger="mount" delay={0.2}>
              We teach the <span className="text-accent">system.</span>
            </RevealMask>
          </h1>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60 sm:hidden">
              From $999, we design websites for service businesses — plus
              Notion training from $500.
            </p>
            <p className="mx-auto mt-8 hidden max-w-xl text-lg leading-relaxed text-white/60 sm:block sm:text-xl">
              From $999, we design elegant websites for service businesses —
              restaurants, cleaners, plumbers, real estate agents, and non-profits.
              Pair it with hands-on Notion training from $500 so your team
              actually uses the tools you pay for.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <MagneticButton href="/contact">
                Get my $999 quote
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton href="/pricing" variant="outline">
                See full pricing
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4} className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <div className="flex flex-col items-center gap-3 text-white/55">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
              Scroll
            </span>
            <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Trusted by */}
      <section className="border-y border-white/10 bg-ink px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Trusted by Winnipeg businesses
          </p>
          <Reveal delay={0.05} className="relative mt-6">
            <Marquee items={clients} />
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>What we do</SectionLabel>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Two crafts. One goal: less friction running your business.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.title} className="h-full">
                <SpotlightCard
                  href={service.href}
                  className="h-full rounded-2xl border border-white/10 bg-ink-soft p-8 transition-colors duration-300 hover:border-accent/50"
                  contentClassName="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                      <service.icon size={22} />
                    </div>
                    <h3 className="font-display mt-6 text-xl font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{service.copy}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors duration-300 group-hover:text-accent">
                    Learn more
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Notion highlight — paper section for contrast */}
      <section className="bg-paper px-6 py-24 text-ink lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionLabel tone="onPaper">Notion training</SectionLabel>
            <h2 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Your team already pays for Notion. Let&apos;s make them love using it.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/60">
              We run live, hands-on workshops tailored to how your business actually
              operates — not generic templates. Your team leaves with a workspace
              they built themselves, and the confidence to keep improving it.
            </p>
            <div className="mt-8">
              <MagneticButton href="/notion-training">
                Book a training session
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {[
                "On-site or remote team workshops (half-day or full-day)",
                "Custom workspace setup for your workflows",
                "Project & client trackers your team will actually update",
                "30 days of async support after every session",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-5 shadow-sm"
                >
                  <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-black/75">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Work teaser */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel>Selected work</SectionLabel>
                <h2 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Recent launches
                </h2>
              </div>
              <Link
                href="/work"
                className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-accent"
              >
                View all work
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="-mx-6 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
            {work.map((item) => (
              <RevealItem key={item.title} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
                <SpotlightCard href={item.href} glow={item.glow} className="rounded-2xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <ProjectArt
                      variant={item.variant}
                      base={item.base}
                      glow={item.glow}
                      className="absolute inset-0 h-full w-full"
                    />
                    <div className="absolute inset-0 flex items-end p-6">
                      <ArrowUpRight
                        size={20}
                        className="ml-auto text-white/40 transition-all duration-300 group-hover:text-accent"
                      />
                    </div>
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </p>
                  <p className="text-sm text-white/50">{item.tag}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-y border-white/10 bg-ink-soft px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="font-display text-balance text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
            &ldquo;Liays didn&apos;t just design a landing page — they built the
            full platform. EventSplit now tracks over a million dollars in
            event funding, and it still feels as fast as day one.&rdquo;
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-accent to-violet" />
            <div className="text-left">
              <p className="text-sm font-semibold">Founder, EventSplit</p>
              <p className="text-xs text-white/50">eventsplit.ca</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 lg:px-10 lg:py-36">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Ready for a site and a system worth bragging about?
          </h2>
          <MagneticButton href="/contact" className="whitespace-nowrap">
            Let&apos;s talk
            <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
