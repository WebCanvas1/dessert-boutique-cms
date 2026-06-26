import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import type { SiteContent, SiteProduct } from "@/lib/site-content";

export function MenuSection({
  id,
  heading = "h1",
}: {
  id?: string;
  heading?: "h1" | "h2";
}) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [cat, setCat] = useState("All");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data: SiteContent) => setContent(data))
      .catch((err) => console.error("Failed to load menu content", err));
  }, []);

  const products = content?.menu ?? [];

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean)),
    );
    return ["All", ...unique];
  }, [products]);

  const filtered =
    cat === "All" ? products : products.filter((p) => p.category === cat);

  if (!content) {
    return (
      <section id={id} className="py-16">
        <PageHeader
          eyebrow="Menu"
          title="Loading menu..."
          subtitle="Please wait while we load our latest desserts."
          heading={heading}
        />
      </section>
    );
  }

  return (
    <section id={id} className="py-16">
      <PageHeader
        eyebrow="Menu"
        title="Our Menu"
        subtitle="Browse our freshly made brownies, dessert cups and custom trays."
        heading={heading}
      />

      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-3 px-4">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              cat === c
                ? "border-pink bg-pink text-white"
                : "border-border bg-cream text-chocolate hover:bg-pink-soft"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered
          .filter((p: SiteProduct) => p.available !== false)
          .map((p: SiteProduct) => (
            <ProductCard key={p.id} p={p as any} />
          ))}
      </div>
    </section>
  );
}
