"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * A price that counts up the first time it scrolls into view.
 *
 * Takes the finished string — "$999", "From $5,500", "Let's talk" — and works
 * out whether there is a number in it. If there is, the digits run up to it and
 * the surrounding text is preserved exactly, commas included. If there is not,
 * the value renders as-is. So the ledger can hold prices and "Let's talk" side
 * by side without the caller having to say which is which.
 *
 * Two details that stop it looking cheap:
 *
 *  · The element reserves its final width from first paint, and the digits are
 *    tabular. A counter that reflows its own row while animating drags every
 *    neighbouring element with it, which reads as jank rather than polish.
 *  · It eases out. A linear count arrives at a constant speed and stops dead;
 *    easing lands it.
 *
 * Under prefers-reduced-motion it renders the final value and never animates.
 */

const DURATION = 1100;

function parse(value: string) {
  // First run of digits, allowing thousands separators.
  const match = value.match(/\d[\d,]*/);
  if (!match) return null;
  const digits = match[0];
  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice((match.index ?? 0) + digits.length),
    target: Number(digits.replace(/,/g, "")),
    grouped: digits.includes(","),
  };
}

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  // Memoised: `parse` returns a fresh object each call, and an unmemoised one
  // in the dependency array below would restart the effect on every render.
  const parsed = useMemo(() => parse(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number | null = null;
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();

        const start = performance.now();
        const run = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          // easeOutExpo — fast away, soft landing.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -9 * t);
          const current = Math.round(parsed.target * eased);
          setDisplay(
            parsed.prefix +
              (parsed.grouped ? current.toLocaleString("en-CA") : String(current)) +
              parsed.suffix
          );
          if (t < 1) {
            raf = requestAnimationFrame(run);
          } else {
            // Hand back to a single plain span. The width-holder below exists
            // only for the duration of the climb; leaving it in place would
            // mean the price is in the DOM twice forever, and copying the row
            // would yield "$999$999".
            setDone(true);
          }
        };
        // Start from zero rather than flashing the final value for one frame.
        setDisplay(parsed.prefix + (parsed.grouped ? "0" : "0") + parsed.suffix);
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [parsed]);

  /* Before the count starts, and after it lands, this is just the price — one
     node, correct to read and correct to copy. The stacked pair below only
     exists during the climb. */
  if (display === null || done) {
    return <span className={`tabular-nums ${className}`} ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className}`}>
      {/* Holds the row's width at the final value while the digits climb, so
          the row cannot reflow mid-animation. aria-hidden, because the live
          value beside it is the one that should be announced. */}
      <span aria-hidden="true" className="invisible block">
        {value}
      </span>
      <span className="absolute inset-0 block">{display}</span>
    </span>
  );
}
