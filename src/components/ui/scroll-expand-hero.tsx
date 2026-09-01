"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Image from "next/image";

/**
 * A centre panel that expands to fill the frame as you scroll, over a still
 * backdrop, with the title splitting apart around it.
 *
 * Driven by scroll *position*, not by intercepting scroll events.
 *
 * The reference implementation this came from called preventDefault() on wheel
 * and forced window.scrollTo(0, 0) on every scroll, holding the reader at the
 * top until they had "finished" the animation. That is scroll-jacking: on a
 * site whose whole pitch is published pricing, a visitor who wants the pricing
 * page physically cannot leave the hero. On touch it was worse — preventDefault
 * on touchmove stops the page moving at all, so a phone that failed to register
 * the gesture is simply stuck.
 *
 * Here the section is tall, a stage inside it is sticky, and progress is just
 * how far through the section you have scrolled. Scrolling is never blocked,
 * the scrollbar tells the truth, keyboard paging works, and someone who wants
 * to skip it can. The effect is the same.
 */

/**
 * matchMedia read through useSyncExternalStore rather than pushed into state
 * from an effect — the latter costs a second render on every mount and trips
 * react-hooks/set-state-in-effect.
 */
/**
 * Wide enough to be worth the video.
 *
 * The hero clip is 668KB — on a 375px phone that was 90% of the entire page
 * weight, autoplaying, for an expansion effect that barely reads at that size.
 * A tradesperson checking us on mobile data was paying for the whole thing
 * before the first sentence. Below the breakpoint the poster stands in: same
 * image, 62KB, no playback.
 */
function useWideEnoughForVideo() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    // Server render assumes phone, so the HTML a phone receives has no <video>
    // to start fetching before hydration corrects anything.
    () => false
  );
}

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

type ScrollExpandHeroProps = {
  title: string;
  eyebrow?: string;
  hint?: string;
  bgImageSrc: string;
  bgAlt: string;
  videoSrc: string;
  videoWebmSrc?: string;
  posterSrc: string;
  children?: ReactNode;
};

export function ScrollExpandHero({
  title,
  eyebrow,
  hint,
  bgImageSrc,
  bgAlt,
  videoSrc,
  videoWebmSrc,
  posterSrc,
  children,
}: ScrollExpandHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const wideEnough = useWideEnoughForVideo();
  // Reduced motion also gets the still — an autoplaying loop is the thing that
  // setting exists to stop.
  const showVideo = wideEnough && !reduced;

  useEffect(() => {
    // Reduced motion gets the finished state, and no listeners at all. Nothing
    // to set here — `eased` reads 1 directly below, which keeps this effect
    // free of the setState-in-effect that a `setProgress(1)` would introduce.
    if (reduced) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // The stage is pinned for (section height - one viewport). Progress is
      // how far into that pinned run we are.
      const run = rect.height - window.innerHeight;
      const p = run <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / run));
      setProgress(p);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  /* Ease the expansion so it opens fast and settles slowly — a linear ramp
     reads as mechanical, and the last third is where the reader is looking. */
  const eased = reduced ? 1 : 1 - Math.pow(1 - progress, 3);

  const [first, ...rest] = title.split(" ");
  const restOfTitle = rest.join(" ");

  return (
    <div ref={sectionRef} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Backdrop — recedes as the panel takes over. */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${1 + eased * 0.08})`,
            opacity: 1 - eased * 0.45,
          }}
        >
          <Image
            src={bgImageSrc}
            alt={bgAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/45" />
        </div>

        {/* The expanding panel. Percentages, not pixels, so it scales with the
            viewport instead of needing a mobile branch. */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: `${26 + eased * 68}%`,
              height: `${30 + eased * 62}%`,
            }}
          >
            {showVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={posterSrc}
                aria-hidden="true"
                tabIndex={-1}
                className="h-full w-full object-cover"
              >
                {videoWebmSrc && <source src={videoWebmSrc} type="video/webm" />}
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={posterSrc}
                alt=""
                fill
                sizes="(max-width: 768px) 90vw, 70vw"
                className="object-cover"
              />
            )}
            {/* Lifts as the panel opens, so the clip is clearest when largest. */}
            <div
              className="pointer-events-none absolute inset-0 bg-ink"
              style={{ opacity: 0.45 - eased * 0.35 }}
            />
          </div>
        </div>

        {/*
          Title, splitting around the panel.

          Not mix-blend-difference. It was the obvious pick for type that has to
          survive both a dark backdrop and a bright clip, but difference against
          mid-tone footage inverts to a muddy grey-green — legible, and ugly.
          Solid white with a shadow reads cleanly on both and is predictable
          whatever footage gets swapped in later.
        */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="flex w-full flex-col items-center gap-3 px-6 text-center">
            {eyebrow && (
              /* Pinned above the title block rather than in it — centred, it
                 landed on top of the panel and had to fight the footage. */
              <p
                className="font-display absolute top-[14vh] text-xs font-semibold uppercase tracking-[0.28em] text-white/85"
                style={{ opacity: 1 - eased * 1.4, textShadow: "0 1px 12px rgba(0,0,0,.6)" }}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className="font-display flex flex-col items-center text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,.55), 0 1px 4px rgba(0,0,0,.4)" }}
            >
              <span
                className="block"
                style={{ transform: `translateX(-${eased * 42}vw)` }}
              >
                {first}
              </span>
              <span
                className="block"
                style={{ transform: `translateX(${eased * 42}vw)` }}
              >
                {restOfTitle}
              </span>
            </h1>
          </div>
        </div>

        {/* Scroll hint — fades the moment the reader starts. */}
        {hint && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
            style={{ opacity: Math.max(0, 1 - progress * 6) }}
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {hint}
            </p>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
