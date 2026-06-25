import { createFileRoute, Link } from "@tanstack/react-router";
import { business, features, hero, logo, menuCategories, products, testimonials, whatsappUrl } from "@/content/site";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dessert Addiction — Fresh Homemade Brownies & Desserts" },
      { name: "description", content: "Handmade brownies, dessert cups, loaded desserts, gift boxes and specials — baked fresh and delivered with love." },
      { property: "og:title", content: "Dessert Addiction — Fresh Homemade Brownies & Desserts" },
      { property: "og:description", content: "Handmade brownies, dessert cups, loaded desserts and gift boxes. Perfect for birthdays, gifts and every sweet craving." },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-14 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <img src={logo} alt={business.fullName} className="mx-auto lg:mx-0 h-24 w-24 sm:h-28 sm:w-28 rounded-full object-contain bg-cream ring-4 ring-pink shadow-soft p-1" />
            <p className="script text-4xl sm:text-5xl text-chocolate-soft mt-6">deliciously homemade</p>
            <h1 className="font-display text-4xl sm:text-6xl text-chocolate leading-[1.05] mt-1">
              Fresh Homemade <br className="hidden sm:block" />Brownies & Desserts
            </h1>
            <p className="mt-5 text-lg text-chocolate-soft max-w-xl mx-auto lg:mx-0">
              Handmade with love. Perfect for birthdays, gifts and every sweet craving.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3">
              <a href="#menu" className="inline-flex justify-center items-center rounded-full bg-chocolate-soft text-cream px-6 py-3 font-semibold shadow-soft hover:bg-chocolate transition">View Menu</a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center rounded-full bg-cream text-chocolate px-6 py-3 font-semibold border border-border hover:bg-pink-soft transition">Chat on WhatsApp</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-pink-soft rounded-[3rem] -z-10 rotate-3" />
            <img src={hero} alt="Assortment of brownies, dessert cups and tiramisu" width={1536} height={1024} className="w-full h-auto rounded-[2.5rem] object-cover shadow-soft" />
          </div>
        </div>
      </section>

      {/* FULL MENU GROUPED BY CATEGORY */}
      <section id="menu" className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 pb-16 scroll-mt-24">
        <div className="text-center mb-10">
          <p className="script text-3xl text-chocolate-soft">our full menu</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate">Every dessert, freshly made to order</h2>
          <p className="mt-3 text-chocolate-soft max-w-2xl mx-auto">Browse the full menu below — enquire by email or start a quick WhatsApp chat to confirm flavours, quantities and delivery.</p>
        </div>

        <div className="space-y-14">
          {menuCategories.map((cat) => {
            const items = products.filter((p) => p.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <div className="flex items-end justify-between gap-4 mb-5">
                  <h3 className="font-display text-2xl sm:text-3xl text-chocolate">{cat}</h3>
                  <span className="text-sm text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"}</span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => <ProductCard key={p.id} p={p} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="script text-3xl text-chocolate-soft">why us</p>
            <h2 className="font-display text-3xl sm:text-4xl text-chocolate">A boutique bakery, with the basics done right</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 border border-border shadow-soft">
                <h3 className="font-display text-xl text-chocolate">{f.title}</h3>
                <p className="mt-2 text-base text-chocolate-soft leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="script text-3xl text-chocolate-soft">love letters</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate">What our regulars say</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-card p-6 shadow-soft border border-border">
              <div className="text-pink mb-2" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="text-base text-chocolate leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-4 font-semibold text-chocolate-soft">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/reviews" className="inline-flex items-center text-chocolate-soft font-semibold underline-offset-4 hover:underline">Read all reviews →</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="rounded-[2rem] bg-chocolate text-cream p-10 sm:p-14 text-center shadow-soft">
          <p className="script text-3xl text-pink">ready to indulge?</p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream mt-1">Order your next sweet fix today</h2>
          <p className="mt-3 opacity-85 max-w-xl mx-auto text-lg">Email us for detailed enquiries, or message us on WhatsApp for the fastest reply.</p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex justify-center items-center rounded-full bg-cream text-chocolate px-6 py-3 font-semibold hover:bg-pink-soft">Send Email Enquiry</Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center rounded-full bg-pink text-chocolate px-6 py-3 font-semibold hover:opacity-90">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}