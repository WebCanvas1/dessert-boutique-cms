import { useState } from "react";
import { categories, products } from "@/content/site";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";

export function MenuSection({
  id,
  heading = "h1",
}: {
  id?: string;
  heading?: "h1" | "h2";
}) {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const filtered =
    cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <section id={id} className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 scroll-mt-24">
      <PageHeader
        eyebrow="our menu"
        title="Every dessert, freshly made"
        subtitle="Filter by category, then enquire by email or message us on WhatsApp."
        heading={heading}
      />
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
              cat === c
                ? "bg-pink text-white border-pink"
                : "bg-cream text-chocolate border-border hover:bg-pink-soft"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
