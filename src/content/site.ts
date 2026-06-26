import logoAsset from "@/assets/logo.jpg.asset.json";
import heroImg from "@/assets/hero.jpg";
import jellyImg from "@/assets/jelly-custard.jpg";
import mixedImg from "@/assets/mixed-cups.jpg";
import browniesImg from "@/assets/brownies.jpg";
import dubaiImg from "@/assets/dubai-brownies.jpg";
import cookiesImg from "@/assets/cookies.jpg";
import tripleCookiesImg from "@/assets/triple-cookies.jpg";
import customTrayImg from "@/assets/custom-tray.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import oreoImg from "@/assets/oreo.jpg";
import biscoffImg from "@/assets/biscoff.png";
import tiramisuImg from "@/assets/tira.jpg";

/**
 * Central editable site content.
 * NOTE: This file is the single source of truth for editable content. To wire
 * an admin panel, swap these exports for fetchers backed by Cloudflare KV / D1
 * (e.g. env.CONTENT_KV.get("site")) and keep the same shape.
 */

export const logo = logoAsset.url;
export const hero = heroImg;

export const business = {
  name: "Dessert Addiction",
  fullName: "Dessert Addiction Brownies & Desserts",
  tagline: "Handcrafted brownies, cheesecake cups & cookies — baked fresh, delivered with love.",
  phone: "+1 (555) 123-4567",
  email: "hello@dessertaddiction.com",
  address: "123 Sweet Street, Your City",
  serviceAreas: "Local delivery, citywide pickup, event catering",
  hours: "Tue – Sun · 10:00 AM – 8:00 PM (Closed Mondays)",
  // Admin: change this to the real WhatsApp number in international format (no +, no spaces).
  whatsappNumber: "15551234567",
  whatsappMessage:
    "Hi Dessert Addiction Brownies & Desserts! I'd love to place an order. Could you please help me?",
  // Admin: paste your Web3Forms access key here.
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
  social: {
    instagram: "https://instagram.com/dessertaddiction",
    facebook: "https://facebook.com/dessertaddiction",
    tiktok: "https://tiktok.com/@dessertaddiction",
    pinterest: "https://pinterest.com/dessertaddiction",
  },
};

export const whatsappUrl = (message = business.whatsappMessage) =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const emailEnquiryUrl = (product?: { name: string; price: string }) => {
  const subject = product
    ? `Enquiry: ${product.name}`
    : "Dessert enquiry";
  const body = product
    ? `Hi Dessert Addiction,\n\nI'd like to enquire about: ${product.name} (${product.price}).\n\nPreferred date:\nQuantity / flavours:\n\nThank you!`
    : `Hi Dessert Addiction,\n\nI'd like to enquire about your desserts.\n\nThank you!`;
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "Brownies" | "Dessert Cups" | "Loaded Desserts" | "Gift Boxes" | "Specials";
  image: string;
  available: boolean;
};

export const products: Product[] = [
  { id: "triple-brownie", name: "Triple Chocolate Brownie Tray", description: "Fudgy brownie loaded with dark, milk & white chocolate chunks.", price: "Small $30 · Medium $35 · Large $40", category: "Brownies", image: browniesImg, available: true },
  { id: "dubai-brownie", name: "Dubai Chocolate Brownie Tray", description: "Pistachio cream, crispy kataifi and chocolate — the viral favourite.", price: "Small $35 · Medium $45 · Large $55", category: "Brownies", image: dubaiImg, available: true },

  { id: "oreo", name: "Oreo Cheesecake Cup", description: "Crushed Oreos layered with silky vanilla cheesecake and chocolate crumble.", price: "$45 per dozen", category: "Dessert Cups", image: oreoImg, available: true },
  { id: "jelly", name: "Jelly & Custard Cup", description: "Wobbly strawberry jelly under rich vanilla custard and fresh whipped cream.", price: "$30 per dozen", category: "Dessert Cups", image: jellyImg, available: true },
  { id: "biscoff", name: "Biscoff Cheesecake Cup", description: "Buttery Biscoff base, vanilla cheesecake, and warm caramel drizzle.", price: "$45 per dozen", category: "Dessert Cups", image: biscoffImg, available: true },
  { id: "tiramisu-cup", name: "Tiramisu Cup", description: "Espresso-soaked ladyfingers with mascarpone cream and cocoa dust.", price: "$45 per dozen", category: "Dessert Cups", image: tiramisuImg, available: true },

  { id: "tiramisu-tray", name: "Tiramisu Tray", description: "Classic Italian tiramisu, made-to-order in three sizes.", price: "Small $30 · Medium $35 · Large $40", category: "Loaded Desserts", image: tiramisuImg, available: true },
  { id: "triple-cookie", name: "Triple Chocolate Fudge Cookies", description: "Thick, chewy, loaded with three types of chocolate.", price: "$30 per dozen", category: "Loaded Desserts", image: tripleCookiesImg, available: true },

  { id: "mixed", name: "Mixed Dessert Cup Box", description: "An assortment of our most-loved cup flavours, gift-ready in one box.", price: "$55 per dozen", category: "Gift Boxes", image: mixedImg, available: true },
  { id: "custom-tray", name: "Custom Dessert Tray", description: "Build your own tray — mix brownies, cups and cookies for any occasion.", price: "From $40", category: "Gift Boxes", image: customTrayImg, available: true },

  { id: "choc-chip", name: "Chocolate Chip Cookies", description: "Golden edges, gooey centre, classic chocolate chip done right.", price: "$25 per dozen", category: "Specials", image: cookiesImg, available: true },
  { id: "custom-cookie", name: "Custom Cookies", description: "Tell us your dream flavour and we'll bake it.", price: "From $30 per dozen", category: "Specials", image: cookiesImg, available: true },
];

export const categories = ["All", "Brownies", "Dessert Cups", "Loaded Desserts", "Gift Boxes", "Specials"] as const;
export const menuCategories = ["Brownies", "Dessert Cups", "Loaded Desserts", "Gift Boxes", "Specials"] as const;

export const features = [
  { title: "Freshly Made", text: "Every order is baked the day it's delivered — never frozen, never pre-made." },
  { title: "Premium Ingredients", text: "Real Belgian chocolate, Italian mascarpone, and proper butter. No shortcuts." },
  { title: "Custom Orders", text: "Birthdays, baby showers, weddings — tell us your vision, we'll bake it." },
  { title: "Perfect for Events", text: "Trays, towers and grazing tables that wow guests and travel beautifully." },
  { title: "Local Small Business", text: "Family-run from our home kitchen. Every order supports a small dream." },
  { title: "Beautifully Packaged", text: "Pink ribbon, kraft boxes and a note — gift-ready straight from the door." },
];

export const testimonials = [
  { name: "Aaliyah K.", quote: "The Biscoff cups were GONE in 10 minutes at my baby shower. Already ordered again." },
  { name: "Marcus T.", quote: "Best brownies I've ever tasted. Fudgy, rich, gone too soon." },
  { name: "Priya S.", quote: "Custom tray for my mum's birthday — she actually cried. Thank you!" },
  { name: "Jordan L.", quote: "Reliable, on-time, and the packaging is gorgeous. My go-to dessert spot." },
];

export const gallery = [
  { src: gallery1, alt: "Pink cake stand with mini brownies and tiramisu cups" },
  { src: browniesImg, alt: "Stack of triple chocolate brownies" },
  { src: oreoImg, alt: "Oreo cheesecake cup in a glass jar" },
  { src: gallery3, alt: "Party dessert spread in pink and mint" },
  { src: dubaiImg, alt: "Dubai chocolate brownies with pistachio" },
  { src: mixedImg, alt: "Variety of mixed dessert cups" },
  { src: gallery2, alt: "Close-up of fudgy brownie interior" },
  { src: biscoffImg, alt: "Biscoff cheesecake cup with caramel drizzle" },
  { src: customTrayImg, alt: "Custom dessert tray with pink ribbon" },
];

export const faqs = [
  { q: "How far in advance should I order?", a: "We recommend at least 3 days' notice for standard orders and 7+ days for custom trays. We'll always try to accommodate last-minute requests where possible." },
  { q: "Do you cater for events?", a: "Yes! From small birthdays to large weddings, we can scale our trays and grazing tables to suit. Message us with your guest count for a quote." },
  { q: "Do you offer custom desserts?", a: "Absolutely. Tell us the occasion, colour theme and any dietary needs, and we'll design something just for you." },
  { q: "What payment methods do you accept?", a: "Cash, bank transfer, and major cards on delivery or pickup. A 50% deposit secures custom orders." },
  { q: "Do you deliver?", a: "Yes — local delivery is available citywide. Delivery fee depends on distance and is confirmed at checkout." },
  { q: "Are your desserts suitable for allergies?", a: "All of our desserts are made in a kitchen that handles wheat, dairy, eggs, and nuts. Please let us know about any allergies when ordering." },
];

export const policies = [
  { slug: "privacy", title: "Privacy Policy", body: "We collect only the information you give us — your name, contact details, and order notes — and use it only to fulfil your order and follow up. We never sell or share your data with third parties." },
  { slug: "terms", title: "Terms & Conditions", body: "By placing an order with Dessert Addiction you agree to these terms. Orders are confirmed once payment or deposit is received. Prices may change without notice." },
  { slug: "refunds", title: "Refund Policy", body: "If something isn't right with your order, contact us within 24 hours and we'll make it right — replacement, store credit, or refund depending on the situation." },
  { slug: "cancellation", title: "Cancellation Policy", body: "Standard orders may be cancelled up to 48 hours before the delivery date for a full refund. Custom orders require 7 days' notice; deposits on custom orders are non-refundable inside that window." },
  { slug: "custom-orders", title: "Custom Orders Policy", body: "Custom orders require a 50% non-refundable deposit. Designs are finalised in writing before baking begins. Final products may vary slightly from reference images — that's the charm of handmade." },
];

export const about = {
  story: "Dessert Addiction started in a small home kitchen with one tray of brownies and a long list of friends asking for more. Today we're a family-run dessert boutique baking everything to order — from the cheesecake cups our regulars can't live without to the custom trays that headline weddings and birthdays.",
  owner: "Hi, I'm the baker behind Dessert Addiction. Every recipe is one I've tested at my own kitchen table, and every order leaves our door the same day it's made.",
  mission: "To make every celebration sweeter — with real ingredients, real care, and desserts that taste like they were made for you, because they were.",
  love: "Our customers come back for the fudgy brownies, the silky cheesecake cups, and the little pink ribbon on every box. We think the desserts speak for themselves — but the reviews don't hurt either.",
};
