"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useSpotlight } from "./use-spotlight";

type SpotlightCardProps = {
  href: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  glow?: "accent" | "violet";
};

export function SpotlightCard({
  href,
  children,
  className = "",
  contentClassName = "h-full",
  glow = "accent",
}: SpotlightCardProps) {
  const { ref, glowStyle, handlers } = useSpotlight<HTMLAnchorElement>(glow);
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      ref={ref}
      href={href}
      {...handlers}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`focus-ring group relative block overflow-hidden transition-transform duration-200 active:scale-[0.98] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={glowStyle}
        aria-hidden="true"
      />
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </Link>
  );
}
