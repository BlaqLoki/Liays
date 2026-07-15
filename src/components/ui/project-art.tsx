export type ProjectArtVariant =
  | "horizon-grid"
  | "concentric-arcs"
  | "stacked-shelves"
  | "directional-flow"
  | "organic-bloom"
  | "dot-network";

type ProjectArtProps = {
  variant: ProjectArtVariant;
  base: string;
  glow: "accent" | "gold";
  className?: string;
};

const GLOW_HEX: Record<"accent" | "gold", string> = {
  accent: "#d5642f",
  gold: "#c79a3e",
};

function Motif({ variant }: { variant: ProjectArtVariant }) {
  switch (variant) {
    case "horizon-grid":
      return (
        <g stroke="#f5efe3" strokeOpacity={0.28} strokeWidth={1.5}>
          {[110, 150, 190, 230, 270, 310, 350].map((y, i) => (
            <line key={y} x1={40} y1={y} x2={40 + 60 + i * 32} y2={y} />
          ))}
          <line x1={40} y1={70} x2={360} y2={430} stroke="var(--glow)" strokeOpacity={0.7} strokeWidth={2} />
        </g>
      );
    case "concentric-arcs":
      return (
        <g fill="none" stroke="#f5efe3" strokeOpacity={0.25} strokeWidth={1.5}>
          {[40, 70, 100, 130, 160].map((r) => (
            <circle key={r} cx={200} cy={250} r={r} />
          ))}
          <circle cx={200} cy={250} r={130} stroke="var(--glow)" strokeOpacity={0.8} strokeWidth={2} />
          <line x1={200} y1={220} x2={200} y2={280} stroke="var(--glow)" strokeOpacity={0.8} strokeWidth={2} />
          <line x1={170} y1={250} x2={230} y2={250} stroke="var(--glow)" strokeOpacity={0.8} strokeWidth={2} />
        </g>
      );
    case "stacked-shelves":
      return (
        <g fill="#f5efe3" fillOpacity={0.18}>
          <rect x={60} y={140} width={280} height={26} rx={6} />
          <rect x={60} y={190} width={200} height={26} rx={6} />
          <rect x={60} y={240} width={240} height={26} rx={6} fill="var(--glow)" fillOpacity={0.85} />
          <rect x={60} y={290} width={160} height={26} rx={6} />
          <rect x={60} y={340} width={220} height={26} rx={6} />
        </g>
      );
    case "directional-flow":
      return (
        <g stroke="#f5efe3" strokeOpacity={0.25} strokeWidth={10} strokeLinecap="round">
          <line x1={40} y1={370} x2={200} y2={210} />
          <line x1={90} y1={400} x2={250} y2={240} />
          <line x1={140} y1={430} x2={340} y2={140} stroke="var(--glow)" strokeOpacity={0.85} strokeWidth={10} />
        </g>
      );
    case "organic-bloom":
      return (
        <g fill="none">
          <circle cx={165} cy={210} r={90} fill="#f5efe3" fillOpacity={0.14} />
          <circle cx={250} cy={290} r={70} fill="#f5efe3" fillOpacity={0.14} />
          <circle cx={210} cy={250} r={60} fill="var(--glow)" fillOpacity={0.55} />
        </g>
      );
    case "dot-network":
    default:
      return (
        <g fill="#f5efe3" fillOpacity={0.3}>
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => {
              const isAccent = row === 2 && col === 2;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={80 + col * 60}
                  cy={130 + row * 55}
                  r={isAccent ? 7 : 4}
                  fill={isAccent ? "var(--glow)" : undefined}
                  fillOpacity={isAccent ? 0.9 : undefined}
                />
              );
            })
          )}
        </g>
      );
  }
}

export function ProjectArt({ variant, base, glow, className = "" }: ProjectArtProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      style={{ "--glow": GLOW_HEX[glow] } as React.CSSProperties}
      role="img"
      aria-hidden="true"
    >
      <rect width="400" height="500" fill={base} />
      <defs>
        <radialGradient id={`fade-${variant}`} cx="30%" cy="20%" r="75%">
          <stop offset="0%" stopColor={GLOW_HEX[glow]} stopOpacity="0.35" />
          <stop offset="100%" stopColor={GLOW_HEX[glow]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#fade-${variant})`} />
      <Motif variant={variant} />
    </svg>
  );
}
