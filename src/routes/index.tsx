import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { business, features, hero, logo, products, testimonials, whatsappUrl } from "@/content/site";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dessert Addiction — Brownies, Cheesecake Cups & Cookies" },
      { name: "description", content: "Handcrafted brownies, cheesecake cups and cookies. Freshly baked, gift-ready, perfect for parties and events. Order on WhatsApp." },
      { property: "og:title", content: "Dessert Addiction — Brownies, Cheesecake Cups & Cookies" },
      { property: "og:description", content: "Handcrafted brownies, cheesecake cups and cookies. Freshly baked, gift-ready, perfect for parties." },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 8);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-16 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <img src={logo} alt={business.fullName} className="mx-auto lg:mx-0 h-28 w-28 sm:h-32 sm:w-32 rounded-full ring-4 ring-pink shadow-pink" />
            <p className="script text-4xl sm:text-5xl text-pink mt-6">freshly baked,</p>
            <h1 className="font-display text-4xl sm:text-6xl text-chocolate leading-[1.05] mt-1">
              Brownies, cups & cookies <br className="hidden sm:block" />made with love.
            </h1>
            <p className="mt-5 text-lg text-chocolate-soft max-w-xl mx-auto lg:mx-0">{business.tagline}</p>
            <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
              <Link to="/menu" className="inline-flex items-center rounded-full bg-pink text-white px-6 py-3 font-semibold shadow-pink hover:opacity-90 transition">View Menu</Link>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-chocolate text-cream px-6 py-3 font-semibold hover:bg-chocolate-soft transition">Order on WhatsApp</a>
              <Link to="/contact" className="inline-flex items-center rounded-full bg-cream text-chocolate px-6 py-3 font-semibold border border-border hover:bg-pink-soft transition">Send Enquiry</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-pink-soft rounded-[3rem] -z-10 rotate-3" />
            <img src={hero} alt="Assortment of dessert cups, brownies and tiramisu on mint background" width={1536} height={1024} className="w-full h-auto rounded-[2.5rem] object-cover shadow-soft" />
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="script text-3xl text-pink">our favourites</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate">Most-loved desserts</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/menu" className="inline-flex items-center rounded-full bg-chocolate text-cream px-6 py-3 font-semibold hover:bg-chocolate-soft">See full menu</Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="script text-3xl text-pink">why us</p>
            <h2 className="font-display text-3xl sm:text-4xl text-chocolate">A boutique bakery, with the basics done right</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-mint p-6 border border-border">
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
          <p className="script text-3xl text-pink">love letters</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate">What our regulars say</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-card p-6 shadow-soft border border-border">
              <blockquote className="text-base text-chocolate leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-4 font-semibold text-pink">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="rounded-[2rem] bg-chocolate text-cream p-10 sm:p-14 text-center shadow-soft">
          <p className="script text-3xl text-pink">ready to indulge?</p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream mt-1">Order your next sweet fix today</h2>
          <p className="mt-3 opacity-85 max-w-xl mx-auto text-lg">Message us on WhatsApp for fastest service, or send an enquiry and we'll get back the same day.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-pink text-white px-6 py-3 font-semibold hover:opacity-90">Order on WhatsApp</a>
            <Link to="/contact" className="inline-flex items-center rounded-full bg-cream text-chocolate px-6 py-3 font-semibold hover:bg-pink-soft">Send Enquiry</Link>
          </div>
        </div>
      </section>
    </>
  );
}
