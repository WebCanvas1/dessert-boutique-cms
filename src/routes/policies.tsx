import { createFileRoute } from "@tanstack/react-router";
import { policies } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policies — Dessert Addiction" },
      { name: "description", content: "Privacy, terms, refund, cancellation and custom orders policies for Dessert Addiction." },
      { property: "og:title", content: "Policies — Dessert Addiction" },
      { property: "og:description", content: "Our privacy, terms, refund, cancellation and custom orders policies." },
      { property: "og:url", content: "/policies" },
    ],
    links: [{ rel: "canonical", href: "/policies" }],
  }),
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <>
      <PageHeader eyebrow="fine print" title="Policies" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 space-y-6">
        {policies.map((p) => (
          <section key={p.slug} id={p.slug} className="rounded-2xl bg-card border border-border p-7 shadow-soft">
            <h2 className="font-display text-2xl text-chocolate">{p.title}</h2>
            <p className="mt-3 text-base text-chocolate-soft leading-relaxed whitespace-pre-line">{p.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}