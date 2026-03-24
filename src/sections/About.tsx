import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";

export const About = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  return (
    <section id="about" ref={ref} className="relative bg-bg-warm px-6 md:px-16 pt-[100px] md:pt-[140px] pb-[60px] md:pb-[80px] scroll-mt-[100px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[60%] opacity-[0.08]" style={{ background: "radial-gradient(ellipse at 70% 35%, #FBBF24, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[50%] opacity-[0.07]" style={{ background: "radial-gradient(ellipse at 30% 70%, #FBBF24, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel color="amber" text="ABOUT" />
        </div>
        {/* Photo top-aligned with ABOUT label, pushed further right with more gap */}
        <div className="mt-12 flex flex-col md:flex-row gap-10 md:gap-24">
          <div className="max-w-2xl space-y-7 flex-1">
            <p className={`font-body text-[17px] md:text-[18px] leading-[29px] md:leading-[31px] text-text-secondary transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
              I build consumer AI systems and consumer products.
            </p>
            <p className={`font-body text-[17px] md:text-[18px] leading-[29px] md:leading-[31px] text-text-secondary transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "150ms" }}>
              I created a new product category on the App Store, architected multi-model AI routing across 9 models, and led operations at a $29M+ venture-backed startup, managing a 10-person creative team and tripling user growth.
            </p>
            <p className={`font-body text-[17px] md:text-[18px] leading-[29px] md:leading-[31px] text-text-secondary transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
              20+ years of piano and composition. Two-time VGC World Championship competitor. Transferring to a T5 CS program Fall 2026.
            </p>
          </div>
          {/* Photo: top-aligned with text block, not vertically centered */}
          <div className={`md:w-[280px] shrink-0 self-start transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "250ms" }}>
            <div className="border border-border bg-bg-card shadow-[rgba(255,255,255,0.04)_4px_4px_0px_0px] overflow-hidden">
              <img src="/images/pokemon_medal.jpg" alt="Nathan Ortiz with Pokemon VGC World Championship medal" className="w-full aspect-[4/5] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
