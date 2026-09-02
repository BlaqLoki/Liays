"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HoverReel } from "@/components/ui/hover-reel";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * A coverflow of the sites we've built: one in the centre, the neighbours
 * peeking in from either side.
 *
 * Built to grow. Every position is derived from an offset against the active
 * index, so adding a fourth or a fortieth site is one entry in the array and
 * nothing else — no per-slide CSS, no breakpoint work.
 *
 * The wrap is modular in both directions, so the neighbours are correct even at
 * the ends of the list, and the list still reads as a ring at three items —
 * which is what it will be for a while.
 */

export type WorkSlide = {
  slug: string;
  title: string;
  tag: string;
  href?: string;
  image: string;
  alt: string;
  /** True when /work/<slug>.webm and .mp4 exist — the card plays on hover. */
  hasVideo?: boolean;
  /** Marks a slot waiting for a real project, so it can't be mistaken for one. */
  placeholder?: boolean;
};

export function WorkCarousel({
  slides,
  className = "",
}: {
  slides: WorkSlide[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count]
  );

  // Arrow keys, but only while the carousel has focus — hijacking them for the
  // whole document would break normal page scrolling.
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  /** Signed distance to the active slide, wrapped so ±1 is always a neighbour. */
  const offsetOf = (i: number) => {
    const raw = i - active;
    const half = count / 2;
    if (raw > half) return raw - count;
    if (raw < -half) return raw + count;
    return raw;
  };

  return (
    <div
      ref={regionRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Sites we've built"
      className={`focus-ring relative ${className}`}
    >
      {/*
        overflow-x-clip, because the neighbours are positioned outside this box
        on purpose. Each sits at translateX(±46%) of its own width, so on a
        375px phone the right-hand slide reached x=559 and dragged the document
        scrollWidth with it — a page a thumb could pull sideways off its own
        layout. Clip, not hidden: hidden on a horizontal axis makes the browser
        treat the vertical one as auto, which adds a scrollbar to the track.
      */}
      <div className="relative h-[clamp(230px,42vw,460px)] overflow-x-clip [perspective:1400px]">
        {slides.map((slide, i) => {
          const offset = offsetOf(i);
          const distance = Math.abs(offset);
          const isActive = distance === 0;
          // Anything past a neighbour is parked behind the centre rather than
          // unmounted, so the ring keeps its depth without extra DOM.
          const beyond = distance > 1;

          return (
            <div
              key={slide.slug}
              aria-hidden={!isActive}
              className="absolute left-1/2 top-1/2 w-[clamp(280px,58vw,720px)] transition-all duration-500 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 46}%) scale(${
                  isActive ? 1 : 0.78
                }) rotateY(${offset * -14}deg)`,
                opacity: beyond ? 0 : isActive ? 1 : 0.45,
                zIndex: 10 - distance,
                pointerEvents: isActive ? "auto" : "none",
                filter: isActive ? "none" : "saturate(0.5)",
              }}
            >
              <SlideCard slide={slide} isActive={isActive} />
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        <ArrowButton label="Previous project" onClick={() => go(-1)}>
          <ArrowLeft size={17} />
        </ArrowButton>

        <div className="flex items-center gap-2" role="tablist" aria-label="Choose a project">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              role="tab"
              aria-selected={i === active}
              aria-label={s.title}
              onClick={() => setActive(i)}
              className={`focus-ring h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <ArrowButton label="Next project" onClick={() => go(1)}>
          <ArrowRight size={17} />
        </ArrowButton>
      </div>

      {/* One live region rather than announcing every slide as it slides past. */}
      <p aria-live="polite" className="sr-only">
        {slides[active].title}, {active + 1} of {count}
      </p>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}

function SlideCard({ slide, isActive }: { slide: WorkSlide; isActive: boolean }) {
  /*
   * `group` matters: HoverReel binds its listeners to the nearest .group
   * ancestor, because the scrim and the title sit above the media as siblings
   * and would otherwise swallow every pointerenter. Without this class the reel
   * would mount and never play.
   *
   * Only the centre slide has pointer-events, so the neighbours can't trigger a
   * download just by being on screen.
   */
  const frame = (
    <div className="group relative aspect-[2/1] overflow-hidden rounded-xl border border-white/12 bg-ink-soft shadow-2xl">
      {slide.hasVideo ? (
        <HoverReel
          slug={slide.slug}
          alt={slide.alt}
          sizes="(max-width: 640px) 80vw, 720px"
          className="[&_img]:object-top"
        />
      ) : (
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          sizes="(max-width: 640px) 80vw, 720px"
          className="object-cover object-top"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 via-40% to-transparent to-75%" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-white/55">
            {slide.tag}
          </p>
          <p className="font-display mt-1 text-xl font-semibold tracking-tight text-white">
            {slide.title}
          </p>
        </div>
        {slide.href && isActive && (
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent">
            Visit
            <ArrowUpRight size={15} />
          </span>
        )}
      </div>

      {slide.placeholder && (
        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-ink/70 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
          Slot open
        </span>
      )}
    </div>
  );

  if (!slide.href) return frame;

  return (
    <a
      href={slide.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={isActive ? 0 : -1}
      className="focus-ring block rounded-xl"
    >
      {frame}
    </a>
  );
}
