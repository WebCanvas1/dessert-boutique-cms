import { Mail } from "lucide-react";
import { emailEnquiryUrl, type Product } from "@/content/site";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group rounded-3xl bg-card overflow-hidden shadow-soft border border-border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(62,39,35,0.28)]">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl text-chocolate leading-snug">{p.name}</h3>
          <span className={`text-[11px] uppercase tracking-wide px-2 py-1 rounded-full shrink-0 ${p.available ? "bg-pink-soft text-chocolate" : "bg-muted text-muted-foreground"}`}>
            {p.available ? "Available" : "Sold Out"}
          </span>
        </div>
        <p className="text-lg font-bold text-chocolate-soft">{p.price}</p>
        <p className="text-base text-chocolate-soft leading-relaxed">{p.description}</p>
        <a
          href={emailEnquiryUrl({ name: p.name, price: p.price })}
          className="mt-auto inline-flex justify-center items-center gap-2 rounded-full bg-chocolate-soft text-cream px-4 py-3 font-semibold hover:bg-chocolate transition w-full"
        >
          <Mail size={16} />
          Email Enquiry
        </a>
      </div>
    </article>
  );
}