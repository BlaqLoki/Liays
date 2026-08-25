"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

/**
 * A poster frame that becomes a three-second silent loop while hovered.
 *
 * The whole design is about not paying for the video until someone asks for it.
 * A `<video>` with `preload="metadata"` still opens a connection per card, and
 * five cards on two pages is five requests nobody asked for — so the element is
 * not rendered at all until the first hover. Before that the card is a plain
 * `next/image` poster, which is what a phone will ever see.
 *
 * Once mounted the video stays mounted: re-creating it on every leave would
 * re-download on every re-entry, and hovering in and out of a grid is normal.
 * It just pauses and rewinds to frame 0 so the next hover starts clean.
 *
 * Never plays on touch, and never for prefers-reduced-motion — for that reader
 * an autoplaying loop is the exact thing the setting exists to stop.
 */

function useCanPlay() {
  return useSyncExternalStore(
    (onChange) => {
      const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
      hover.addEventListener("change", onChange);
      calm.addEventListener("change", onChange);
      return () => {
        hover.removeEventListener("change", onChange);
        calm.removeEventListener("change", onChange);
      };
    },
    () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    // Server render: poster only, so the markup a phone receives has no video.
    () => false
  );
}

type HoverReelProps = {
  /** Basename in /work — resolves to .webp poster, .webm and .mp4 sources. */
  slug: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function HoverReel({
  slug,
  alt,
  sizes,
  priority = false,
  className = "",
}: HoverReelProps) {
  const canPlay = useCanPlay();
  const [armed, setArmed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  /* Whether the pointer is currently on the card. A ref, not state, because
     onCanPlay needs to read it without the component having re-rendered. */
  const hoveredRef = useRef(false);

  /**
   * Listen on the whole card, not on this element.
   *
   * The cards stack a gradient scrim and the title over the reel as siblings,
   * so the pointer is almost never actually over this div — hovering the middle
   * of a card put it over the scrim and no enter event ever arrived. Binding to
   * the nearest `.group` ancestor means hovering anywhere on the card counts,
   * which is what a viewer expects anyway, and it does not care how many
   * decorative layers get stacked on top later.
   */
  useEffect(() => {
    if (!canPlay) return;
    const host = rootRef.current?.closest(".group") ?? rootRef.current;
    if (!host) return;

    const enter = () => {
      hoveredRef.current = true;
      setArmed(true);
      // play() rejects if the pointer leaves before the promise settles. That
      // is an expected race, not an error, so it has to be swallowed — an
      // unhandled rejection here surfaces in the console of a page that works.
      void videoRef.current?.play().catch(() => {});
    };
    const leave = () => {
      hoveredRef.current = false;
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      // Rewind so the next hover opens on the same frame as the poster.
      v.currentTime = 0;
    };

    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, [canPlay]);

  return (
    <div
      ref={rootRef}
      /*
       * `relative h-full w-full`, and callers pass only cosmetics.
       *
       * This root previously took `absolute inset-0` from the caller on top of
       * its own `relative`. Both are position utilities, so which one won came
       * down to the order Tailwind happens to emit them — `relative` did, which
       * left `inset-0` contributing nothing to layout, and since the poster
       * inside is `fill` (absolute) there was no in-flow content to give the box
       * height. Every card measured 563x0 and rendered as an empty frame.
       */
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <Image
        src={`/work/${slug}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />

      {armed && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          /* Only start from here if the pointer is still on the card.
             canplay fires again after the rewind-to-zero on leave, so an
             unconditional play() here restarted the clip every time someone
             moved away — the video kept looping behind the poster. */
          onCanPlay={(e) => {
            if (hoveredRef.current) void e.currentTarget.play().catch(() => {});
          }}
          className="absolute inset-0 h-full w-full object-cover object-top"
        >
          {/* VP9 first: it is roughly half the bytes of the H.264 on flat UI
              footage, and any browser that can't read it falls through. */}
          <source src={`/work/${slug}.webm`} type="video/webm" />
          <source src={`/work/${slug}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
