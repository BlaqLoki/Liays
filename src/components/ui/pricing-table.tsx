import { ArrowUpRight, Check, Sparkles, LifeBuoy, Megaphone } from "lucide-react";
import type { ReactNode } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import {
  website,
  contentPack,
  carePlan,
  foundingSlotsLeft,
  type Offer,
} from "@/lib/offers";

/**
 * Three columns, the offer in the middle.
 *
 * Not a price ladder — the flanking columns are add-ons that only exist once
 * you've bought the middle one. That's why the order isn't cheapest-to-dearest:
 * the thing being sold sits in the centre, raised and lit, and the two
 * optional extras sit either side of it deliberately quieter.
 *
 * Ported from a shadcn pricing block. The tokens, the button and the highlight
 * treatment are this project's; what carried over is the shape — icon, name,
 * short description, a price set far larger than anything near it, CTA, then
 * features below a rule.
 */

type Column = {
  offer: Offer;
  icon: ReactNode;
  blurb: string;
  cta: string;
  href: string;
  note?: string;
  featured?: boolean;
};

const columns: Column[] = [
  {
    offer: contentPack,
    icon: <Megaphone className="size-4" aria-hidden="true" />,
    blurb: "For when the site is live and nobody knows yet.",
    cta: "Add content",
    href: "/services#add-ons",
    note: "Added after launch",
  },
  {
    offer: website,
    icon: <Sparkles className="size-4" aria-hidden="true" />,
    blurb: "For businesses with real customers and nowhere to send them.",
    cta: "Claim a founding slot",
    href: "/contact",
    note: website.terms,
    featured: true,
  },
  {
    offer: carePlan,
    icon: <LifeBuoy className="size-4" aria-hidden="true" />,
    blurb: "For when you'd rather not think about it again.",
    cta: "Add a care plan",
    href: "/services#add-ons",
    note: "Cancel any time, no notice",
  },
];

/** "$995" → ["$", "995"], so the numeral can be set large and the symbol small. */
function splitPrice(price: string): [string, string] {
  const match = price.match(/^(\D*)(.*)$/);
  return match ? [match[1], match[2]] : ["", price];
}

export function PricingTable() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {columns.map((col, i) => (
        /*
         * The offer leads on a phone, and sits centre on a desktop.
         *
         * Stacked, source order put the $399 add-on first — so the first thing
         * a phone saw was an extra for a product it hadn't been offered yet.
         * The centre position carries primacy in three columns; in one column
         * only being first does. Order flips at lg, where the visual centre
         * takes over again.
         */
        <Reveal
          key={col.offer.id}
          delay={i * 0.08}
          className={
            col.featured
              ? "order-first sm:col-span-2 lg:order-none lg:col-span-1"
              : ""
          }
        >
          <PricingColumn column={col} />
        </Reveal>
      ))}
    </div>
  );
}

function PricingColumn({ column }: { column: Column }) {
  const { offer, icon, blurb, cta, href, note, featured } = column;
  const [symbol, amount] = splitPrice(offer.price);

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-7 transition-colors lg:p-8 ${
        featured
          ? "border-accent/45 bg-ink-soft/80 shadow-2xl lg:-mt-4 lg:pb-10"
          : "border-white/10 bg-ink-soft/35 hover:border-white/20"
      }`}
    >
      {/* The featured column earns one warm wash from the top, the way the
          reference lifts its middle card. The others stay flat so the contrast
          does the work. */}
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 16%, transparent) 0%, transparent 55%)",
          }}
        />
      )}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={featured ? "text-accent" : "text-white/45"}>{icon}</span>
            <h3 className="font-display text-base font-semibold tracking-tight">
              {offer.name}
            </h3>
          </div>
          {featured && (
            <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-accent">
              {foundingSlotsLeft} left
            </span>
          )}
        </div>

        <p className="mt-3 min-h-[2.75rem] text-sm leading-relaxed text-white/55">
          {blurb}
        </p>

        {/* Symbol small and baseline-aligned, numeral oversized. */}
        <div className="mt-6 flex items-baseline gap-3">
          <div className="flex items-baseline">
            <span
              className={`font-display font-bold tabular-nums leading-none tracking-tight ${
                featured ? "text-2xl" : "text-xl"
              } text-white/55`}
            >
              {symbol}
            </span>
            <span
              className={`font-display font-bold tabular-nums leading-none tracking-tight ${
                featured ? "text-6xl sm:text-7xl" : "text-4xl sm:text-5xl"
              }`}
            >
              {amount}
            </span>
          </div>
          <div className="text-xs leading-tight text-white/45">
            <p>{offer.unit.replace(" · optional", "").replace(" · after your site is live", "")}</p>
            {offer.priceAfter && <p>then {offer.priceAfter}</p>}
          </div>
        </div>

        <div className="mt-7">
          <MagneticButton
            href={href}
            fullWidth
            variant={featured ? "accent" : "outline"}
            className="whitespace-nowrap"
          >
            {cta}
            {featured && <ArrowUpRight size={16} />}
          </MagneticButton>
        </div>

        {note && (
          <p className="mt-4 text-xs leading-relaxed text-white/40">{note}</p>
        )}

        <ul className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
          {offer.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                size={14}
                className={`mt-1 shrink-0 ${featured ? "text-accent" : "text-white/35"}`}
              />
              <span className="text-sm leading-relaxed text-white/65">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
