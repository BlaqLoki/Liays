"use client";

import { useSyncExternalStore } from "react";
import { DotField } from "@/components/ui/dot-field";

const DESKTOP_MIN = 1024;

/**
 * Is this a pointer-driven viewport wide enough to be worth animating?
 *
 * matchMedia is external state, so it reads through useSyncExternalStore rather
 * than being pushed into useState from an effect — that would cost a second
 * render on every mount. The server snapshot is `false`, so the HTML ships
 * without the canvas and a phone never even parses it into the tree.
 */
function useDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`).matches,
    () => false
  );
}

/**
 * Backdrop for the homepage hero.
 *
 * Previously this mounted a three.js GLSL hills shader — and nothing ever
 * imported it, so the hero has been shipping with no backdrop at all. Replaced
 * with the pointer-reactive dot field, which costs no WebGL and no shader
 * compile on first paint.
 *
 * The two gradients matter as much as the field itself. The headline sits top
 * left, and a dot grid running underneath type is the fastest way to make a
 * hero look busy rather than alive. The field is faded out on the left and
 * along the top so the dots are densest in the empty right-hand air, where
 * there is nothing to read.
 */
export function HeroBackground() {
  /*
   * Desktop only, and unmounted rather than hidden.
   *
   * A phone has no cursor, so the field has nothing to lean toward — it would
   * animate a thousand line segments a frame to show an attractor drifting in
   * a circle, which is battery spent on nobody's behalf. `hidden lg:block`
   * would still mount the canvas and run the loop; returning null means no
   * canvas, no rAF, no listeners.
   */
  const desktop = useDesktop();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {desktop && <DotField className="opacity-90" />}

      {/* Clears the type. Strongest at the left edge where the H1 begins, and
          gone by about two thirds across so the right-hand air keeps its dots —
          at via-ink/75 the mask was swallowing the field almost everywhere. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink from-5% via-ink/55 via-45% to-transparent to-72%" />

      {/* Settles the field into the page rather than cutting it off. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ink to-transparent" />
    </div>
  );
}
