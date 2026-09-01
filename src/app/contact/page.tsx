/* Hallmark · genre: editorial · macrostructure: Split Studio · design-system: design.md
 *
 * The last page before a decision, so it removes reasons not to act rather than
 * adding reasons to. Three routes out — call, form, phone — because a
 * tradesperson reading this at 8pm wants to tap a number, and a business owner
 * comparing quotes wants to type.
 */
import type { Metadata } from "next";
import { ArrowUpRight, Check, Clock, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import ContactForm from "@/components/contact-form";
import { BOOKING } from "@/lib/links";
import { website, foundingSlotsLeft } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Contact — Liays Inc",
  description:
    "Book a free 20-minute consult, or send us your Google listing and we'll tell you what we'd build. Winnipeg.",
};

const details = [
  { label: "Email", value: "info@liays.ca", href: "mailto:info@liays.ca", icon: Mail },
  { label: "Where", value: "Winnipeg, Manitoba", icon: MapPin },
  { label: "Reply", value: "Within one business day", icon: Clock },
];

/* Each one answers a specific reason people don't send the message. Not
   features — objections, in the order they occur to someone hovering over the
   button. */
const reassurance = [
  "The consult is free, and there's no pitch deck",
  "Every price is already published — the quote won't surprise you",
  "50% to book, the balance on launch day",
  "You own the domain, the content, all of it",
  "If we're not the right fit we'll say so on the call",
];

export default function ContactPage() {
  return (
    <>
      <section className="px-6 pb-24 pt-12 lg:px-10 lg:pb-32 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[6fr_5fr] lg:gap-20">
          {/* ── Left: the ask and the reasons ─────────────────────────── */}
          <div>
            <Reveal>
              <p className="text-sm font-semibold text-accent">
                {foundingSlotsLeft} founding{" "}
                {foundingSlotsLeft === 1 ? "slot" : "slots"} left at{" "}
                {website.price}
              </p>
              <h1 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
                Send us your Google listing. We&apos;ll tell you what we&apos;d
                build.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/60">
                Twenty minutes on a call, or a message here — whichever you&apos;d
                rather. Either way you leave knowing what we&apos;d do and what
                it costs, whether or not you hire us.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <MagneticButton
                  href={BOOKING.freeConsult}
                  external
                  className="whitespace-nowrap"
                >
                  Book a free consult
                  <ArrowUpRight size={16} />
                </MagneticButton>
                <MagneticButton
                  href={BOOKING.projectCall}
                  external
                  variant="ghost"
                  className="whitespace-nowrap"
                >
                  Already decided — book a project call
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
                {reassurance.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5">
                    <Check size={16} className="mt-1 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-white/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {details.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.label} className="flex flex-col gap-1.5">
                      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                        <Icon size={13} aria-hidden="true" />
                        {d.label}
                      </dt>
                      <dd className="text-sm font-medium">
                        {d.href ? (
                          <a
                            href={d.href}
                            className="focus-ring transition-colors hover:text-accent"
                          >
                            {d.value}
                          </a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </div>

          {/* ── Right: the form ───────────────────────────────────────── */}
          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-white/10 bg-ink-soft/40 p-6 lg:p-8">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Or just tell us what you need
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                A sentence is plenty. Your business name and what you do is
                enough for us to come back with something useful.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
