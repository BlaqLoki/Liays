/* Hallmark · nav archetype: N9 edge-aligned minimal
 * Wordmark hard-left, CTA hard-right, empty span between. The five destinations
 * live in a disclosure panel at every width — filling the middle with a link row
 * would rebuild the archetype this replaces.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

/* Ordered by what a cold visitor needs, not by org chart. "Websites" beats
   "Services" because it names the thing they came for. Pricing sits second
   because publishing it is the differentiator, and burying it five links deep
   wastes the only thing competitors won't copy. Training drops below Work — a
   real offer, but not what most first-time visitors are here to buy. */
const links = [
  { href: "/services", label: "Websites" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/notion-training", label: "Training" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="relative z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="focus-ring font-display inline-flex items-center py-2 text-lg font-bold tracking-tight text-[var(--color-fg-on-ink)]"
        >
          Liays<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/contact"
            className="focus-ring hidden items-center gap-1.5 whitespace-nowrap py-2.5 text-sm font-semibold text-[var(--color-fg-on-ink)] transition-colors duration-200 hover:text-accent sm:inline-flex"
          >
            Start a project
            <ArrowUpRight size={15} />
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="focus-ring -mr-2.5 flex h-11 w-11 cursor-pointer items-center justify-center text-[var(--color-fg-on-ink)]"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-y border-white/10 bg-ink"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-6 py-4 lg:px-10">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`focus-ring border-b border-white/10 py-4 text-lg font-medium transition-colors last:border-b-0 ${
                      active
                        ? "text-accent"
                        : "text-white/70 hover:text-[var(--color-fg-on-ink)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center gap-1.5 border-t border-white/10 py-4 text-lg font-semibold text-[var(--color-fg-on-ink)] transition-colors hover:text-accent sm:hidden"
              >
                Start a project
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
