import { createFileRoute } from "@tanstack/react-router";
import { MenuSection } from "@/components/MenuSection";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Dessert Addiction" },
      { name: "description", content: "Explore our full menu of dessert cups, brownies, dessert trays, cookies and custom orders. Prices and descriptions for every item." },
      { property: "og:title", content: "Menu — Dessert Addiction" },
      { property: "og:description", content: "Dessert cups, brownies, trays and cookies — see prices and order on WhatsApp." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  return <MenuSection />;
}
