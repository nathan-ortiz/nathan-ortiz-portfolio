import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Standalone "what's next" strip that heads the Projects section.
 * Borrows the card window-chrome so it reads as native, but stays
 * non-interactive, since there's nothing to link to yet.
 */
export const NowBuilding = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="relative border border-border bg-bg-raised overflow-hidden shadow-[rgba(255,255,255,0.04)_4px_4px_0px_0px]">
        {/* Title bar: same anatomy as the project cards */}
        <div className="flex items-center gap-2 px-3 py-2 bg-bg border-b border-border">
          <div className="flex items-center gap-[6px] shrink-0">
            <div className="w-2.5 h-2.5 bg-accent-amber" />
            <span className="font-label text-[10px] tracking-[1.2px] uppercase text-accent-amber leading-none">Now Building</span>
            <span className="live-dot w-2 h-2 rounded-full bg-accent-amber" />
          </div>
          {/* Decorative hairlines */}
          <div className="flex-1 min-w-0 flex flex-col gap-[1.5px] overflow-hidden mx-2">
            {[...Array(4)].map((_, i) => <div key={i} className="w-full h-px bg-border-subtle" />)}
          </div>
          <span className="font-label text-[10px] tracking-[1.2px] uppercase text-text-secondary leading-none shrink-0 hidden sm:inline">In Development</span>
        </div>

        {/* Amber glow for depth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{ background: "radial-gradient(ellipse at 15% 120%, #FBBF24, transparent 60%)" }}
        />

        <div className="relative px-5 py-7 md:px-9 md:py-10">
          <h3 className="font-serif text-[clamp(23px,6.2vw,30px)] md:text-[36px] leading-[1.18] md:leading-[1.15] text-white">
            The next mobile computing device isn't a phone.
          </h3>
          <p className="font-body text-[13px] md:text-[15px] leading-relaxed text-text-muted mt-3 max-w-[54ch]">
            Next-gen wearable computing that integrates AI into human perception.
          </p>
        </div>
      </div>
    </div>
  );
};
