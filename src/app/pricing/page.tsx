import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Pricing — Liays Inc",
  description: "Transparent pricing for website design and Notion training packages.",
};

const webPlans = [
  {
    name: "Starter",
    price: "From $999",
    unit: "one-time",
    copy: "Our promo pricing — a polished, credible site for service businesses that need to look established online.",
    features: [
      "Ideal for restaurants (with menus), cleaning companies, plumbers, real estate agents & non-profits",
      "Up to 5 pages, basic features",
      "Mobile-responsive, on-brand design",
      "Contact form + analytics",
      "2-week typical timeline",
    ],
    featured: true,
  },
  {
    name: "Growth",
    price: "Custom quote",
    unit: "typically $2,500–$5,000",
    copy: "For businesses that need more pages, booking, blogs, or light e-commerce.",
    features: ["More pages & custom sections", "Booking or light e-commerce", "On-page SEO setup", "CMS so you can edit content", "30 days post-launch support"],
    featured: false,
  },
  {
    name: "Advanced",
    price: "$5,000–$10,000",
    unit: "quoted after scoping",
    copy: "Complex builds with transactions, user accounts, or custom integrations.",
    features: ["Payments & user accounts", "Custom integrations & automations", "Paired Notion systems build", "Dedicated project lead", "Ongoing maintenance available"],
    featured: false,
  },
];

const notionPlans = [
  {
    name: "Single Session",
    price: "$500",
    unit: "one workshop",
    copy: "A focused half-day session to get one team or workflow running in Notion.",
    features: ["Live workspace build", "Custom templates for your workflows", "Written recap", "14 days async support"],
  },
  {
    name: "Multi-Session Package",
    price: "$1,000",
    unit: "2–3 sessions",
    copy: "For teams that need onboarding plus follow-up sessions as the workspace evolves.",
    features: ["Everything in Single Session", "Follow-up sessions included", "Cross-team workflow mapping", "30 days async support"],
  },
];

function PlanCard({
  plan,
}: {
  plan: { name: string; price: string; unit: string; copy: string; features: string[]; featured?: boolean };
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-8 ${
        plan.featured
          ? "border-accent bg-ink-soft shadow-[0_0_0_1px_var(--color-accent)]"
          : "border-white/10 bg-ink-soft"
      }`}
    >
      {plan.featured && (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
          Promo pricing
        </span>
      )}
      <h3 className="font-display text-xl font-semibold tracking-tight">{plan.name}</h3>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tracking-tight">{plan.price}</span>
        <span className="text-sm text-white/50">{plan.unit}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/55">{plan.copy}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <MagneticButton
        href="/contact"
        variant={plan.featured ? "accent" : "outline"}
        className="mt-8"
        fullWidth
      >
        Get started
      </MagneticButton>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Pricing</SectionLabel>
            <h1 className="font-display mt-5 max-w-3xl text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Straightforward pricing, no surprise invoices.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              Website design starts at just $999 for service businesses that need a
              professional, low-page site. Every project starts with a free consult
              so the quote fits what you actually need.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="web-design" className="border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Website design &amp; build
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-3">
            {webPlans.map((plan) => (
              <RevealItem key={plan.name} className="h-full">
                <PlanCard plan={plan} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 text-ink lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Notion training
            </h2>
            <p className="mt-2 text-sm text-black/60">
              $500–$1,000 depending on package and number of sessions.
            </p>
          </Reveal>
          <RevealGroup className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {notionPlans.map((plan) => (
              <RevealItem key={plan.name} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold tracking-tight text-ink">
                      {plan.price}
                    </span>
                    <span className="text-sm text-black/60">{plan.unit}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">{plan.copy}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-black/70">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton href="/contact" variant="accent" className="mt-8" fullWidth>
                    Book now
                  </MagneticButton>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="px-6 py-28 lg:px-10 lg:py-36">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Not sure which package fits? We&apos;ll help you figure it out.
          </h2>
          <MagneticButton href="/contact" className="whitespace-nowrap">
            Get a custom quote
            <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
