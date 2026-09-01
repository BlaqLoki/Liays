import Image from "next/image";
import { ImageIcon } from "lucide-react";

/**
 * An image, or a labelled empty frame where one is going to go.
 *
 * Two things this exists to prevent. A grey box with no explanation reads as a
 * broken image to anyone who lands on the site mid-build — including a client
 * you've sent a preview link to. And a placeholder that looks finished is worse:
 * it quietly ships, because nobody can tell it apart from real work.
 *
 * So an empty slot says what belongs there and what shape it should be. Pass
 * `src` and it becomes an ordinary optimised image; the caller doesn't change.
 */

type ImageSlotProps = {
  src?: string;
  alt?: string;
  /** What goes here, in plain words: "Owner portrait", "Before / after". */
  label: string;
  /** CSS aspect-ratio, e.g. "4/3", "1/1", "2/1". Applied inline — see below. */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ImageSlot({
  src,
  alt,
  label,
  ratio = "4/3",
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: ImageSlotProps) {
  /*
   * aspect-ratio goes in a style attribute, not a Tailwind class.
   *
   * `aspect-[${ratio}]` looks right and produces nothing: Tailwind scans source
   * text at build time and never sees a class assembled at runtime, so no rule
   * is generated and every slot collapses to zero height. The failure is silent
   * — it builds, it lints, and the page is just empty.
   */
  const shell = `relative overflow-hidden rounded-xl ${className}`;
  const box = { aspectRatio: ratio };

  if (src) {
    return (
      <div className={`${shell} border border-white/10 bg-ink-soft`} style={box}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${shell} grid place-items-center border border-dashed border-white/20 bg-ink-soft/60`}
      style={box}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon size={20} className="text-white/30" aria-hidden="true" />
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/45">
          {label}
        </p>
        <p className="font-display text-[0.65rem] tabular-nums text-white/25">{ratio}</p>
      </div>
    </div>
  );
}
