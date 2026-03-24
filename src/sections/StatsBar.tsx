import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const STATS = [
  { value: 1000, suffix: "+", label: "Daily Active Users" },
  { value: 3, suffix: "x", label: "Startup User Growth" },
  { value: 30, suffix: "+", label: "Students Mentored" },
  { value: 2, suffix: "x", label: "World Championships" },
  { value: 5, suffix: "", label: "Products Shipped" },
  { value: 0, suffix: "", label: "Cofounders", displayAs: "0" },
];

export const StatsBar = () => (
  <div className="relative bg-bg-raised border-y border-border-subtle">
    <div className="max-w-6xl mx-auto px-6 md:px-16 py-4">
      {/* Desktop: single row */}
      <div className="hidden md:flex items-center justify-between">
        {STATS.map((stat, i) => (
          <span key={stat.label} className="flex items-center">
            {i > 0 && <span className="w-px h-4 bg-border-subtle mr-6 shrink-0" />}
            <StatItem {...stat} />
          </span>
        ))}
      </div>
      {/* Mobile: 3x2 grid */}
      <div className="grid grid-cols-3 gap-y-5 gap-x-4 md:hidden">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} vertical />
        ))}
      </div>
    </div>
  </div>
);

function StatItem({ value, suffix, label, displayAs, vertical }: { value: number; suffix: string; label: string; displayAs?: string; vertical?: boolean }) {
  const { count, ref } = useAnimatedCounter(value, 1400);
  const display = displayAs !== undefined ? displayAs : count;

  if (vertical) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col items-center text-center">
        <span className="font-serif text-[20px] text-accent-amber leading-none tabular-nums">{display}{suffix}</span>
        <span className="font-label text-[8px] tracking-[0.7px] uppercase text-accent-amber mt-1.5">{label}</span>
      </div>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex items-baseline gap-2.5 shrink-0">
      <span className="font-serif text-[18px] md:text-[20px] text-accent-amber leading-none tabular-nums">{display}{suffix}</span>
      <span className="font-label text-[8px] md:text-[9px] tracking-[0.7px] uppercase text-accent-amber whitespace-nowrap">{label}</span>
    </div>
  );
}
