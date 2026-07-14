"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "accent" | "outline" | "ghost";
  className?: string;
  fullWidth?: boolean;
};

export function MagneticButton({
  href,
  children,
  variant = "accent",
  className = "",
  fullWidth = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.35 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    "focus-ring relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer select-none active:scale-[0.96]";
  const variants: Record<string, string> = {
    accent: "bg-accent text-ink hover:bg-accent-soft",
    outline: "border border-white/20 text-[var(--color-fg-on-ink)] hover:border-white/50",
    ghost: "text-[var(--color-fg-on-ink)] hover:text-accent",
  };

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={fullWidth ? "block w-full" : "inline-block"}
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${base} ${fullWidth ? "w-full" : ""} ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
