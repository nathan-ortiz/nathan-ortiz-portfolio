import { useScrollReveal } from "@/hooks/useScrollReveal";

type SectionLabelProps = {
  color: "green" | "amber" | "rose";
  text: string;
};

const COLOR_MAP = {
  green: "#4ADE80",
  amber: "#FBBF24",
  rose: "#FB7185",
};

export const SectionLabel = ({ color, text }: SectionLabelProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div ref={ref} className="flex items-center gap-3 overflow-hidden">
      {/* Square: scales in */}
      <div
        className="w-3 h-3 transition-all duration-[400ms] ease-out"
        style={{
          backgroundColor: COLOR_MAP[color],
          transform: isVisible ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Text: slides in from left */}
      <span
        className="font-label text-sm tracking-[1.5px] uppercase text-text-secondary transition-all duration-500 ease-out"
        style={{
          transform: isVisible ? "translateX(0)" : "translateX(-12px)",
          opacity: isVisible ? 1 : 0,
          transitionDelay: isVisible ? "150ms" : "0ms",
        }}
      >
        {text}
      </span>
    </div>
  );
};
