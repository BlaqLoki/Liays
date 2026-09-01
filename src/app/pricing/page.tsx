/* Hallmark · genre: editorial · macrostructure: Split Studio · design-system: design.md
 *
 * Every number on this page comes from src/lib/offers.ts. Nothing is typed
 * twice. The old version hard-coded three tier tables that had already drifted
 * out of step with the homepage — which, on the one page whose entire argument
 * is "we publish our prices", is the worst possible thing to get wrong.
 */
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SpotlightRow } from "@/components/ui/spotlight-row";
import { BOOKING } from "@/lib/links";
import {
  website,
  carePlan,
  contentPack,
  audioAddOn,
  aiSprint,
  notion,
  foundingSlotsLeft,
  type Offer,
} from "@/lib/offers";

export const metadata: Metadata = {
  title: "Pricing — Liays Inc",
  description:
    "Every price published. A five-day lead-ready website from $995, optional launch content, care plans, and AI workflow training for teams.",
};

const terms = [
  { q: "Deposit", a: "50% to start, 50% before launch" },
  { q: "The five-day clock", a: "Starts when your material arrives, not at signing" },
  { q: "Revisions", a: "Two rounds, both inside the five days" },
  { q: "Ownership", a: "The site is yours — domain, content, all of it" },
  { q: "Care plan", a: "Optional, cancel any time, no notice period" },
];

function OfferRow({ offer, onPaper = false }: { offer: Offer; onPaper?: boolean }) {
  const muted = onPaper ? "text-black/60" : "text-white/55";
  const subtle = onPaper ? "text-black/60" : "text-white/45";
  const body = onPaper ? "text-black/70" : "text-white/70";
  const accent = onPaper ? "text-accent-on-paper" : "text-accent";
  const accentHover = onPaper
    ? "group-hover:text-accent-on-paper"
    : "group-hover:text-accent";

  return (
    <SpotlightRow onPaper={onPaper}>
      <div className="grid gap-6 py-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${accentHover}`}
            >
              {offer.name}
            </h3>
            <span className="font-display shrink-0 origin-right text-2xl font-bold tabular-nums tracking-tight transition-transform duration-300 ease-out group-hover:scale-[1.06]">
              {offer.price}
            </span>
          </div>
          <p className={`mt-1 text-right text-xs ${subtle}`}>{offer.unit}</p>
          {offer.priceAfter && (
            <p className={`mt-2 text-xs font-semibold ${accent}`}>
              {foundingSlotsLeft} founding {foundingSlotsLeft === 1 ? "slot" : "slots"} left
              — then {offer.priceAfter}
            </p>
          )}
          <p className={`mt-4 max-w-sm text-sm leading-relaxed ${muted}`}>
            {offer.promise}
          </p>
          {offer.terms && (
            <p className={`mt-3 max-w-sm text-xs leading-relaxed ${subtle}`}>
              {offer.terms}
            </p>
          )}
        </div>

        <ul className="grid gap-2.5 sm:grid-cols-2 lg:content-start">
          {offer.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                size={15}
                className={`mt-1 shrink-0 ${accent} transition-transform duration-300 ease-out group-hover:scale-110`}
              />
              <span className={`text-sm leading-relaxed ${body}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </SpotlightRow>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* ── Claim left, terms right ─────────────────────────────────────── */}
      <section className="px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-20">
          <Reveal>
            <h1 className="font-display text-balance text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Every price, published.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              You shouldn&apos;t have to book a call to find out what a website
              costs. Here are the real numbers. Every project still starts with a
              free consult so the quote fits what you actually need.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
              {terms.map((t) => (
                <div key={t.q} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="shrink-0 text-white/55">{t.q}</dt>
                  <dd className="text-right font-medium">{t.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── The website ─────────────────────────────────────────────────── */}
      <section
        id="websites"
        className="scroll-mt-24 border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              The website
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              One offer, one price. No tiers to decode, because a one-page site
              that does its job doesn&apos;t need three versions of itself.
            </p>
          </Reveal>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            <OfferRow offer={website} />
          </div>
        </div>
      </section>

      {/* ── Add-ons, on paper for contrast ──────────────────────────────── */}
      <section
        id="add-ons"
        className="scroll-mt-24 bg-paper px-6 py-16 text-ink lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Once it&apos;s live
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60">
              All optional. The site does its job without any of them.
            </p>
          </Reveal>
          <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {[contentPack, audioAddOn, carePlan].map((offer) => (
              <OfferRow key={offer.id} offer={offer} onPaper />
            ))}
          </div>
        </div>
      </section>

      {/* ── Teams ───────────────────────────────────────────────────────── */}
      <section
        id="teams"
        className="scroll-mt-24 border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Systems &amp; training
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              For businesses with staff. Longer engagements, usually with a team
              rather than an owner.
            </p>
          </Reveal>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            <OfferRow offer={aiSprint} />
            <OfferRow offer={notion} />
          </div>
        </div>
      </section>

      {/* ── What we don't charge for ────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Free, and staying free
              </h2>
              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-white/55">The consult</dt>
                  <dd className="font-semibold text-accent">Free</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-white/55">Site performance check</dt>
                  <dd className="font-semibold text-accent">Free</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-white/55">Rush fees</dt>
                  <dd className="font-semibold">None — five days is the normal speed</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {foundingSlotsLeft} slots at {website.price}. Then it&apos;s{" "}
              {website.priceAfter}.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              The founding rate exists because early clients take a chance on a
              new studio and their sites become the portfolio. That&apos;s worth
              the discount. It stops being worth it once the portfolio exists.
            </p>
            <div className="mt-10">
              <MagneticButton href={BOOKING.projectCall} external>
                Claim a founding slot
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
