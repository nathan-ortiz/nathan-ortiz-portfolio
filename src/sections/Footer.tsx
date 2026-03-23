export const Footer = () => (
  <footer className="relative bg-bg border-t border-border-subtle px-6 py-12 overflow-hidden">
    {/* Colored squares pattern */}
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-2 h-2 bg-accent-green opacity-60" />
      <div className="w-8 h-px bg-border-subtle" />
      <div className="w-2 h-2 bg-accent-amber opacity-60" />
      <div className="w-8 h-px bg-border-subtle" />
      <div className="w-2 h-2 bg-accent-rose opacity-60" />
    </div>
    <p className="text-center text-sm font-body text-text-muted">&copy; 2026 Nathan Ortiz</p>
  </footer>
);
