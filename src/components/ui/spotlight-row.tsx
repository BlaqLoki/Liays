"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * A row that lights up under the cursor.
 *
 * The pointer position is written straight onto the element as two CSS custom
 * properties and read back by a gradient. Nothing goes through React state, so
 * moving the cursor across a row costs no re-render and no reconciliation —
 * just two style writes per frame. Holding it in state instead would re-render
 * the row, its price and every feature line on every mousemove, which is how
 * this kind of effect usually ends up feeling cheap on a slower machine.
 *
 * The three cues are deliberately coordinated rather than independent: the
 * glow, the rule and the price all key off the same hover. One gesture, three
 * quiet responses, is what reads as considered. Three unrelated animations
 * firing at once is what reads as a template.
 *
 * Everything is `group-hover`, so on touch — where there is no hover — the row
 * is simply a row. Tailwind v4 already scopes `hover:` behind
 * `(hover: hover)`, so this costs a phone nothing.
 */
export function SpotlightRow({
  children,
  onPaper = false,
}: {
  children: ReactNode;
  onPaper?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className="group relative -mx-4 px-4 lg:-mx-6 lg:px-6"
      /* Seeded off-canvas so a row that is hovered before it has ever seen a
         pointer — keyboard focus, or the cursor entering at the very edge —
         doesn't flash a glow at the top-left corner. */
      style={{ "--mx": "-999px", "--my": "-999px" } as React.CSSProperties}
    >
      {/* The glow. Sits under the content and never takes the pointer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) ${
            onPaper ? "10%" : "16%"
          }, transparent), transparent 68%)`,
        }}
      />

      {/* A hairline that draws in from the left. Scale rather than width, so it
          animates on the compositor instead of forcing layout every frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
      />

      <div className="relative">{children}</div>
    </div>
  );
}
