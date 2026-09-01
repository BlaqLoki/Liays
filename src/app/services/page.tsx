/* Hallmark · genre: editorial · macrostructure: Split Studio · design-system: design.md
 *
 * One offer, argued properly, then everything else underneath it.
 *
 * The previous version gave websites and Notion training equal billing, which
 * made a visitor choose before they knew what either was. A studio with one
 * clear thing to sell should sell that thing; the rest is what you find once
 * you're already interested.
 */
import type { Metadata } from "next";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ImageSlot } from "@/components/ui/image-slot";
import { BOOKING } from "@/lib/links";
import {
  website,
  carePlan,
  contentPack,
  audioAddOn,
  aiSprint,
  notion,
  bestFit,
  foundingSlotsLeft,
} from "@/lib/offers";

export const metadata: Metadata = {
  title: "Services — Liays Inc",
  description:
    "A one-page website that helps customers find, trust and contact you — live in five business days. Plus launch content, care plans and AI workflow training.",
};

/* The five days are the promise, so the days are the structure. Numbering is
   real here: this is a sequence with an order that matters, not decoration. */
const days = [
  {
    day: "Day 0",
    title: "You send the material",
    body: "Photos, your services, your hours, anything you want said. A 20-minute call if that's easier. The clock doesn't start until this lands.",
  },
  {
    day: "Days 1–2",
    title: "We write and design",
    body: "We write the copy — you don't have to. Layout, structure, and the one thing the page needs to do: get someone to call you.",
  },
  {
    day: "Day 3",
    title: "You see it",
    body: "A real link on a real phone. You tell us what's wrong with it.",
  },
  {
    day: "Day 4",
    title: "Two rounds of changes",
    body: "Wording, photos, order of sections. Both rounds happen here, not spread over three weeks.",
  },
  {
    day: "Day 5",
    title: "Live on your domain",
    body: "Connected, indexed, and sending calls to your phone. The balance is due before this step.",
  },
];

const addOns = [contentPack, audioAddOn, carePlan];

export default function ServicesPage() {
  return (
    <>
      {/* ── The offer ───────────────────────────────────────────────────── */}
      <section className="px-6 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold text-accent">
              {foundingSlotsLeft} founding {foundingSlotsLeft === 1 ? "slot" : "slots"} at{" "}
              {website.price}, then {website.priceAfter}
            </p>
            <h1 className="font-display mt-6 text-balance text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              A website that gets you called back.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              {website.promise}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton href={BOOKING.freeConsult} external className="whitespace-nowrap">
                Book a free consult
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton href="/pricing" variant="ghost" className="whitespace-nowrap">
                See every price
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {/* Real imagery, not a dashed placeholder. A visitor deciding
                whether to trust a new studio with $995 should not be looking at
                a box that says a photo is coming. Swap in a client shot the day
                there is one — the component takes a src and nothing else
                changes. */}
            <ImageSlot
              src="/hero/city-tall.webp"
              alt="Downtown Winnipeg from the air"
              label="Winnipeg"
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ── What you get ────────────────────────────────────────────────── */}
      <section
        id="web-design"
        className="scroll-mt-24 border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              What&apos;s included
            </p>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Everything on one page, because that&apos;s all it needs.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              A customer looking for a plumber at 8pm doesn&apos;t browse. They
              want to know you&apos;re real, that you do the thing, and how to
              reach you — in about eleven seconds.
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/45">
              {website.terms}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {website.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3.5">
                  <Check size={16} className="mt-1 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── The five days ───────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-paper px-6 py-20 text-ink lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-on-paper">
                How it works
              </p>
              <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Five business days, and you know what happens on each one.
              </h2>
            </div>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-black/10 sm:grid-cols-2 lg:grid-cols-5">
            {days.map((d, i) => (
              <Reveal key={d.day} delay={i * 0.07}>
                <li className="flex h-full flex-col gap-2 bg-paper p-6">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-accent-on-paper">
                    {d.day}
                  </p>
                  <p className="font-display text-lg font-semibold tracking-tight">
                    {d.title}
                  </p>
                  <p className="text-sm leading-relaxed text-black/60">{d.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
          <Reveal>
            <ImageSlot
              src="/hero/city-tall-2.webp"
              alt="The Winnipeg riverfront"
              label="Winnipeg riverfront"
              ratio="3/4"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Who this is for
            </p>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              You already have the customers. They just can&apos;t find you.
            </h2>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {bestFit.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3.5">
                  <Check size={16} className="mt-1 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-white/45">
              Plumbers, electricians, cleaners, landscapers, painters, salons,
              photographers, contractors. If one customer is worth a few hundred
              dollars to you, one extra call a month pays for the site.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Add-ons ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Once you&apos;re live
              </p>
              <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Optional. Genuinely — the site works without any of these.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {addOns.map((offer, i) => (
              <Reveal key={offer.id} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-soft/40 p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {offer.name}
                    </h3>
                    <span className="font-display shrink-0 text-xl font-bold tabular-nums tracking-tight text-accent">
                      {offer.price}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{offer.unit}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {offer.promise}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-1 shrink-0 text-accent" />
                        <span className="text-sm leading-relaxed text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The deeper work ─────────────────────────────────────────────── */}
      <section
        id="training"
        className="scroll-mt-24 border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                For teams
              </p>
              <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Systems and training, for businesses with staff.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/60">
                A different kind of engagement from the website work — longer,
                deeper, and usually with a team rather than an owner. Most of
                this comes from clients we&apos;ve already built for.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[aiSprint, notion].map((offer, i) => (
              <Reveal key={offer.id} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-soft/40 p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {offer.name}
                    </h3>
                    <span className="font-display shrink-0 text-2xl font-bold tabular-nums tracking-tight text-accent">
                      {offer.price}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{offer.unit}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {offer.promise}
                  </p>
                  <ul className="mt-5 grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-1">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-1 shrink-0 text-accent" />
                        <span className="text-sm leading-relaxed text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {offer.terms && (
                    <p className="mt-5 text-xs leading-relaxed text-white/40">
                      {offer.terms}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Send us your Google listing. We&apos;ll tell you what we&apos;d
              build, free.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              No pitch deck, no discovery process. Twenty minutes, and you leave
              with a plan whether or not you hire us.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton href={BOOKING.freeConsult} external className="whitespace-nowrap">
                Book a free consult
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton href="/contact" variant="ghost" className="whitespace-nowrap">
                <Phone size={15} />
                Or just message us
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
