import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { gallery } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Dessert Addiction" },
      { name: "description", content: "A look at our handcrafted brownies, dessert cups, trays and custom orders for parties and events." },
      { property: "og:title", content: "Gallery — Dessert Addiction" },
      { property: "og:description", content: "Photos of our brownies, dessert cups and custom trays." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHeader eyebrow="gallery" title="A peek inside the kitchen" subtitle="Tap any photo for a closer look." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="mb-4 block w-full overflow-hidden rounded-2xl shadow-soft border border-border bg-card group"
            >
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] bg-chocolate/85 backdrop-blur flex items-center justify-center p-4"
        >
          <button aria-label="Close" className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-cream text-chocolate">
            <X size={20} />
          </button>
          <img src={gallery[open].src} alt={gallery[open].alt} className="max-h-[85vh] max-w-full rounded-2xl shadow-soft" />
        </div>
      )}
    </>
  );
}