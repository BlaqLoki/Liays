"use client";

import { useEffect, useRef } from "react";

/**
 * A grid of dots that lean toward the pointer.
 *
 * Each dot is anchored to its cell and stays there. What changes is its length
 * and heading: near the pointer it stretches into a short capsule aimed at the
 * cursor and drifts a few pixels that way, and the effect falls off to nothing
 * past the influence radius. So the field reaches for the cursor without
 * chasing it — the grid stays legible as a grid.
 *
 * Canvas 2D rather than WebGL. This is a thousand-odd line segments per frame,
 * which 2D handles comfortably, and it avoids pulling three.js back in for a
 * background effect — the shader this replaced was the only thing that needed
 * it, and both are now gone.
 *
 * Three things it does not do:
 *
 *  · Run when nobody is looking. The rAF loop is gated on an
 *    IntersectionObserver, so scrolling past it stops the work entirely.
 *  · Run for people who asked it not to. Under prefers-reduced-motion it paints
 *    the resting grid once and never animates.
 *  · Die on touch. With no pointer there is nothing to lean toward, so an
 *    invisible attractor drifts a slow ellipse and the field follows that.
 */

type DotFieldProps = {
  className?: string;
  /** Distance between dots, in CSS pixels. Larger = sparser. */
  spacing?: number;
  /** How far the pointer's pull reaches, in CSS pixels. */
  radius?: number;
};

export function DotField({
  className = "",
  spacing = 26,
  radius = 260,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf: number | null = null;
    let visible = true;

    /* Where the field is actually leaning, and where it is being asked to lean.
       Kept separate so the pull eases in rather than snapping between frames —
       a cursor flicked across the hero should pour through it, not teleport. */
    const target = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    let pointerSeen = false;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineCap = "round";

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const bx = ix * spacing;
          const by = iy * spacing;

          const dx = eased.x - bx;
          const dy = eased.y - by;
          const dist = Math.hypot(dx, dy);

          // Smoothstep falloff. A linear ramp leaves a hard visible circle at
          // the radius; this eases to nothing at the edge.
          const t = Math.max(0, 1 - dist / radius);
          const pull = t * t * (3 - 2 * t);

          /* A slow diagonal wave so the resting field breathes instead of
             sitting dead. Small — it should read as texture, not motion. */
          const wave = reduced
            ? 0
            : 0.5 + 0.5 * Math.sin(time * 0.0006 + (ix + iy) * 0.35);

          /* The resting field has to carry the hero on its own — most visitors
             never move the pointer into it, and on touch there is no pointer at
             all. Set too low it reads as screen dirt rather than as texture. */
          const baseAlpha = 0.2 + wave * 0.12;
          const alpha = baseAlpha + pull * 0.7;
          const size = 1.7 + pull * 1.2;
          const stretch = pull * 16;

          // Unit vector toward the pointer; guarded so a dot sitting exactly
          // under the cursor doesn't divide by zero and vanish.
          const ux = dist > 0.001 ? dx / dist : 0;
          const uy = dist > 0.001 ? dy / dist : 0;

          // The anchor shifts a little, far less than the stretch, so the dot
          // leans out of its cell without leaving it.
          const cx = bx + ux * pull * 5;
          const cy = by + uy * pull * 5;

          ctx!.strokeStyle =
            pull > 0.35
              ? `rgba(232, 134, 86, ${alpha})` // accent-soft, nearest the cursor
              : `rgba(213, 100, 47, ${alpha})`; // accent
          ctx!.lineWidth = size;
          ctx!.beginPath();
          ctx!.moveTo(cx, cy);
          ctx!.lineTo(cx + ux * stretch, cy + uy * stretch);
          ctx!.stroke();
        }
      }
    }

    function frame(time: number) {
      if (!pointerSeen) {
        // No pointer yet (touch, or the cursor hasn't entered). Drift an
        // invisible attractor so the field still has something to lean toward.
        const a = time * 0.00022;
        target.x = width * (0.5 + 0.32 * Math.cos(a));
        target.y = height * (0.5 + 0.3 * Math.sin(a * 1.3));
      }

      eased.x += (target.x - eased.x) * 0.09;
      eased.y += (target.y - eased.y) * 0.09;

      draw(time);
      raf = visible ? requestAnimationFrame(frame) : null;
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      if (!pointerSeen) {
        pointerSeen = true;
        // Start the lean from where the cursor actually is rather than sweeping
        // the whole field across from the attractor's last position.
        eased.x = target.x;
        eased.y = target.y;
      }
    }

    function onPointerLeave() {
      pointerSeen = false;
    }

    resize();

    if (reduced) {
      // One resting frame, centred, and nothing after it.
      eased.x = width * 0.5;
      eased.y = height * 0.5;
      target.x = eased.x;
      target.y = eased.y;
      draw(0);
      const ro = new ResizeObserver(() => {
        resize();
        draw(0);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    /* Start now, and let the observer pause it later.
       Driving the loop only from the observer's callback means a single missed
       or slow first notification leaves the canvas permanently blank — the
       field is on screen at first paint, so the safe default is running. */
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && raf === null) raf = requestAnimationFrame(frame);
      },
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [spacing, radius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
