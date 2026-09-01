/* A spec one-pager for Lucky Barber Shop, 450 St Anne's Rd, Winnipeg.
 *
 * Built unasked, to show on a cold call. That makes two things load-bearing:
 *
 * 1. VERIFIED vs INVENTED. Everything factual on this page — the name, the
 *    address, the phone number, 4.6 stars, 439 reviews, the 9:30pm close —
 *    comes off their public Google listing. Nothing else is asserted as fact.
 *    Service names are the generic set every barbershop offers; prices are
 *    rendered as em dashes, not numbers, because inventing a barber's prices
 *    and putting them on a page with his name is the kind of thing that ends a
 *    sales call badly.
 *
 * 2. IT MUST NEVER OUTRANK THEM. noindex, nofollow — a page carrying their name
 *    and address that Google can see is a competing local citation with the
 *    wrong phone number waiting to happen. It is also visibly badged as a
 *    demo, so nobody who receives the link mistakes it for the real thing.
 *
 * Swap the placeholders for their Google photos and this is a client build.
 */
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { MapPin, Phone, Star, Clock, ExternalLink } from "lucide-react";
import { ImageSlot } from "@/components/ui/image-slot";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-shop",
});

export const metadata: Metadata = {
  title: "Lucky Barber Shop — Winnipeg",
  description:
    "Barber shop on St Anne's Road in Winnipeg. Walk in or call (204) 881-8533.",
  // Never let this compete with their real Google listing.
  robots: { index: false, follow: false, nocache: true },
  /*
   * Overridden, not inherited. Without this the root layout's card wins, so a
   * link texted to a barber previews as "Liays Inc — Winnipeg Websites, Live in
   * Five Days" — an agency ad, at the exact moment he is deciding whether to
   * open it. It should preview as his shop.
   */
  openGraph: {
    title: "Lucky Barber Shop — Winnipeg",
    description:
      "Barber shop on St Anne's Road. 4.6 stars, 439 Google reviews. Walk in or call (204) 881-8533.",
    type: "website",
    locale: "en_CA",
  },
};

/* Straight off the Google listing — the only facts asserted here. */
const shop = {
  name: "Lucky Barber Shop",
  rating: "4.6",
  reviews: "439",
  address: "450 St Anne's Rd, Winnipeg, MB R2M 3C8",
  phone: "(204) 881-8533",
  phoneHref: "+12048818533",
  closes: "9:30 p.m.",
  maps: "https://www.google.com/maps/search/?api=1&query=Lucky+Barber+Shop+450+St+Anne%27s+Rd+Winnipeg",
};

/* Generic to the trade, not claimed as theirs. Prices are deliberately blank —
   they get filled in on Day 0, from the barber, in his own words. */
const services = [
  "Haircut",
  "Skin fade",
  "Beard trim & line-up",
  "Hot towel shave",
  "Kids' cut",
  "Cut & beard combo",
];

export default function LuckyBarberDemo() {
  return (
    <div className={`${oswald.variable} min-h-screen bg-[#12100E] text-[#F2EDE4]`}>
      {/* Demo badge. Fixed, unmissable, and honest about what this is. */}
      <div className="sticky top-0 z-50 border-b border-[#C9A227]/30 bg-[#1A1713] px-4 py-2 text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#C9A227]">
          Demo · built by Liays Inc · not an official Lucky Barber Shop page
        </p>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageSlot
            label="Shop interior — pull from their Google photos"
            ratio="16/9"
            className="h-full w-full [&>*]:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/85 to-[#12100E]/70" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A227]"
            style={{ fontFamily: "var(--font-shop)" }}
          >
            St Anne&apos;s Road · Winnipeg
          </p>
          <h1
            className="mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-shop)" }}
          >
            Lucky Barber
            <br />
            Shop
          </h1>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-[#C9A227]">
              <Star size={15} className="fill-current" aria-hidden="true" />
              {shop.rating}
            </span>
            <span className="text-[#F2EDE4]/50">
              {shop.reviews} Google reviews
            </span>
          </div>

          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-[#F2EDE4]/65">
            Walk in, or call ahead. Open until {shop.closes} today.
          </p>

          {/* The single most important element on a barbershop page. */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`tel:${shop.phoneHref}`}
              className="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-[#C9A227] px-9 text-base font-bold uppercase tracking-wide text-[#12100E] transition-transform hover:scale-[1.02] sm:w-auto"
              style={{ fontFamily: "var(--font-shop)" }}
            >
              <Phone size={18} aria-hidden="true" />
              Call {shop.phone}
            </a>
            <a
              href={shop.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-[#F2EDE4]/25 px-8 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-[#C9A227] hover:text-[#C9A227] sm:w-auto"
              style={{ fontFamily: "var(--font-shop)" }}
            >
              <MapPin size={16} aria-hidden="true" />
              Directions
            </a>
          </div>
        </div>
      </header>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="border-t border-[#F2EDE4]/10 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-center text-3xl font-bold uppercase tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-shop)" }}
          >
            The Cuts
          </h2>

          <ul className="mt-10 divide-y divide-[#F2EDE4]/10 border-y border-[#F2EDE4]/10">
            {services.map((s) => (
              <li key={s} className="flex items-baseline justify-between gap-6 py-4">
                <span className="text-lg">{s}</span>
                {/* Em dash, not a number. His prices go here on Day 0. */}
                <span
                  className="shrink-0 text-lg font-semibold text-[#C9A227]/45"
                  style={{ fontFamily: "var(--font-shop)" }}
                  aria-label="Price to be confirmed"
                >
                  $—
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-xs text-[#F2EDE4]/35">
            Demo layout — real services and prices go here.
          </p>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="px-6 pb-16 lg:pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <ImageSlot label="Fade — before / after" ratio="3/4" sizes="(max-width: 640px) 100vw, 33vw" />
            <ImageSlot label="Shop floor" ratio="3/4" sizes="(max-width: 640px) 100vw, 33vw" />
            <ImageSlot label="Beard line-up" ratio="3/4" sizes="(max-width: 640px) 100vw, 33vw" />
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#F2EDE4]/10 bg-[#17130F] px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-1.5 text-[#C9A227]">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={22} className="fill-current" aria-hidden="true" />
            ))}
          </div>
          <p
            className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl"
            style={{ fontFamily: "var(--font-shop)" }}
          >
            {shop.rating} out of 5
          </p>
          <p className="mt-3 text-base text-[#F2EDE4]/60">
            from {shop.reviews} Google reviews
          </p>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-[#F2EDE4]/40">
            Demo layout — three real reviews would sit here, pulled straight from
            the Google listing.
          </p>
        </div>
      </section>

      {/* ── Find us ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#F2EDE4]/10 px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A227]">
              <MapPin size={13} aria-hidden="true" />
              Find us
            </p>
            <a
              href={shop.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-base leading-relaxed transition-colors hover:text-[#C9A227]"
            >
              {shop.address}
              <ExternalLink size={13} className="mt-1.5 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A227]">
              <Phone size={13} aria-hidden="true" />
              Call
            </p>
            <a
              href={`tel:${shop.phoneHref}`}
              className="text-base transition-colors hover:text-[#C9A227]"
            >
              {shop.phone}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A227]">
              <Clock size={13} aria-hidden="true" />
              Hours
            </p>
            <p className="text-base">Open until {shop.closes}</p>
            <p className="text-xs text-[#F2EDE4]/35">
              Demo — full week&apos;s hours go here.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky call bar, phones only ─────────────────────────────────── */}
      <a
        href={`tel:${shop.phoneHref}`}
        className="fixed inset-x-0 bottom-0 z-40 flex min-h-[58px] items-center justify-center gap-2.5 bg-[#C9A227] text-base font-bold uppercase tracking-wide text-[#12100E] sm:hidden"
        style={{ fontFamily: "var(--font-shop)" }}
      >
        <Phone size={18} aria-hidden="true" />
        Call {shop.phone}
      </a>

      <footer className="border-t border-[#F2EDE4]/10 px-6 py-10 pb-24 text-center sm:pb-10">
        <p className="text-xs text-[#F2EDE4]/35">
          Demo page built by{" "}
          <a href="https://www.liays.ca" className="text-[#C9A227] hover:underline">
            Liays Inc
          </a>{" "}
          · Winnipeg · Not affiliated with Lucky Barber Shop
        </p>
      </footer>
    </div>
  );
}
