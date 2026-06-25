import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products } from "@/content/site";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Dessert Addiction" },
      { name: "description", content: "Explore our full menu of dessert cups, brownies, dessert trays, cookies and custom orders. Prices and descriptions for every item." },
      { property: "og:title", content: "Menu — Dessert Addiction" },
      { property: "og:description", content: "Dessert cups, brownies, trays and cookies — see prices and order on WhatsApp." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);
  return (
    <>
      <PageHeader eyebrow="our menu" title="Every dessert, freshly made" subtitle="Filter by category, then enquire by email or message us on WhatsApp." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${cat === c ? "bg-pink text-white border-pink" : "bg-cream text-chocolate border-border hover:bg-pink-soft"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </>
  );
}