import { useRef, useState, type MouseEvent } from "react";

const GLOW_RGB: Record<"accent" | "gold", string> = {
  accent: "213,100,47",
  gold: "199,154,62",
};

export function useSpotlight<T extends HTMLElement>(glow: "accent" | "gold" = "accent") {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  function onMouseMove(e: MouseEvent<T>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  const glowStyle = {
    opacity: active ? 1 : 0,
    background: `radial-gradient(360px circle at ${pos.x}% ${pos.y}%, rgba(${GLOW_RGB[glow]},0.16), transparent 70%)`,
  };

  return {
    ref,
    glowStyle,
    handlers: {
      onMouseMove,
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => setActive(false),
    },
  };
}
