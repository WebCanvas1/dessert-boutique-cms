import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { business, logo } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-chocolate text-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt={business.fullName} className="h-12 w-12 rounded-full object-contain bg-cream ring-2 ring-pink" />
            <div>
              <div className="font-display text-xl">{business.name}</div>
              <div className="text-sm opacity-80">Brownies & Desserts</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80 max-w-sm">{business.tagline}</p>
        </div>
        <div>
          <h3 className="text-cream font-display text-lg mb-3">Explore</h3>
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
          <h3 className="text-cream font-display text-lg mb-3">Find Us</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>{business.phone}</li>
            <li>{business.email}</li>
            <li>{business.address}</li>
            <li>{business.hours}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={business.social.instagram} aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white hover:opacity-90"><Instagram size={16} /></a>
            <a href={business.social.facebook} aria-label="Facebook" className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white hover:opacity-90"><Facebook size={16} /></a>
            <a href={business.social.tiktok} aria-label="TikTok" className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white text-xs font-bold hover:opacity-90">TT</a>
            <a href={business.social.pinterest} aria-label="Pinterest" className="h-9 w-9 grid place-items-center rounded-full bg-pink text-white text-xs font-bold hover:opacity-90">P</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 text-xs opacity-70 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} {business.fullName}. All rights reserved.</span>
          <Link to="/policies" className="hover:text-pink">Privacy · Terms · Refunds</Link>
        </div>
      </div>
    </footer>
  );
}