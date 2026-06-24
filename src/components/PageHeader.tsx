export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <header className="text-center max-w-2xl mx-auto pt-12 pb-8 px-4">
      {eyebrow && <p className="script text-3xl text-pink">{eyebrow}</p>}
      <h1 className="font-display text-4xl sm:text-5xl text-chocolate mt-2">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-chocolate-soft">{subtitle}</p>}
    </header>
  );
}