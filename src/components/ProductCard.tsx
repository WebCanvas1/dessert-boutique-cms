import { whatsappUrl, type Product } from "@/content/site";

export function ProductCard({ p }: { p: Product }) {
  const msg = `Hi Dessert Addiction, I'd like to order: ${p.name} (${p.price}).`;
  return (
    <article className="group rounded-3xl bg-card overflow-hidden shadow-soft border border-border flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-mint">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl text-chocolate leading-snug">{p.name}</h3>
          <span className={`text-[11px] uppercase tracking-wide px-2 py-1 rounded-full shrink-0 ${p.available ? "bg-mint-deep text-chocolate" : "bg-muted text-muted-foreground"}`}>
            {p.available ? "Available" : "Sold Out"}
          </span>
        </div>
        <p className="text-lg font-bold text-pink">{p.price}</p>
        <p className="text-base text-chocolate-soft leading-relaxed">{p.description}</p>
        <a
          href={whatsappUrl(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex justify-center items-center rounded-full bg-chocolate text-cream px-4 py-3 font-semibold hover:bg-chocolate-soft transition"
        >
          Order via WhatsApp
        </a>
      </div>
    </article>
  );
}