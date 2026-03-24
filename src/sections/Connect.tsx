import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";

const LINKS = [
  { label: "Email", href: "mailto:ortizerz@gmail.com", bg: "#16A34A", textColor: "#fff" },
  { label: "Instagram", href: "https://www.instagram.com/nathan0rtiz/", bg: "#d4a017", textColor: "#fff" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nathan-ortiz", bg: "#e63e5c", textColor: "#fff" },
  { label: "Twitter/X", href: "https://x.com/kortexvgc", bg: "#2e2c36", textColor: "#e8e5e0" },
  { label: "Download Resume", href: "/Nathan_Ortiz_Resume.docx", bg: "#2a2838", textColor: "#e8e5e0", download: true },
];

export const Connect = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
  return (
    <section id="connect" ref={ref} className="relative bg-bg-blush px-6 md:px-16 pt-[60px] md:pt-[80px] pb-[100px] md:pb-[140px] scroll-mt-[100px] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-[0.08]" style={{ background: "radial-gradient(circle at 25% 75%, #FB7185, transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <SectionLabel color="rose" text="CONNECT" />
        </div>
        <div className={`mt-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
          <h2 className="font-serif text-[38px] leading-[44px] md:text-[clamp(42px,6vw,60px)] md:leading-[clamp(48px,6.8vw,64px)] text-text">Let's build something.</h2>
        </div>
        <div className={`mt-10 flex flex-wrap gap-4 md:gap-5 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "250ms" }}>
          {LINKS.map((link) => (
            <a key={link.label}
              href={link.href}
              {...(link.download ? { download: true } : { target: link.href.startsWith("mailto") ? undefined : "_blank", rel: link.href.startsWith("mailto") ? undefined : "noopener noreferrer" })}
              className="btn-press inline-flex items-center justify-center px-7 py-3.5 border border-border font-label text-[12px] md:text-[13px] tracking-[1.2px] uppercase shadow-[rgba(255,255,255,0.04)_4px_4px_0px_0px] transition-colors duration-200 hover:brightness-110"
              style={{ backgroundColor: link.bg, color: link.textColor }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
