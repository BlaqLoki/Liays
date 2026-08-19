/* Hallmark · footer archetype: Ft5 statement
 * A closing line, not a sitemap. The four link columns are gone — the nav
 * disclosure already reaches every page, and a six-page studio has no sitemap
 * worth cataloguing.
 */
import Link from "next/link";

const meta = [
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="font-display max-w-[24ch] text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Built in Winnipeg, made to keep working.
        </p>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="font-display text-lg font-bold">
              Liays<span className="text-accent">.</span>
            </span>
            <p className="mt-2 text-sm text-white/50">
              <a
                href="mailto:info@liays.ca"
                className="focus-ring inline-flex items-center py-3 transition-colors hover:text-accent"
              >
                info@liays.ca
              </a>
              {" · "}
              Winnipeg, MB
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {meta.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring inline-flex items-center whitespace-nowrap py-3 text-sm text-white/60 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social links removed until the real profiles exist. Icons pointing
              at instagram.com / linkedin.com went to the platform home pages,
              which reads as unfinished. Add them back with real URLs. */}
        </div>

        <p className="mt-10 text-xs text-white/40">
          © {new Date().getFullYear()} Liays Inc.
        </p>
      </div>
    </footer>
  );
}
