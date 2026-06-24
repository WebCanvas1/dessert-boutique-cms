import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/content/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp text-white px-4 py-3 shadow-soft hover:scale-105 transition-transform"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline font-semibold text-sm">WhatsApp</span>
    </a>
  );
}