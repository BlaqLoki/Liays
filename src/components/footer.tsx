import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { RevealMask } from "@/components/ui/reveal-mask";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/services", label: "Services" },
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Notion",
    links: [
      { href: "/notion-training", label: "Team Training" },
      { href: "/notion-training#workshops", label: "Workshops" },
      { href: "/services#consulting", label: "Systems & Consulting" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:hello@liays.ca", label: "hello@liays.ca" },
      { href: "tel:+12045550119", label: "(204) 555-0119" },
      { href: "/contact", label: "Winnipeg, MB" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-12 border-b border-white/10 pb-16 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
              <RevealMask>Let&apos;s build something your team actually uses.</RevealMask>
            </p>
          </div>
          <Link
            href="/contact"
            className="focus-ring group inline-flex w-fit items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.03]"
          >
            Book a free consult
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 pt-14 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-xl font-bold">
              Liays<span className="text-accent">.</span>
            </span>
            <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-white/50">
              Websites and Notion systems for Winnipeg businesses that want to move faster.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Liays Inc on Instagram"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Liays Inc on LinkedIn"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="focus-ring text-sm text-white/70 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Liays Inc. All rights reserved.</p>
          <p>Designed &amp; built in Winnipeg, Manitoba.</p>
        </div>
      </div>
    </footer>
  );
}
