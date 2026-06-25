import { createFileRoute } from "@tanstack/react-router";
import { testimonials, whatsappUrl } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Dessert Addiction" },
      { name: "description", content: "Real reviews from Dessert Addiction customers — brownies, dessert cups, custom trays and gift boxes." },
      { property: "og:title", content: "Reviews — Dessert Addiction" },
      { property: "og:description", content: "What our customers say about our handcrafted brownies and desserts." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHeader eyebrow="reviews" title="Sweet words from our regulars" subtitle="Real reviews from real dessert lovers." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        {/* Mobile: horizontal snap slider · Desktop: grid */}
        <div className="md:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t) => (
            <ReviewCard key={t.name} name={t.name} quote={t.quote} className="snap-center shrink-0 w-[85%]" />
          ))}
        </div>
        <div className="hidden md:grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <ReviewCard key={t.name} name={t.name} quote={t.quote} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-chocolate-soft text-cream px-6 py-3 font-semibold hover:bg-chocolate">Order yours on WhatsApp</a>
        </div>
      </div>
    </>
  );
}

function ReviewCard({ name, quote, className = "" }: { name: string; quote: string; className?: string }) {
  return (
    <figure className={`rounded-2xl bg-card p-6 shadow-soft border border-border ${className}`}>
      <div className="text-pink text-lg mb-2" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote className="text-base text-chocolate leading-relaxed">“{quote}”</blockquote>
      <figcaption className="mt-4 font-semibold text-chocolate-soft">— {name}</figcaption>
    </figure>
  );
}