import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dessert Addiction" },
      {
        name: "description",
        content:
          "The story behind Dessert Addiction — a family-run dessert boutique.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const content = useSiteContent();

  const about = content?.about;
  const branding = content?.branding;

  if (!about || !branding) {
    return null;
  }

  return (
    <>
      <PageHeader
        eyebrow="our story"
        title={about.heading || "Baked at home. Made with love."}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 space-y-10">

        <img
          src={branding.logo}
          alt={branding.fullName}
          className="mx-auto h-32 w-32 rounded-full ring-4 ring-pink shadow-pink object-contain bg-white"
        />

        {about.image && (
          <img
            src={about.image}
            alt="About"
            className="rounded-3xl w-full shadow-soft"
          />
        )}

        <section className="rounded-2xl bg-card p-7 shadow-soft border border-border">
          <h2 className="font-display text-2xl text-chocolate">
            Our Story
          </h2>

          <p className="mt-3 text-lg text-chocolate-soft leading-relaxed">
            {about.story}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-7 shadow-soft border border-border">
          <h2 className="font-display text-2xl text-chocolate">
            Meet the Baker
          </h2>

          <p className="mt-3 text-lg text-chocolate-soft leading-relaxed">
            {about.owner}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-7 shadow-soft border border-border">
          <h2 className="font-display text-2xl text-chocolate">
            Our Mission
          </h2>

          <p className="mt-3 text-lg text-chocolate-soft leading-relaxed">
            {about.mission}
          </p>
        </section>
      </div>
    </>
  );
}
