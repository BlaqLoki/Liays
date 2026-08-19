/* Hallmark · genre: editorial · macrostructure: Split Diptych · design-system: design.md · designed-as-app */
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import ContactForm from "@/components/contact-form";
import { BOOKING } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact — Liays Inc",
  description:
    "Get in touch with Liays Inc for a free consult on your website or Notion training.",
};

/* Phone deliberately omitted — the previous value was (204) 555-0119, and 555
 * numbers are reserved fictional numbers. Add a real line here when there is one:
 * { label: "Phone", value: "…", href: "tel:…" }
 */
const details = [
  { label: "Email", value: "info@liays.ca", href: "mailto:info@liays.ca" },
  { label: "Location", value: "Winnipeg, Manitoba" },
  { label: "Response time", value: "Within 1 business day" },
];

const reassurance = [
  "A free consult first — no obligation, no pressure",
  "Prices are published, so the quote won't surprise you",
  "50% deposit to book, balance on launch day",
  "You own everything we build for you",
];

export default function ContactPage() {
  return (
    <section className="px-6 pb-24 pt-12 lg:px-10 lg:pb-32 lg:pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-20">
        <Reveal>
          <h1 className="font-display text-balance text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            Tell us a bit about your business and what you need — a new site, a
            Notion workspace, or both. We reply within one business day.
          </p>

          {/* Two routes on purpose: book if you'd rather talk, write if you'd
              rather not. Collapsing these into one loses whoever prefers the other. */}
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            <a
              href={BOOKING.freeConsult}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring group flex items-baseline justify-between gap-4 py-4"
            >
              <span>
                <span className="block text-sm font-semibold transition-colors group-hover:text-accent">
                  Book a free consult
                </span>
                <span className="mt-0.5 block text-xs text-white/45">
                  20 minutes, no obligation
                </span>
              </span>
              <ArrowUpRight
                size={15}
                className="shrink-0 text-white/40 transition-colors group-hover:text-accent"
              />
            </a>
            <a
              href={BOOKING.projectCall}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring group flex items-baseline justify-between gap-4 py-4"
            >
              <span>
                <span className="block text-sm font-semibold transition-colors group-hover:text-accent">
                  Book a project call
                </span>
                <span className="mt-0.5 block text-xs text-white/45">
                  45 minutes, for a project you&apos;re ready to start
                </span>
              </span>
              <ArrowUpRight
                size={15}
                className="shrink-0 text-white/40 transition-colors group-hover:text-accent"
              />
            </a>
          </div>

          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <dt className="text-sm text-white/50">{d.label}</dt>
                <dd className="text-sm font-semibold">
                  {d.href ? (
                    <a
                      href={d.href}
                      className="focus-ring inline-flex items-center py-2 transition-colors hover:text-accent"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 space-y-3">
            {reassurance.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span className="text-sm leading-relaxed text-white/55">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
