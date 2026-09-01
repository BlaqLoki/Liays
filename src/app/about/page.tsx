/* Hallmark · genre: editorial · macrostructure: Long Document · design-system: design.md
 *
 * A content page: continuous prose, inline heads, no marketing scaffolding.
 *
 * The previous version opened "We started Liays because we kept seeing the same
 * gap" and never said who "we" is. On an about page from a studio nobody has
 * heard of, that is the one question being asked — and the corporate plural
 * from a solo operator is the tell a prospect notices. This one answers it.
 */
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ImageSlot } from "@/components/ui/image-slot";
import { BOOKING } from "@/lib/links";
import { tagline, website, foundingSlotsLeft } from "@/lib/offers";

export const metadata: Metadata = {
  title: "About — Liays Inc",
  description:
    "Smarter Systems. Stronger Business. A Winnipeg studio that builds the website and then runs it — founded by Ezra Ezirim.",
};

const principles = [
  {
    title: "The price is on the site",
    copy: "You should never have to book a call to find out what something costs. Every number we charge is published, including the ones that make us look expensive.",
  },
  {
    title: "We say the deadline out loud",
    copy: "Five business days, and the clock starts when your material arrives — not at signing, so you always know whose turn it is.",
  },
  {
    title: "Built to be used on Monday",
    copy: "A beautiful site nobody updates is the same failure as a Notion workspace nobody opens. We design for the week after launch, not the launch.",
  },
  {
    title: "You own all of it",
    copy: "The domain, the content, the site. No rented platform, no hostage situation if you'd rather work with someone else next year.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Opening ─────────────────────────────────────────────────────── */}
      <section className="px-6 pb-12 pt-12 lg:px-10 lg:pt-20">
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-accent">
            Winnipeg, Manitoba · {tagline}
          </p>
          <h1 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Most small businesses don&apos;t need a bigger website. They need one
            that answers the phone.
          </h1>
        </Reveal>
      </section>

      {/* ── The argument ────────────────────────────────────────────────── */}
      <section className="px-6 pb-16 lg:px-10 lg:pb-24">
        <Reveal className="mx-auto max-w-3xl">
          <div className="space-y-6 text-lg leading-relaxed text-white/65">
            <p>
              Liays Inc is a Winnipeg studio run by Ezra Ezirim. I build websites
              for local service businesses — and then I keep running them, which
              is the part most studios skip.
            </p>
            <p>
              The pattern that started this is easy to see once you look for it.
              A plumber with four hundred Google reviews and a 4.8 rating has
              nowhere to send anyone. A restaurant that has been full every
              Friday for nine years has a Facebook page and a phone number. The
              demand already exists. The business is already good. There is just
              nothing on the other end of the search.
            </p>
            <p>
              Meanwhile the agencies quoting those businesses want four thousand
              dollars and eight weeks, and open with a discovery workshop. For a
              one-page site that needs to say who you are, what you do, and how
              to reach you. That gap — real demand on one side, a quote nobody
              sensible would accept on the other — is the whole reason this
              exists.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── The offer, restated as a position ───────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              So the offer is deliberately boring.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-white/60">
              <p>
                {website.price} for a one-page site, live five business days
                after you send the material. Written for you, so you don&apos;t
                have to sit down and describe your own business in marketing
                language. Click-to-call, a quote form, your map, your reviews.
              </p>
              <p>
                Not a redesign. Not a rebrand. The smallest thing that turns a
                Google search into a phone call, done properly and done this
                week.
              </p>
              <p className="text-white/45">
                The first {foundingSlotsLeft} go out at {website.price} because
                early clients take a chance on a studio with a short portfolio,
                and their sites become that portfolio. After that it&apos;s{" "}
                {website.priceAfter}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ImageSlot
              src="/hero/city-tall.webp"
              alt="Downtown Winnipeg from the air"
              label="Winnipeg"
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Principles ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              How we work
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="flex h-full flex-col gap-3 bg-ink p-7">
                  <div className="flex items-start gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-accent" />
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Honest standing ─────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Where we actually are
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-white/60">
            <p>
              Liays is new. The portfolio is three sites — a chin chin storefront
              with Stripe checkout, an event-finance platform, and a non-profit —
              all live, all still ours to maintain. You can click every one of
              them from the work page and judge for yourself.
            </p>
            <p>
              That is a short list, and saying so is deliberate. A new studio
              claiming fifty clients is easy to check and easy to disbelieve.
              What we can point at is real, and what we quote is what it costs.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Close ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Send us your Google listing. We&apos;ll tell you what we&apos;d
            build.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
            Twenty minutes, free, and you leave with a plan whether or not you
            hire us.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton href={BOOKING.freeConsult} external className="whitespace-nowrap">
              Book a free consult
              <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="/work" variant="ghost" className="whitespace-nowrap">
              See the work first
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
