import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const content = useSiteContent();

  const branding = content?.branding;
  const whatsapp = content?.whatsapp;

  const businessName = branding?.name ?? "Dessert Addiction";
  const businessFullName =
    branding?.fullName ?? "Dessert Addiction Brownies & Desserts";
  const logo = branding?.logo ?? "/logo1.jpg";

  const whatsappNumber = whatsapp?.number ?? "";
  const whatsappMessage =
    whatsapp?.message ??
    `Hi ${businessFullName}! I'd love to place an order. Could you please help me?`;

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : "/contact";

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color-mix(in_oklab,var(--background)_88%,transparent)] border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img
            src={logo}
            alt={businessFullName}
            className="h-12 w-12 rounded-full object-contain bg-cream ring-2 ring-pink shrink-0"
          />

          <div className="hidden sm:block min-w-0">
            <div className="font-display text-lg leading-tight text-chocolate truncate">
              {businessName}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              Brownies & Desserts
            </div>
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
            href={whatsappLink}
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noopener noreferrer" : undefined}
            className="hidden sm:inline-flex items-center rounded-full bg-chocolate-soft text-cream px-4 py-2 text-sm font-semibold shadow-soft hover:bg-chocolate transition"
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
        <div className="md:hidden border-t border-border bg-background">
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
              href={whatsappLink}
              target={whatsappNumber ? "_blank" : undefined}
              rel={whatsappNumber ? "noopener noreferrer" : undefined}
              className="mt-2 inline-flex justify-center items-center rounded-full bg-chocolate-soft text-cream px-4 py-3 font-semibold"
            >
              Order Now on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
