import { useEffect, useRef, useState } from "react";

const TAVUS_ART = "https://c.animaapp.com/mmzovjzw9c0SXp/assets/68f0e0628f97ea257bd5dd30_art.avif";

export const Hero = () => {
  const artRef = useRef<HTMLImageElement>(null);
  const [headlineRevealed, setHeadlineRevealed] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  // Trigger headline reveal on mount
  useEffect(() => {
    const t1 = setTimeout(() => setHeadlineRevealed(true), 100);
    return () => clearTimeout(t1);
  }, []);

  // Subtitle appears after headline finishes
  // Subtitle overlaps slightly with the tail end of the char reveal for a connected feel
  useEffect(() => {
    const t2 = setTimeout(() => setSubtitleVisible(true), 580);
    return () => clearTimeout(t2);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (artRef.current && window.scrollY < window.innerHeight) {
          artRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const headline = "Hello, I'm Nathan Ortiz.";

  return (
    <section id="home" className="relative overflow-hidden bg-bg-raised">
      <div className="hero-art-bg">
        <img ref={artRef} src={TAVUS_ART} alt="" aria-hidden="true" className="will-change-transform" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 pt-[160px] pb-[120px] md:pt-[210px] md:pb-[160px] flex flex-col justify-center">
        <h1 className="font-serif text-[clamp(30px,9vw,44px)] leading-[clamp(38px,11vw,52px)] md:text-[clamp(46px,6.5vw,80px)] md:leading-[clamp(52px,7.5vw,84px)]">
          {headline.split("").map((char, i) => {
            const isName = i >= 11; // "Nathan Ortiz." starts at index 11
            return (
              <span
                key={i}
                className={`inline-block transition-all duration-[350ms] ease-out will-change-[transform,opacity] ${isName ? "text-white" : "text-text/70"}`}
                style={{
                  opacity: headlineRevealed ? 1 : 0,
                  transform: headlineRevealed ? "translateY(0)" : "translateY(8px)",
                  filter: headlineRevealed ? "blur(0px)" : "blur(1px)",
                  transitionDelay: headlineRevealed ? `${i * 20}ms` : "0ms",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </h1>

        {/* Subtitle: simple, clean opacity fade */}
        <p
          className="font-serif text-[clamp(18px,5.5vw,22px)] leading-[clamp(26px,7.5vw,30px)] md:text-[clamp(24px,3.2vw,30px)] md:leading-[clamp(34px,4.2vw,40px)] text-text/80 mt-5 md:mt-7 transition-opacity duration-700 ease-out"
          style={{ opacity: subtitleVisible ? 1 : 0 }}
        >
          Builder. Founder. Student.
        </p>
      </div>
    </section>
  );
};
