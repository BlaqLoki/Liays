type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className = "" }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display shrink-0 text-3xl font-semibold tracking-tight text-white/40 sm:text-4xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
