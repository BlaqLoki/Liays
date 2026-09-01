/* Hallmark · genre: editorial · macrostructure: Split Studio · tone: workmanlike
 * nav: N9 edge-aligned minimal · footer: Ft5 statement · hero: H2 split diptych
 * cta: C1 outlined chip · enrichment: none (typography only) · anchor hue: terracotta
 */
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroBackground } from "@/components/hero-background";
import { HoverReel } from "@/components/ui/hover-reel";
import { ScrollExpandHero } from "@/components/ui/scroll-expand-hero";
import { BookACall } from "@/components/ui/book-a-call";
import { WorkShowcase } from "@/components/ui/work-showcase";
import { ledger, tagline, website, foundingSlotsLeft } from "@/lib/offers";
import { CountUp } from "@/components/ui/count-up";
import { BOOKING } from "@/lib/links";


/* Reads from the offer rather than restating it. This list used to promise
   "live in 2–3 weeks" on the same page that sells a five-day build — the kind
   of contradiction a prospect notices and a founder never does, because nobody
   reads their own homepage top to bottom. */
const webDeliverables = website.includes.slice(0, 5);

const notionDeliverables = [
  "On-site or remote team workshops (half-day or full-day)",
  "Custom workspace setup for your workflows",
  "Project & client trackers your team will actually update",
  "30 days of async support after every session",
];

/* Same captures as /work, so the teaser and the full page show the same thing.
   Re-capture both together when a site changes. */
const work = [
  {
    title: "EventSplit",
    tag: "SaaS · Event Finance Platform",
    slug: "eventsplit",
    imageAlt: "The EventSplit homepage",
    href: "https://www.eventsplit.ca",
  },
  {
    title: "Ezirim Foundation",
    tag: "Non-Profit · Web Design & Build",
    slug: "ezirim",
    imageAlt: "The Ezirim Foundation homepage",
    href: "https://www.ezirimfoundation.ca",
  },
];

export default function Home() {
  return (
    <>
      {/* Opening frame. The claim is the whole point of the section; the
          positioning and the price ledger below still do the explaining. */}
      <ScrollExpandHero
        title="Endless Possibilities"
        eyebrow={tagline}
        hint="Scroll"
        bgImageSrc="/hero/winnipeg.webp"
        bgAlt="Downtown Winnipeg at golden hour, the Museum for Human Rights and the Esplanade Riel in the foreground"
        videoSrc="/hero/inner.mp4"
        videoWebmSrc="/hero/inner.webm"
        posterSrc="/hero/inner-poster.webp"
      />

      <WorkShowcase />

      {/* Hero — diptych: positioning left, price ledger right.

          `relative` so the backdrop pins to this section rather than the
          viewport. Deliberately NOT `isolate`: adding it blanked the entire
          hero in Chrome — headline, ledger, buttons, all of it — and it did so
          with the backdrop removed too, so the stacking context alone was
          enough. `relative` is all the positioning needs; the isolate bought
          nothing and cost the whole section. */}
      <section className="relative px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <HeroBackground />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="text-sm font-semibold text-accent">
              Winnipeg · {foundingSlotsLeft} founding{" "}
              {foundingSlotsLeft === 1 ? "slot" : "slots"} left at {website.price}
            </p>
            <h1 className="font-display mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              We build it.
              <br />
              Then we <span className="text-accent">run it.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Most studios hand you a website and disappear. Most marketers hand
              you a strategy and can&apos;t build it. We do both — the site, the
              search, the email, the systems behind it — for Winnipeg service
              businesses.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton
                href={BOOKING.freeConsult}
                external
                className="whitespace-nowrap"
              >
                Book a free consult
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton href="/audit" variant="ghost" className="whitespace-nowrap">
                Check your site&apos;s performance for free
              </MagneticButton>
            </div>
          </Reveal>

          {/* Proof half — the price ledger. Transparency is the differentiator. */}
          <Reveal delay={0.12}>
            <div className="border-t border-white/15 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                What it costs
              </p>
              <dl className="mt-6 divide-y divide-white/10">
                {ledger.map((row, i) => (
                  // Staggered so the ledger reads top to bottom rather than
                  // arriving as one block — the eye follows the prices down.
                  <Reveal key={row.service} delay={0.25 + i * 0.12} y={12}>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt>
                        <span className="block text-sm font-semibold">{row.service}</span>
                        <span className="mt-0.5 block text-xs text-white/45">{row.note}</span>
                      </dt>
                      <dd className="font-display shrink-0 text-xl font-bold tracking-tight">
                        <CountUp value={row.price} />
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-white/45">
                Comparable studio work in this market typically runs $2,500–$5,000.
                Our pricing is on the site because you shouldn&apos;t have to book a
                call to find out.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Craft 01 — websites. Text left, proof right. */}
      <section className="border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-display text-sm font-bold tabular-nums text-accent">01</p>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Websites that look established on day one.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              One page, {website.price}, live five business days after you send
              us the material. Built around the one thing the page has to do —
              get the phone to ring.
            </p>
            <div className="mt-8">
              <MagneticButton href="/services#web-design" variant="outline">
                See what&apos;s included
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="space-y-0 divide-y divide-white/10 border-y border-white/10">
              {webDeliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 py-4">
                  <Check size={16} className="mt-1 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Craft 02 — Notion. Direction flips: proof left, text right. Paper for contrast. */}
      <section className="bg-paper px-6 py-20 text-ink lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            {/* -on-paper, unlike 01 above it: this section is the light one,
                and plain accent measures 3.22:1 here against 4.5 required. */}
            <p className="font-display text-sm font-bold tabular-nums text-accent-on-paper">
              02
            </p>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Your team already pays for Notion. Let&apos;s make them love using it.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-black/60">
              Live, hands-on workshops tailored to how your business actually
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

          <Reveal delay={0.12} className="lg:order-1">
            <ul className="space-y-0 divide-y divide-black/10 border-y border-black/10">
              {notionDeliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 py-4">
                  <Check size={16} className="mt-1 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-black/70">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The +1 — consulting sits quieter than the two crafts, by design. */}
      <section className="border-b border-white/10 px-6 py-10 lg:px-10">
        <Reveal className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-sm leading-relaxed text-white/55">
            <span className="font-semibold text-[var(--color-fg-on-ink)]">
              Systems &amp; consulting.
            </span>{" "}
            Workspace architecture, workflow automation, and ongoing support as you grow.
          </p>
          <Link
            href="/services#consulting"
            className="focus-ring inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap py-3 text-sm font-semibold text-white/70 transition-colors hover:text-accent"
          >
            How it works
            <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* Work — heading half, projects half. */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[4fr_8fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Platforms we built and still run.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60">
              Not just landing pages — full products we designed, shipped, and
              maintain. The systems we hand you are the ones we trust with our
              own work.
            </p>
            <Link
              href="/work"
              className="focus-ring mt-8 inline-flex items-center gap-1.5 whitespace-nowrap py-3 text-sm font-semibold text-white/70 transition-colors hover:text-accent"
            >
              View all work
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-6 sm:grid-cols-2">
              {work.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="focus-ring group block"
                >
                  {/* 2:1 matches the recordings, so the teaser frames each
                      site exactly the way /work does. */}
                  <div className="relative aspect-[2/1] overflow-hidden rounded-xl border border-white/10">
                    <HoverReel
                      slug={item.slug}
                      alt={item.imageAlt}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {/* Lifts on hover, so the reel plays at full contrast. */}
                    <div className="pointer-events-none absolute inset-0 bg-ink/25 transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                  <p className="font-display mt-4 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-white/50">{item.tag}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA. Replaced the plain text block rather than adding a
          second one below it — two booking CTAs on one page compete, and the
          reader has already had the offer explained by the time they arrive. */}
      {/* Alt text describes what is on screen. It previously read "Placeholder
          — replace with studio or client work", which a screen reader announces
          verbatim to a real visitor and which shows as visible text if the image
          fails. Swap the images for client work when there is some; the alt
          changes with them. */}
      <BookACall
        eyebrow="Book a call"
        title={`${foundingSlotsLeft} founding slots at ${website.price}. Then it's ${website.priceAfter}.`}
        description="A free 20-minute consult. We'll look at what you have, tell you what we'd change, and give you a number — whether or not you hire us. Live in five business days once you send the material."
        primaryHref={BOOKING.projectCall}
        primaryLabel="Claim a founding slot"
        secondaryHref="/pricing"
        secondaryLabel="See what it costs"
        primaryImage="/hero/placeholder-a.webp"
        primaryAlt="Downtown Winnipeg from the air at golden hour"
        secondaryImage="/hero/placeholder-b.webp"
        secondaryAlt="A Winnipeg street scene"
      />
    </>
  );
}
