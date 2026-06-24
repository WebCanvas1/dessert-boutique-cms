import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Dessert Addiction" },
      { name: "description", content: "Answers to common questions about ordering, custom desserts, event catering, allergies and delivery." },
      { property: "og:title", content: "FAQ — Dessert Addiction" },
      { property: "og:description", content: "Ordering, custom desserts, events, allergies and delivery — answered." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <>
      <PageHeader eyebrow="questions" title="Frequently asked" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl bg-card border border-border p-5 shadow-soft">
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
              <h2 className="font-display text-lg text-chocolate">{f.q}</h2>
              <span className="text-pink text-2xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-base text-chocolate-soft leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}