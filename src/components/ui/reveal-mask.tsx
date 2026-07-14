"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function RevealMask({
  children,
  className,
  delay = 0,
  trigger = "inView",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "mount" animates immediately on load — use for above-the-fold content
   * that's visible without scrolling, where a scroll-triggered reveal has
   * nothing to trigger off of. "inView" (default) animates on scroll into view. */
  trigger?: "mount" | "inView";
}) {
  const motionProps =
    trigger === "mount"
      ? { animate: { y: "0%" } }
      : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-80px" } };

  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        initial={{ y: "110%" }}
        {...motionProps}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
