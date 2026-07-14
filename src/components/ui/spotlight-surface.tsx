"use client";

import type { ReactNode } from "react";
import { useSpotlight } from "./use-spotlight";

type SpotlightSurfaceProps = {
  children: ReactNode;
  className?: string;
  glow?: "accent" | "violet";
};

export function SpotlightSurface({ children, className = "", glow = "accent" }: SpotlightSurfaceProps) {
  const { ref, glowStyle, handlers } = useSpotlight<HTMLDivElement>(glow);

  return (
    <div ref={ref} {...handlers} className={`group relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={glowStyle}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
