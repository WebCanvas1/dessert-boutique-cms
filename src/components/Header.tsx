import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { business, logo, whatsappUrl } from "@/content/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color-mix(in_oklab,var(--mint)_85%,transparent)] border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img src={logo} alt={business.fullName} className="h-12 w-12 rounded-full object-cover ring-2 ring-pink shrink-0" />
          <div className="hidden sm:block min-w-0">
            <div className="font-display text-lg leading-tight text-chocolate truncate">{business.name}</div>
            <div className="text-xs text-muted-foreground truncate">Brownies & Desserts</div>
          </div>
        </Link>
        <nav className="hidden md:flex justify-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-chocolate hover:text-pink transition-colors [&.active]:text-pink"
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 justify-end">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-full bg-pink text-white px-4 py-2 text-sm font-semibold shadow-pink hover:opacity-90 transition"
          >
            Order Now
          </a>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full h-10 w-10 bg-cream text-chocolate border border-border"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-mint">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg text-chocolate font-medium hover:bg-pink-soft [&.active]:text-pink"
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex justify-center items-center rounded-full bg-pink text-white px-4 py-3 font-semibold"
            >
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}