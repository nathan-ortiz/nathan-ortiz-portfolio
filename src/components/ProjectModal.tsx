import { useEffect } from "react";

export type ProjectData = {
  name: string; category: string; accentColor: string;
  description: string; bullets: string[]; tech: string[]; href?: string;
};

const darken = (hex: string, amount: number) => {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `rgb(${r},${g},${b})`;
};

type Props = { project: ProjectData | null; onClose: () => void };

export const ProjectModal = ({ project, onClose }: Props) => {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [project, onClose]);

  if (!project) return null;
  const btnBg = darken(project.accentColor, 50);

  return (
    <div className="modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85" />
      <div className="modal-content relative w-full max-w-lg border border-border bg-bg-card shadow-[rgba(255,255,255,0.04)_6px_6px_0px_0px] overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Sticky title bar */}
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-bg border-b border-border z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5" style={{ backgroundColor: project.accentColor }} />
            <span className="font-label text-[11px] tracking-[1.2px] uppercase text-text-secondary">{project.category}</span>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center border border-border bg-bg-card hover:bg-white/5 transition-colors text-text-muted text-sm" aria-label="Close">&#215;</button>
        </div>

        <div className="p-6 md:p-8 space-y-5">
          {/* Project name */}
          <h3 className="font-serif text-[28px] md:text-[32px] leading-tight text-text">{project.name}</h3>

          {/* One-liner description */}
          <p className="font-body text-[15px] md:text-[16px] leading-[26px] text-text-secondary">{project.description}</p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 font-label text-[10px] tracking-[0.8px] uppercase border border-border text-text-secondary bg-white/5 rounded-sm">{t}</span>
            ))}
          </div>

          {/* Bullet points */}
          <ul className="space-y-3 pt-1">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 mt-2 shrink-0 rounded-full" style={{ backgroundColor: project.accentColor }} />
                <span className="font-body text-[14px] md:text-[15px] leading-[23px] text-text-secondary">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Visit button */}
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center justify-center w-full px-6 py-4 font-label text-[12px] tracking-[1.2px] uppercase border border-border text-white shadow-[rgba(255,255,255,0.04)_3px_3px_0px_0px] transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: btnBg }}>
              Visit {project.name} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
