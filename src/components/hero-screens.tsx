"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MockScreen } from "@/components/ui/mock-screen";

type ScreenConfig = {
  name: string;
  tag: string;
  gradient: string;
  position: string;
  rotateY: number;
  rotateX: number;
  scale?: number;
  opacity?: number;
  duration: number;
  delay?: number;
};

const screens: ScreenConfig[] = [
  {
    name: "Prairie Realty",
    tag: "Real Estate",
    gradient: "from-[#202a1a] to-[#141d10]",
    position: "left-[1%] top-[58%] -translate-y-1/2",
    rotateY: 24,
    rotateX: 4,
    duration: 7,
  },
  {
    name: "Bison Freight",
    tag: "Logistics",
    gradient: "from-[#262415] to-[#181608]",
    position: "left-[9%] top-[22%]",
    rotateY: 18,
    rotateX: 2,
    scale: 0.8,
    opacity: 0.55,
    duration: 8,
    delay: 0.6,
  },
  {
    name: "Northgate Dental",
    tag: "Healthcare",
    gradient: "from-[#241f1a] to-[#161310]",
    position: "right-[9%] top-[20%]",
    rotateY: -18,
    rotateX: 3,
    scale: 0.8,
    opacity: 0.55,
    duration: 7.5,
    delay: 0.3,
  },
  {
    name: "Forks Market Co.",
    tag: "Retail",
    gradient: "from-[#2a1c16] to-[#18110c]",
    position: "right-[1%] top-[58%] -translate-y-1/2",
    rotateY: -24,
    rotateX: 4,
    duration: 6.5,
    delay: 0.9,
  },
];

export function HeroScreens() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      {screens.map((s) => (
        <div
          key={s.name}
          className={`absolute ${s.position}`}
          style={{ perspective: 1400 }}
        >
          <motion.div
            style={{
              rotateY: s.rotateY,
              rotateX: s.rotateX,
              scale: s.scale ?? 1,
              opacity: s.opacity ?? 0.85,
            }}
            animate={prefersReducedMotion ? undefined : { y: [0, -16, 0] }}
            transition={{
              duration: s.duration,
              delay: s.delay ?? 0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MockScreen name={s.name} tag={s.tag} gradient={s.gradient} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
