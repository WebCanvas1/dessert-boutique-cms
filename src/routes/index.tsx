import { createFileRoute, Link } from "@tanstack/react-router";
import { MenuSection } from "@/components/MenuSection";
import { OrderForm } from "@/components/OrderForm";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dessert Addiction — Fresh Homemade Brownies & Desserts" },
      {
        name: "description",
        content:
          "Handmade brownies, dessert cups, loaded desserts, gift boxes and specials — baked fresh and delivered with love.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const content = useSiteContent();

  const branding = content?.branding;
  const hero = content?.hero;
  const features = content?.features ?? [];
  const reviews = content?.reviews ?? [];
  const whatsapp = content?.whatsapp;

  const businessName = branding?.name ?? "Dessert Addiction";
  const businessFullName =
    branding?.fullName ?? "Dessert Addiction Brownies & Desserts";
  const logo = branding?.logo ?? "/logo1.jpg";

  const heroEyebrow = hero?.eyebrow ?? "deliciously homemade";
  const heroTitle = hero?.title ?? "Fresh Homemade Brownies & Desserts";
  const heroSubtitle =
    hero?.subtitle ??
    "Handmade with love. Perfect for birthdays, gifts and every sweet craving.";
  const primaryButtonText = hero?.primaryButtonText ?? "View Menu";
  const secondaryButtonText = hero?.secondaryButtonText ?? "Chat on WhatsApp";
  const heroImage = hero?.image ?? "/assets/hero-CorRaMlr.jpg";

  const whatsappNumber = whatsapp?.number ?? "";
  const whatsappMessage =
    whatsapp?.message ??
    `Hi ${businessFullName}! I'd love to place an order. Could you please help me?`;

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage,
      )}`
    : "/contact";

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-14 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <img
              src={logo}
              alt={businessFullName}
              className="mx-auto lg:mx-0 h-24 w-24 sm:h-28 sm:w-28 rounded-full object-contain bg-cream ring-4 ring-pink shadow-soft p-1"
            />

            <p className="script text-4xl sm:text-5xl text-chocolate-soft mt-6">
              {heroEyebrow}
            </p>

            <h1 className="font-display text-4xl sm:text-6xl text-chocolate leading-[1.05] mt-1">
              {heroTitle}
            </h1>

            <p className="mt-5 text-lg text-chocolate-soft max-w-xl mx-auto lg:mx-0">
              {heroSubtitle}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3">
              <a
                href="#menu"
                className="inline-flex justify-center items-center rounded-full bg-chocolate-soft text-cream px-6 py-3 font-semibold shadow-soft hover:bg-chocolate transition"
              >
                {primaryButtonText}
              </a>

              <a
                href={whatsappLink}
                target={whatsappNumber ? "_blank" : undefined}
                rel={whatsappNumber ? "noopener noreferrer" : undefined}
                className="inline-flex justify-center items-center rounded-full bg-cream text-chocolate px-6 py-3 font-semibold border border-border hover:bg-pink-soft transition"
              >
                {secondaryButtonText}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-pink-soft rounded-[3rem] -z-10 rotate-3" />
            <img
              src={heroImage}
              alt={`${businessName} desserts`}
              width={1536}
              height={1024}
              className="w-full h-auto rounded-[2.5rem] object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      <MenuSection id="menu" heading="h2" />

      <OrderForm />

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="script text-3xl text-chocolate-soft">why us</p>
            <h2 className="font-display text-3xl sm:text-4xl text-chocolate">
              A boutique bakery, with the basics done right
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-card p-6 border border-border shadow-soft"
              >
                <h3 className="font-display text-xl text-chocolate">
                  {f.title}
                </h3>
                <p className="mt-2 text-base text-chocolate-soft leading-relaxed">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="script text-3xl text-chocolate-soft">love letters</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate">
            What our regulars say
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl bg-card p-6 shadow-soft border border-border"
            >
              <div className="text-pink mb-2" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote className="text-base text-chocolate leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 font-semibold text-chocolate-soft">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/reviews"
            className="inline-flex items-center text-chocolate-soft font-semibold underline-offset-4 hover:underline"
          >
            Read all reviews →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="rounded-[2rem] bg-chocolate text-cream p-10 sm:p-14 text-center shadow-soft">
          <p className="script text-3xl text-pink">ready to indulge?</p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream mt-1">
            Order your next sweet fix today
          </h2>
          <p className="mt-3 opacity-85 max-w-xl mx-auto text-lg">
            Email us for detailed enquiries, or message us on WhatsApp for the
            fastest reply.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex justify-center items-center rounded-full bg-cream text-chocolate px-6 py-3 font-semibold hover:bg-pink-soft"
            >
              Send Email Enquiry
            </Link>

            <a
              href={whatsappLink}
              target={whatsappNumber ? "_blank" : undefined}
              rel={whatsappNumber ? "noopener noreferrer" : undefined}
              className="inline-flex justify-center items-center rounded-full bg-pink text-chocolate px-6 py-3 font-semibold hover:opacity-90"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
