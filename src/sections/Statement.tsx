import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RotatingWord } from "@/components/RotatingWord";

const TAVUS_ART = "https://c.animaapp.com/mmzovjzw9c0SXp/assets/68f0e0628f97ea257bd5dd30_art.avif";
const ROTATING_WORDS = ["consumer products", "what doesn't exist yet", "things people use daily", "for people who don't code", "what's missing", "the future"];

export const Statement = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative bg-bg-raised overflow-hidden py-[100px] md:py-[220px] px-8 md:px-16">
      <div className="tavus-art-bg">
        <img src={TAVUS_ART} alt="" aria-hidden="true" className="-scale-x-100" loading="lazy" />
      </div>
      {/* Amber gradient accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none opacity-[0.07]" style={{ background: "radial-gradient(circle at 20% 30%, #FBBF24, transparent 65%)" }} />

      <div className="relative z-10 max-w-5xl md:max-w-none mx-auto text-left md:text-center md:px-8">
        <h2 className={`font-serif text-[clamp(30px,8.5vw,36px)] leading-[clamp(42px,11vw,48px)] md:text-[clamp(52px,7.5vw,76px)] md:leading-[clamp(64px,9vw,92px)] min-h-[3lh] grid content-center text-white transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Building <RotatingWord words={ROTATING_WORDS} interval={2800} suffix="." />
        </h2>
      </div>
    </section>
  );
};
