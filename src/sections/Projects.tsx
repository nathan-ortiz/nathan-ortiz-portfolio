import { useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { ProjectModal, type ProjectData } from "@/components/ProjectModal";

type Project = {
  image?: string; video?: string; name: string; tagline: string; category: string;
  accentColor: string; bgColor: string; objectFit: "cover" | "contain";
  href?: string; description: string; bullets: string[]; tech: string[]; live?: boolean;
};

const PROJECTS: Project[] = [
  {
    image: "/images/pebbly_portfolio.jpg", name: "Pebbly", tagline: "Autonomous AI employee that lives in your messages",
    category: "Native AI Assistant", accentColor: "#4ADE80", bgColor: "#f5f5f4", objectFit: "cover", href: "https://getpebbly.com", live: true,
    description: "Pebbly is an autonomous personal AI assistant that reads your emails, calendar, and conversations and does real work for you.",
    tech: ["React", "TypeScript", "Node.js", "SQLite", "Docker", "Stripe", "WebSocket"],
    bullets: [
      "Routes across 6+ AI models with automatic failover and cost optimization",
      "BYOK model — users bring their own API keys with full cost transparency",
      "Isolated cloud instances with Docker-sandboxed code execution per user",
    ],
  },
  {
    image: "/images/flashcardwidget_portfolio.jpg", name: "Flashcard Widget", tagline: "The first AI-powered flashcard iOS widget app",
    category: "iOS App", accentColor: "#FB7185", bgColor: "#2a2a2e", objectFit: "contain", href: "https://flashcardwidget.com",
    description: "The first iOS app to put spaced-repetition flashcards on home and lock screen widgets.",
    tech: ["Swift", "SwiftUI", "WidgetKit", "Core Data", "Firebase"],
    bullets: [
      "First app of its kind — created a new category on the App Store",
      "AI-powered card generation from photos, PDFs, and Google Drive files",
      "Custom WidgetKit integration with spaced repetition across home and lock screen",
    ],
  },
  {
    video: "/images/HoloForgeDemo.mp4", name: "HoloForge", tagline: "Interactive 3D holographic display",
    category: "Hardware & Software", accentColor: "#FBBF24", bgColor: "#1c1917", objectFit: "cover",
    description: "An interactive holographic display using beam splitter optics and MediaPipe hand gesture control.",
    tech: ["Python", "PyOpenGL", "MediaPipe", "Raspberry Pi 5", "OpenCV"],
    bullets: [
      "60fps rendering with <100ms gesture response on a Raspberry Pi 5",
      "Pivoted from failed point-cloud approach to wireframes after 6 weeks of R&D",
      "7 interactive visualizations with 4 hand gesture controls",
    ],
  },
  {
    image: "/images/hirect_portfolio.jpg", name: "Hirect (now Hirey)", tagline: "$29M+ funded AI hiring startup",
    category: "Operations & Growth", accentColor: "#FB7185", bgColor: "#f5f5f4", objectFit: "cover", href: "https://hirey.com",
    description: "Joined this venture-backed AI hiring startup's founding team after the CEO noticed independent work.",
    tech: ["SEO", "Google Ads", "Content Strategy", "Team Leadership"],
    bullets: [
      "Promoted from Senior Copywriter to Operations Manager within first year",
      "Led 10-person creative team and supported Series A and B funding rounds",
      "Tripled user growth via multi-channel acquisition (SEO, ads, social, partnerships)",
    ],
  },
  {
    image: "/images/jobsearchsensei_portfolio.jpg", name: "Job Search Sensei", tagline: "AI-powered job search platform",
    category: "Product & Service", accentColor: "#4ADE80", bgColor: "#172033", objectFit: "contain", href: "https://jobsearchsensei.com",
    description: "AI platform that tailors resumes, optimizes LinkedIn profiles, and auto-applies to jobs for students.",
    tech: ["AI/ML", "Web Platform", "Resume Optimization", "LinkedIn API"],
    bullets: [
      "AI-powered resume tailoring matched to specific job listings",
      "Coached dozens of students through the full job search process",
      "Users landed interviews within 30 days, saving 100+ hours each",
    ],
  },
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const topRow = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const bottomRow = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const openModal = (p: Project) => setSelectedProject({
    name: p.name, category: p.category, accentColor: p.accentColor,
    description: p.description, bullets: p.bullets, tech: p.tech, href: p.href,
  });

  return (
    <section id="projects" className="relative bg-bg px-6 md:px-16 pt-[60px] md:pt-[80px] pb-[60px] md:pb-[80px] scroll-mt-[100px]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[60%] opacity-[0.07]" style={{ background: "radial-gradient(ellipse at 30% 35%, #4ADE80, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] opacity-[0.05]" style={{ background: "radial-gradient(ellipse at 70% 70%, #4ADE80, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionLabel color="green" text="PROJECTS" />
        <div ref={topRow.ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-7 mt-10">
          {PROJECTS.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.name} project={p} isVisible={topRow.isVisible} delay={i * 140} onDetails={() => openModal(p)} />
          ))}
        </div>
        <div ref={bottomRow.ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-7 mt-10 md:mt-14">
          {PROJECTS.slice(2).map((p, i) => (
            <ProjectCard key={p.name} project={p} isVisible={bottomRow.isVisible} delay={i * 140} onDetails={() => openModal(p)} />
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

function ProjectCard({ project, isVisible, delay, onDetails }: { project: Project; isVisible: boolean; delay: number; onDetails: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
    el.style.transform = `translateY(-4px) translate(${x}px, ${y}px)`;
    el.style.boxShadow = `0 0 24px ${project.accentColor}20, rgba(255,255,255,0.04) 6px 6px 0px 0px`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
      cardRef.current.style.boxShadow = "";
    }
  };

  return (
    <div className={`group transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${delay}ms` }}>
      <button onClick={onDetails} className="w-full text-left cursor-pointer">
        <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
          className="card-interactive border border-border bg-bg-raised overflow-hidden shadow-[rgba(255,255,255,0.04)_4px_4px_0px_0px]">
          {/* Title bar — consistent structure for all cards */}
          <div className="flex items-center gap-2 px-3 py-2 bg-bg border-b border-border">
            <div className="flex items-center gap-[6px] shrink-0">
              <div className="w-2.5 h-2.5" style={{ backgroundColor: project.accentColor }} />
              <span className="font-label text-[10px] tracking-[1.2px] uppercase text-text-secondary leading-none">{project.category}</span>
            </div>
            {/* Decorative lines — always present */}
            <div className="flex-1 flex flex-col gap-[1.5px] overflow-hidden mx-2">
              {[...Array(4)].map((_, i) => <div key={i} className="w-full h-px bg-border-subtle" />)}
            </div>
            {/* Live indicator for Pebbly — same size as category text */}
            {project.live && (
              <div className="flex items-center gap-[6px] shrink-0">
                <span className="font-label text-[10px] tracking-[1.2px] uppercase text-accent-green leading-none hidden sm:inline">Currently Building</span>
                <span className="live-dot w-2 h-2 rounded-full bg-accent-green" />
              </div>
            )}
          </div>
          <div className="aspect-[16/10] flex items-center justify-center overflow-hidden" style={{ backgroundColor: project.bgColor }}>
            {project.video ? (
              <video src={project.video} autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover" />
            ) : (
              <img src={project.image} alt={project.name} loading="lazy"
                className={`w-full h-full ${project.objectFit === "contain" ? "object-contain p-1" : "object-cover"}`} />
            )}
          </div>
        </div>
      </button>
      <div className="mt-4 px-1">
        <div className="flex items-center gap-2">
          {project.href ? (
            <a href={project.href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="font-serif text-[19px] md:text-[21px] text-text font-medium hover:text-accent-green transition-colors inline-flex items-center gap-1.5">
              {project.name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          ) : (
            <span className="font-serif text-[19px] md:text-[21px] text-text font-medium">{project.name}</span>
          )}
        </div>
        <p className="font-body text-[13px] md:text-[14px] text-text-muted mt-1">{project.tagline}</p>
      </div>
    </div>
  );
}
