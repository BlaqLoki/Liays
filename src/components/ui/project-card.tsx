"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Portfolio card with a pointer-tracked 3D tilt.
 *
 * Adapted from a shadcn LocationCard rather than dropped in, because this
 * project is not a shadcn app — there is no `cn`, no Button primitive, and none
 * of the `--background` / `--secondary` tokens that component paints with.
 * Pasting it verbatim would have meant standing up a second design system
 * alongside design.md. What survived the port is the tilt maths, which is the
 * only genuinely interesting part.
 *
 * Three things the original gets wrong that are fixed here:
 *
 *  · It nests a <Button> inside an <a>. Interactive controls cannot contain
 *    other interactive controls — it is invalid HTML and screen readers
 *    announce it inconsistently. The whole card is one link instead.
 *  · It ignores prefers-reduced-motion. A tilt that swings on every pointer
 *    move is exactly the vestibular trigger that setting exists for.
 *  · It sets a background-image in inline CSS, which next/image cannot optimise
 *    and which nothing preloads. These are 1200px screenshots, so they go
 *    through <Image> and ship as sized, lazy webp.
 */

type ProjectCardProps = {
  title: string;
  tag: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  /** Above-the-fold cards should not lazy-load; it costs LCP. */
  priority?: boolean;
};

export function ProjectCard({
  title,
  tag,
  blurb,
  imageSrc,
  imageAlt,
  href,
  priority = false,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring so the card settles rather than snapping to the cursor.
  const springX = useSpring(x, { stiffness: 260, damping: 26 });
  const springY = useSpring(y, { stiffness: 260, damping: 26 });

  // Shallower than the 10deg the original used. At 10deg a wide card's far
  // edge visibly detaches from the grid and the screenshot inside it skews
  // enough to look like a rendering fault.
  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // Normalised to -0.5 … 0.5 from the card's centre.
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d" }
      }
      className="group relative"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring block rounded-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-ink-soft shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/*
            Weighted hard to the bottom third, and stronger than it first looks
            like it needs to be.

            These are screenshots of websites, so the image already contains
            large type of its own — and every one of these sites puts a headline
            in the lower-middle of the hero. A gentle scrim left that headline
            legible directly above this card's title, so each card read as two
            competing headlines. Crushing the bottom third turns the site's own
            copy into texture and leaves one piece of type in charge.
          */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink from-0% via-ink/80 via-30% to-transparent to-70%" />

          {/* Lifted toward the viewer so the tilt reads as depth, not as skew. */}
          <div
            style={reduced ? undefined : { transform: "translateZ(40px)" }}
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6"
          >
            <div className="min-w-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/50">
                {tag}
              </p>
              <h3 className="font-display mt-1.5 truncate text-2xl font-semibold tracking-tight text-white">
                {title}
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-content-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
            >
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </Link>

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">
        {blurb}
      </p>
    </motion.div>
  );
}
