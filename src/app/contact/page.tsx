import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Liays Inc",
  description: "Get in touch with Liays Inc for a free consult on your website or Notion training.",
};

const details = [
  { icon: Mail, label: "Email", value: "hello@liaysinc.com", href: "mailto:hello@liaysinc.com" },
  { icon: Phone, label: "Phone", value: "(204) 555-0119", href: "tel:+12045550119" },
  { icon: MapPin, label: "Location", value: "Winnipeg, Manitoba" },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function ContactPage() {
  return (
    <section className="px-6 pb-28 pt-20 sm:pt-28 lg:px-10 lg:pb-36 lg:pt-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
            Tell us a bit about your business and what you need — a new site,
            a Notion workspace, or both. We reply within one business day.
          </p>

          <ul className="mt-10 space-y-5">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent">
                  <d.icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="focus-ring text-sm font-medium text-white/80 transition-colors hover:text-accent"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-white/80">{d.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-ink-soft p-6 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
