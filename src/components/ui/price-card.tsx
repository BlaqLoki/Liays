import { ArrowUpRight, Check } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { website, contentPack, carePlan, foundingSlotsLeft } from "@/lib/offers";

/**
 * The offer as a price card, for the homepage hero.
 *
 * Ported from a shadcn pricing block rather than pasted. Three columns don't
 * belong in a hero diptych — the headline on the left is doing the positioning,
 * and three tiers beside it would ask a first-time visitor to choose before
 * they know what any of them are. There is one thing to buy, so there is one
 * card, and the price is the largest thing in it.
 *
 * The add-ons sit underneath as quiet rows. They are genuinely optional, and
 * giving them equal weight would turn a single decision back into a comparison.
 */
export function PriceCard() {
  /* Five, not all nine. The full list lives on /services; the hero needs enough
     to make the price feel fair, not an inventory. */
  const highlights = website.includes.slice(0, 5);

  return (
    <div className="relative">
      {/* Accent bloom behind the card — the one flourish, and it's what draws
          the eye to the price rather than to the border. */}
      <div
        aria-hidden="true"
        /* Bleeds vertically only. `-inset-8` pushed it 32px past the card on
           every side, and on a 375px phone the horizontal half was enough to
           widen the whole document — a decorative blur nobody can see making
           the page draggable sideways. The glow reads the same without it. */
        className="pointer-events-none absolute inset-x-0 -inset-y-8 -z-10 opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 60% 30%, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="rounded-2xl border border-white/12 bg-ink-soft/70 p-7 shadow-2xl backdrop-blur-sm lg:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Five-day website
          </p>
          <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-accent">
            {foundingSlotsLeft} left
          </span>
        </div>

        {/* The anchor. Everything else on this card is scaled against it. */}
        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-6xl font-bold tabular-nums leading-none tracking-tight sm:text-7xl">
            {website.price}
          </span>
          <span className="text-sm text-white/45">CAD, one-time</span>
        </div>
        <p className="mt-3 text-sm text-white/50">
          Founding rate. Then {website.priceAfter}.
        </p>

        <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/65">
          {website.promise}
        </p>

        <ul className="mt-6 space-y-2.5">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check size={15} className="mt-0.5 shrink-0 text-accent" />
              <span className="text-sm leading-relaxed text-white/70">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <MagneticButton href="/contact" fullWidth className="whitespace-nowrap">
            Claim a founding slot
            <ArrowUpRight size={16} />
          </MagneticButton>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
          {website.terms}
        </p>

        {/* Add-ons, deliberately quiet. */}
        <dl className="mt-7 divide-y divide-white/10 border-t border-white/10 pt-2 text-sm">
          {[contentPack, carePlan].map((offer) => (
            <div
              key={offer.id}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <dt className="text-white/55">
                {offer.name}
                <span className="ml-2 text-xs text-white/35">optional</span>
              </dt>
              <dd className="font-display shrink-0 font-bold tabular-nums text-white/75">
                {offer.price}
                {offer.id === "care" && (
                  <span className="ml-1 text-xs font-normal text-white/40">/mo</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
