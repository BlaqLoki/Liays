/* Hallmark · genre: editorial · macrostructure: Split Studio · design-system: design.md · designed-as-app
 * Tiers are diptych rows (identity left, scope right) rather than a 3-card grid —
 * the grid flattens a real hierarchy and doesn't survive a fourth tier.
 */
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SpotlightRow } from "@/components/ui/spotlight-row";
import { BOOKING } from "@/lib/links";

export const metadata: Metadata = {
  title: "Pricing — Liays Inc",
  description:
    "Transparent pricing for website design, care plans, and Notion training. Real numbers, published.",
};

type Tier = {
  name: string;
  price: string;
  unit: string;
  note?: string;
  copy: string;
  features: string[];
};

const webPlans: Tier[] = [
  {
    name: "Launch",
    price: "$1,500",
    unit: "one-time",
    note: "$999 for our first 5 clients",
    copy: "A polished, credible site for service businesses that need to look established online.",
    features: [
      "Up to 5 pages",
      "Mobile-responsive, on-brand design",
      "Contact form + analytics",
      "2-week typical timeline",
    ],
  },
  {
    name: "Standard",
    price: "$2,500",
    unit: "one-time",
    copy: "For businesses that need more pages, booking, a blog, or light e-commerce.",
    features: [
      "Up to 10 pages & custom sections",
      "Booking or light e-commerce",
      "On-page SEO setup",
      "CMS so you can edit content yourself",
      "30 days post-launch support",
    ],
  },
  {
    name: "Custom",
    price: "From $5,500",
    unit: "quoted after scoping",
    copy: "Complex builds with transactions, user accounts, or custom integrations.",
    features: [
      "Payments & user accounts",
      "Custom integrations & automations",
      "Paired Notion systems build",
      "Dedicated project lead",
    ],
  },
];

const carePlans: Tier[] = [
  {
    name: "Essential",
    price: "$49",
    unit: "per month",
    copy: "Keeps the site online, current, and backed up. The default for every build.",
    features: [
      "Hosting, SSL & daily backups",
      "Uptime monitoring",
      "Security & platform updates",
      "30 minutes of content edits",
    ],
  },
  {
    name: "Active",
    price: "$149",
    unit: "per month",
    copy: "For businesses whose site changes — new services, seasonal menus, fresh photos.",
    features: [
      "Everything in Essential",
      "2 hours of changes each month",
      "Monthly analytics note",
    ],
  },
  {
    name: "Partner",
    price: "$399",
    unit: "per month",
    copy: "We act as your web team. Priority turnaround and a standing strategy call.",
    features: [
      "Everything in Active",
      "6 hours of work each month",
      "Quarterly strategy call",
      "Priority turnaround",
    ],
  },
];

const notionPlans: Tier[] = [
  {
    name: "Workshop",
    price: "$750",
    unit: "half-day session",
    copy: "A focused session to get one team or workflow running in Notion.",
    features: [
      "Live workspace build",
      "Custom templates for your workflows",
      "Written recap",
      "14 days async support",
    ],
  },
  {
    name: "System build",
    price: "$1,200",
    unit: "done for you",
    copy: "You don't want to learn Notion — you want it working. We build it and hand it over.",
    features: [
      "Workspace designed and built for you",
      "Data migrated in",
      "One handover walkthrough",
      "30 days async support",
    ],
  },
  {
    name: "Package",
    price: "$1,800",
    unit: "3 sessions",
    copy: "For teams that need onboarding plus follow-up as the workspace evolves.",
    features: [
      "Everything in Workshop",
      "Two follow-up sessions",
      "Cross-team workflow mapping",
      "30 days async support",
    ],
  },
];

function TierRows({ tiers, onPaper = false }: { tiers: Tier[]; onPaper?: boolean }) {
  const rule = onPaper ? "border-black/10" : "border-white/10";
  const divide = onPaper ? "divide-black/10" : "divide-white/10";
  const muted = onPaper ? "text-black/60" : "text-white/55";
  /* /60 on paper, not /45. Black at 45% over cream is only 3.29:1 and this is
     12px, so it needed 4.5. It now matches `muted`, and the hierarchy between
     them is carried by size and alignment instead — at 12px on a light ground
     there is not enough room between "readable" and "fainter than the body"
     for opacity to do that job as well. */
  const subtle = onPaper ? "text-black/60" : "text-white/45";
  const body = onPaper ? "text-black/70" : "text-white/70";
  /* Terracotta only clears AA against ink. The care plans render onPaper, so
     the hover colour and the note have to drop to the darker variant there —
     a hover state is still text, and a contrast audit of the resting page
     never sees it. */
  const accent = onPaper ? "text-accent-on-paper" : "text-accent";
  const accentHover = onPaper
    ? "group-hover:text-accent-on-paper"
    : "group-hover:text-accent";

  return (
    <div className={`divide-y ${divide} border-y ${rule}`}>
      {tiers.map((tier, i) => (
        <Reveal key={tier.name} delay={i * 0.06}>
          <SpotlightRow onPaper={onPaper}>
          <div className="grid gap-6 py-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${accentHover}`}>
                  {tier.name}
                </h3>
                {/* Leans a hair toward the reader on hover. Transform only —
                    animating font-size would reflow the row underneath it. */}
                <span className="font-display shrink-0 origin-right text-2xl font-bold tabular-nums tracking-tight transition-transform duration-300 ease-out group-hover:scale-[1.06]">
                  {tier.price}
                </span>
              </div>
              <p className={`mt-1 text-right text-xs ${subtle}`}>{tier.unit}</p>
              {tier.note && (
                <p className={`mt-2 text-xs font-semibold ${accent}`}>{tier.note}</p>
              )}
              <p className={`mt-4 max-w-sm text-sm leading-relaxed ${muted}`}>
                {tier.copy}
              </p>
            </div>

            <ul className="grid gap-2.5 sm:grid-cols-2 lg:content-start">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check
                    size={15}
                    className="mt-1 shrink-0 text-accent transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                  <span className={`text-sm leading-relaxed ${body}`}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          </SpotlightRow>
        </Reveal>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Hero — claim left, terms right */}
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
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-white/55">Deposit</dt>
                <dd className="font-semibold tabular-nums">50% to book</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-white/55">Balance</dt>
                <dd className="font-semibold">On launch day</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-white/55">Ownership</dt>
                <dd className="font-semibold">Yours, in full</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-white/55">Surprise invoices</dt>
                <dd className="font-semibold text-accent">None</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Web builds */}
      <section
        id="web-design"
        className="scroll-mt-24 border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Website design &amp; build
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
              One-time project cost. Comparable studio work in this market
              typically runs $2,500–$5,000.
            </p>
          </Reveal>
          <div className="mt-10">
            <TierRows tiers={webPlans} />
          </div>
        </div>
      </section>

      {/* Care plans — paper section, the recurring layer */}
      <section className="bg-paper px-6 py-16 text-ink lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Care plans
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/60">
              A site is a living thing. Every build includes three months of
              Essential — after that it&apos;s month-to-month, cancel any time.
            </p>
          </Reveal>
          <div className="mt-10">
            <TierRows tiers={carePlans} onPaper />
          </div>
        </div>
      </section>

      {/* Notion */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Notion training &amp; systems
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
              Learn it with your team, or have us build it and hand it over.
            </p>
          </Reveal>
          <div className="mt-10">
            <TierRows tiers={notionPlans} />
          </div>
        </div>
      </section>

      {/* Bundle — the pairing is the differentiator, so it's purchasable */}
      <section className="border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <div className="grid gap-8 border border-accent/40 bg-ink-soft p-8 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-16 lg:p-12">
            <div>
              <h2 className="font-display text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Site + system, together — $3,000
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">
                A Standard website build paired with a done-for-you Notion
                workspace. The front of the business and the back of it, set up
                to work the same way. Saves $700 against buying them separately.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <MagneticButton href={BOOKING.projectCall} external className="whitespace-nowrap">
                Start a paired project
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Not sure which package fits? We&apos;ll help you figure it out.
            </h2>
            <div className="mt-10">
              <MagneticButton href={BOOKING.projectCall} external className="whitespace-nowrap">
                Get a quote
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
