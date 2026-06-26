// Single source of truth for the editable site content schema + defaults.
// The admin panel writes this shape to KV; the public site reads it back.

import {
  business as defaultBusiness,
  products as defaultProducts,
  features as defaultFeatures,
  testimonials as defaultTestimonials,
  gallery as defaultGallery,
  faqs as defaultFaqs,
  policies as defaultPolicies,
  about as defaultAbout,
  logo as defaultLogo,
  hero as defaultHero,
} from "@/content/site";

export type SiteProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  available: boolean;
};

export type SiteContent = {
  branding: {
    name: string;
    fullName: string;
    tagline: string;
    logo: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    image: string;
  };
  about: {
    heading: string;
    story: string;
    owner: string;
    mission: string;
    image: string;
  };
  menu: SiteProduct[];
  gallery: { src: string; alt: string }[];
  reviews: { name: string; quote: string; rating: number }[];
  features: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  policies: { slug: string; title: string; body: string }[];
  contact: {
    phone: string;
    email: string;
    address: string;
    serviceAreas: string;
    hours: string;
  };
  whatsapp: {
    number: string;
    message: string;
  };
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
    pinterest: string;
  };
  orderForm: {
    heading: string;
    subtitle: string;
    termsLabel: string;
    submitLabel: string;
    destinationEmail: string;
  };
};

export const defaultContent: SiteContent = {
  branding: {
    name: defaultBusiness.name,
    fullName: defaultBusiness.fullName,
    tagline: defaultBusiness.tagline,
    logo: defaultLogo,
  },
  hero: {
    eyebrow: "deliciously homemade",
    title: "Fresh Homemade Brownies & Desserts",
    subtitle: "Handmade with love. Perfect for birthdays, gifts and every sweet craving.",
    primaryButtonText: "View Menu",
    secondaryButtonText: "Chat on WhatsApp",
    image: defaultHero,
  },
  about: {
    heading: "Our story",
    story: defaultAbout.story,
    owner: defaultAbout.owner,
    mission: defaultAbout.mission,
    image: defaultHero,
  },
  menu: defaultProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.image,
    available: p.available,
  })),
  gallery: defaultGallery.map((g) => ({ src: g.src, alt: g.alt })),
  reviews: defaultTestimonials.map((t) => ({ name: t.name, quote: t.quote, rating: 5 })),
  features: defaultFeatures.map((f) => ({ title: f.title, text: f.text })),
  faqs: defaultFaqs.map((f) => ({ q: f.q, a: f.a })),
  policies: defaultPolicies.map((p) => ({ slug: p.slug, title: p.title, body: p.body })),
  contact: {
    phone: defaultBusiness.phone,
    email: defaultBusiness.email,
    address: defaultBusiness.address,
    serviceAreas: defaultBusiness.serviceAreas,
    hours: defaultBusiness.hours,
  },
  whatsapp: {
    number: defaultBusiness.whatsappNumber,
    message: defaultBusiness.whatsappMessage,
  },
  social: defaultBusiness.social,
  orderForm: {
    heading: "Place an order",
    subtitle:
      "Tell us what you'd like and we'll get back to you within a few hours to confirm pricing, pickup or delivery.",
    termsLabel: "I agree to the Terms & Conditions.",
    submitLabel: "Submit Order",
    destinationEmail: defaultBusiness.email,
  },
};