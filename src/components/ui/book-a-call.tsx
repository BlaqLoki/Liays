"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Closing call-to-action: claim and CTAs on the left, a two-image collage right.
 *
 * Adapted from a shadcn hero rather than pasted. Three things were dropped on
 * the way in:
 *
 *  · `react-wrap-balancer`. `text-wrap: balance` is native CSS now and needs no
 *    JavaScript, so the dependency buys a hydration pass and nothing else.
 *  · `motion/react`. This project is on framer-motion, and Reveal already wraps
 *    the scroll-reveal pattern the original hand-rolled with variants.
 *  · shadcn tokens (`bg-background`, `text-muted-foreground`). Those do not
 *    exist here; the ink/paper/accent set does.
 *
 * The images are placeholders. Swapping them is a two-line change in the props
 * — that is the whole reason they are props and not baked in.
 */

type BookACallProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  primaryImage: string;
  primaryAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
};

export function BookACall({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  primaryImage,
  primaryAlt,
  secondaryImage,
  secondaryAlt,
}: BookACallProps) {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-ink px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="flex flex-col items-start gap-5">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/60">
              {description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <MagneticButton href={primaryHref} external className="whitespace-nowrap">
                {primaryLabel}
                <ArrowUpRight size={16} />
              </MagneticButton>
              {secondaryHref && secondaryLabel && (
                <MagneticButton
                  href={secondaryHref}
                  variant="ghost"
                  className="whitespace-nowrap"
                >
                  {secondaryLabel}
                </MagneticButton>
              )}
            </div>
          </div>
        </Reveal>

        {/* Collage. The offset is achieved with grid row/column spans rather
            than absolute positioning, so the pair still reflows on a phone
            instead of overlapping into an unreadable stack. */}
        <Reveal delay={0.12}>
          {/*
            aspect-[5/6] is what makes this work, and it is not decorative.

            The grid declares six rows, but rows size to their content and both
            children are `relative` boxes holding `fill` images — which are
            absolutely positioned and therefore contribute no height at all. So
            every row collapsed to a few pixels and the collage rendered as two
            horizontal smears. Giving the container an aspect ratio gives the
            rows something to divide, and 5/6 matches the 5×6 track count so
            each cell comes out roughly square.
          */}
          <div className="grid aspect-[5/6] grid-cols-5 grid-rows-6 gap-4">
            {/*
              col-start-1 row-start-1 is required, not tidiness.

              The secondary image below is explicitly placed at rows 4–6. This
              one was auto-placed, so the algorithm tried to find a free 4×5
              block, couldn't fit one around the explicit cell, and pushed it
              into implicit rows 7–11 — which have no height. Computed
              grid-template-rows read "82px ×6, then 0px ×5", and the image
              rendered as a 64px smear made entirely of gaps.

              Placing both explicitly lets them overlap on purpose, which is
              what a collage is.
            */}
            <div className="relative col-span-4 col-start-1 row-span-5 row-start-1 overflow-hidden rounded-xl border border-white/10 bg-ink-soft">
              <Image
                src={primaryImage}
                alt={primaryAlt}
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-3 col-start-3 row-span-3 row-start-4 overflow-hidden rounded-xl border border-white/10 bg-ink-soft shadow-2xl">
              <Image
                src={secondaryImage}
                alt={secondaryAlt}
                fill
                sizes="(max-width: 1024px) 60vw, 300px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
