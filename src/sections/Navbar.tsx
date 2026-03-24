import { useState, useEffect, useRef, useCallback } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#connect" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [indicatorStyle, setIndicatorStyle] = useState({ transform: "translateX(0px)", width: 0 });
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isNavigating = useRef(false);
  const navTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Use offsetLeft/offsetWidth — stable, no scroll dependency, no layout thrashing
  const updateIndicator = useCallback((sectionId: string) => {
    const idx = NAV_ITEMS.findIndex((item) => item.href === `#${sectionId}`);
    const btn = pillRefs.current[idx];
    if (btn) {
      setIndicatorStyle({
        transform: `translateX(${btn.offsetLeft}px)`,
        width: btn.offsetWidth,
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isNavigating.current) return;

      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (nearBottom) { setActiveSection("connect"); return; }
      const sections = ["home", "projects", "about", "connect"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { updateIndicator(activeSection); }, [activeSection, updateIndicator]);

  useEffect(() => {
    const onResize = () => updateIndicator(activeSection);
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => requestAnimationFrame(() => updateIndicator(activeSection)));
    return () => window.removeEventListener("resize", onResize);
  }, [activeSection, updateIndicator]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigate = (href: string) => {
    setMenuOpen(false);
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (!el) return;

    // Lock indicator to destination immediately
    isNavigating.current = true;
    setActiveSection(targetId);

    el.scrollIntoView({ behavior: "smooth" });

    // Clear any existing timeout
    if (navTimeout.current) clearTimeout(navTimeout.current);

    // Detect when scroll finishes using scrollend or fallback
    const unlock = () => { isNavigating.current = false; };
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", unlock, { once: true });
      // Safety fallback
      navTimeout.current = setTimeout(() => {
        window.removeEventListener("scrollend", unlock);
        unlock();
      }, 2000);
    } else {
      navTimeout.current = setTimeout(unlock, 1200);
    }
  };

  return (
    <div className="fixed z-50 top-0 inset-x-0 flex items-center justify-center h-[80px] md:h-[100px]">
      <nav className="hidden md:flex items-center justify-center w-full h-full">
        <div
          className={`relative flex items-center gap-px p-[5px] rounded-[1000px] backdrop-blur-[25px] transition-[background-color,box-shadow] duration-500
            ${scrolled ? "bg-bg/80 shadow-[0px_2px_20px_rgba(0,0,0,0.3)]" : "bg-bg/50 shadow-none"}`}
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Sliding indicator — GPU composited via transform */}
          <div
            className="absolute top-[5px] h-[calc(100%-10px)] rounded-[1000px] bg-text will-change-transform"
            style={{
              ...indicatorStyle,
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              ref={(el) => { pillRefs.current[i] = el; }}
              onClick={() => navigate(item.href)}
              className={`relative z-10 px-5 py-2.5 rounded-[1000px] font-label text-[13px] tracking-[1px] uppercase transition-colors duration-300
                ${activeSection === item.href.replace("#", "") ? "text-bg" : "text-text-secondary hover:text-text"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="md:hidden relative z-50 flex items-center justify-end w-full px-5 h-full">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="flex flex-col gap-[5px] p-2">
          <span className={`block h-[1.5px] w-5 bg-text transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-text transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-text transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-400
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {NAV_ITEMS.map((item, i) => (
          <button key={item.label} onClick={() => navigate(item.href)}
            className={`text-2xl font-serif tracking-wide transition-all duration-300
              ${activeSection === item.href.replace("#", "") ? "text-text" : "text-text-muted"} hover:text-text`}
            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
          >{item.label}</button>
        ))}
      </div>
    </div>
  );
};
