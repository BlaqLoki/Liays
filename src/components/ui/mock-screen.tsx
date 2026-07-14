type MockScreenProps = {
  name: string;
  tag: string;
  gradient: string;
};

export function MockScreen({ name, tag, gradient }: MockScreenProps) {
  return (
    <div className="w-[220px] overflow-hidden rounded-xl border border-white/10 bg-ink-soft shadow-2xl shadow-black/50 lg:w-[240px]">
      <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-white/5 px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="mx-2 h-2.5 flex-1 rounded-full bg-white/10" />
      </div>
      <div className={`space-y-2 bg-gradient-to-br ${gradient} p-4`}>
        <span className="block h-2 w-2/3 rounded-full bg-white/25" />
        <span className="block h-1.5 w-full rounded-full bg-white/10" />
        <span className="block h-1.5 w-4/5 rounded-full bg-white/10" />
        <span className="mt-3 inline-block h-4 w-16 rounded-full bg-accent/70" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="h-10 rounded-lg bg-white/10" />
          <span className="h-10 rounded-lg bg-white/10" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
        <span className="text-[11px] font-semibold text-white/70">{name}</span>
        <span className="text-[10px] text-white/60">{tag}</span>
      </div>
    </div>
  );
}
