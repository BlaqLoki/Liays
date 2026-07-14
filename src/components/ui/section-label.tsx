export function SectionLabel({
  children,
  tone = "onInk",
}: {
  children: React.ReactNode;
  tone?: "onInk" | "onPaper";
}) {
  const textColor = tone === "onInk" ? "text-white/50" : "text-black/60";
  return (
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${textColor}`}>
        {children}
      </span>
    </div>
  );
}
