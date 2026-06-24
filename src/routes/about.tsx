import { createFileRoute } from "@tanstack/react-router";
import { about, hero, logo } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dessert Addiction" },
      { name: "description", content: "The story behind Dessert Addiction — a family-run dessert boutique baking brownies, cheesecake cups and cookies to order." },
      { property: "og:title", content: "About — Dessert Addiction" },
      { property: "og:description", content: "A family-run dessert boutique. Real ingredients, real care, baked to order." },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="our story" title="Baked at home. Made with love." />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 space-y-10">
        <img src={logo} alt="Dessert Addiction logo" className="mx-auto h-32 w-32 rounded-full ring-4 ring-pink shadow-pink" />
        <section className="rounded-2xl bg-card p-7 shadow-soft border border-border">
          <h2 className="font-display text-2xl text-chocolate">Our story</h2>
          <p className="mt-3 text-lg text-chocolate-soft leading-relaxed">{about.story}</p>
        </section>
        <section className="rounded-2xl bg-card p-7 shadow-soft border border-border">
          <h2 className="font-display text-2xl text-chocolate">Meet the baker</h2>
          <p className="mt-3 text-lg text-chocolate-soft leading-relaxed">{about.owner}</p>
        </section>
        <section className="rounded-2xl bg-card p-7 shadow-soft border border-border">
          <h2 className="font-display text-2xl text-chocolate">Our mission</h2>
          <p className="mt-3 text-lg text-chocolate-soft leading-relaxed">{about.mission}</p>
        </section>
        <section className="rounded-2xl bg-card p-7 shadow-soft border border-border">
          <h2 className="font-display text-2xl text-chocolate">Why customers love us</h2>
          <p className="mt-3 text-lg text-chocolate-soft leading-relaxed">{about.love}</p>
        </section>
      </div>
    </>
  );
}