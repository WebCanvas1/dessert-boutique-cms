import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export function Footer() {
  const content = useSiteContent();

  const branding = content?.branding;
  const contact = content?.contact;
  const social = content?.social;

  const businessName = branding?.name ?? "Dessert Addiction";
  const businessFullName =
    branding?.fullName ?? "Dessert Addiction Brownies & Desserts";
  const tagline = branding?.tagline ?? "";
  const logo = branding?.logo ?? "/logo1.jpg";

  return (
    <footer className="mt-24 bg-chocolate text-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt={businessFullName}
              className="h-12 w-12 rounded-full object-contain bg-cream ring-2 ring-pink"
            />

            <div>
              <div className="font-display text-xl">
                {businessName}
              </div>

              <div className="text-sm opacity-80">
                Brownies & Desserts
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm opacity-80 max-w-sm">
            {tagline}
          </p>
        </div>

        <div>
          <h3 className="text-cream font-display text-lg mb-3">
            Explore
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-pink">Menu</Link></li>
            <li><Link to="/gallery" className="hover:text-pink">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-pink">About</Link></li>
            <li><Link to="/faq" className="hover:text-pink">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-pink">Contact</Link></li>
            <li><Link to="/policies" className="hover:text-pink">Policies</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-cream font-display text-lg mb-3">
            Find Us
          </h3>

          <ul className="space-y-2 text-sm opacity-90">
            <li>{contact?.phone}</li>
            <li>{contact?.email}</li>
            <li>{contact?.address}</li>
            <li>{contact?.hours}</li>
          </ul>

          <div className="mt-4 flex gap-3">
            <a
              href={social?.instagram}
              aria-label="Instagram"
              className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white hover:opacity-90"
            >
              <Instagram size={16} />
            </a>

            <a
              href={social?.facebook}
              aria-label="Facebook"
              className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white hover:opacity-90"
            >
              <Facebook size={16} />
            </a>

            <a
              href={social?.tiktok}
              aria-label="TikTok"
              className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white text-xs font-bold hover:opacity-90"
            >
              TT
            </a>

            <a
              href={social?.pinterest}
              aria-label="Pinterest"
              className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white text-xs font-bold hover:opacity-90"
            >
              P
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">

          <div className="flex justify-center mb-6">
            <Link
              to="/admin"
              className="rounded-full border border-pink/40 px-5 py-2 text-sm font-medium text-pink transition-all hover:bg-pink hover:text-white"
            >
              Admin Login
            </Link>
          </div>

          <div className="text-xs opacity-70 flex flex-wrap justify-between gap-2">
            <span>
              © {new Date().getFullYear()} {businessFullName}. All rights reserved.
            </span>

            <Link to="/policies" className="hover:text-pink">
              Privacy · Terms · Refunds
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
