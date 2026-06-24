import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { business, whatsappUrl } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dessert Addiction" },
      { name: "description", content: "Get in touch with Dessert Addiction. Call, email, message on WhatsApp, or send an enquiry through our contact form." },
      { property: "og:title", content: "Contact — Dessert Addiction" },
      { property: "og:description", content: "Phone, email, WhatsApp and enquiry form for Dessert Addiction." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Status = "idle" | "sending" | "ok" | "error";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    // Web3Forms integration. Admin: set business.web3formsKey in src/content/site.ts.
    data.append("access_key", business.web3formsKey);
    data.append("subject", `New enquiry from ${data.get("name") || "website"}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again or message us on WhatsApp.");
    }
  }

  return (
    <>
      <PageHeader eyebrow="say hello" title="Let's bake something sweet" subtitle="Use the form for enquiries, or message us directly — we usually reply within a few hours." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-8">
        {/* Contact info */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft space-y-4">
            <InfoRow icon={<Phone size={18} />} label="Phone" value={business.phone} href={`tel:${business.phone}`} />
            <InfoRow icon={<Mail size={18} />} label="Email" value={business.email} href={`mailto:${business.email}`} />
            <InfoRow icon={<MapPin size={18} />} label="Location" value={business.address} />
            <InfoRow icon={<MapPin size={18} />} label="Service areas" value={business.serviceAreas} />
            <InfoRow icon={<Clock size={18} />} label="Hours" value={business.hours} />
          </div>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="block text-center rounded-full bg-whatsapp text-white px-6 py-4 font-semibold shadow-soft hover:opacity-90">
            Message us on WhatsApp
          </a>
          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-display text-lg text-chocolate mb-3">Follow us</h3>
            <div className="flex gap-3">
              <a href={business.social.instagram} aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full bg-pink text-white"><Instagram size={18} /></a>
              <a href={business.social.facebook} aria-label="Facebook" className="h-10 w-10 grid place-items-center rounded-full bg-pink text-white"><Facebook size={18} /></a>
              <a href={business.social.tiktok} aria-label="TikTok" className="h-10 w-10 grid place-items-center rounded-full bg-pink text-white font-bold text-xs">TT</a>
              <a href={business.social.pinterest} aria-label="Pinterest" className="h-10 w-10 grid place-items-center rounded-full bg-pink text-white font-bold text-xs">P</a>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-soft space-y-4">
          <h2 className="font-display text-2xl text-chocolate">Send an enquiry</h2>
          {/* Honeypot */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <Field label="Name" name="name" required maxLength={100} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" required maxLength={120} />
            <Field label="Phone" name="phone" type="tel" required maxLength={30} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <SelectField label="Order type" name="order_type" options={["Dessert Cups", "Brownies", "Dessert Trays", "Cookies", "Custom Order", "Event Catering"]} />
            <Field label="Preferred date" name="preferred_date" type="date" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-chocolate mb-1">Message</label>
            <textarea name="message" required maxLength={1000} rows={4} className="w-full rounded-xl border border-input bg-mint px-3 py-2 text-chocolate placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink" placeholder="Tell us about your order..." />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex justify-center items-center rounded-full bg-pink text-white px-6 py-3 font-semibold shadow-pink hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </button>
          {status === "ok" && <p className="text-center text-sm text-whatsapp font-semibold">Thank you! We'll get back to you shortly.</p>}
          {status === "error" && <p className="text-center text-sm text-destructive font-semibold">{error}</p>}
        </form>
      </div>
    </>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="h-9 w-9 grid place-items-center rounded-full bg-pink-soft text-pink shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-base text-chocolate font-medium break-words">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80">{content}</a> : content;
}

function Field({ label, name, type = "text", required, maxLength }: { label: string; name: string; type?: string; required?: boolean; maxLength?: number }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-chocolate mb-1">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl border border-input bg-mint px-3 py-2 text-chocolate placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-chocolate mb-1">{label}</label>
      <select name={name} className="w-full rounded-xl border border-input bg-mint px-3 py-2 text-chocolate focus:outline-none focus:ring-2 focus:ring-pink">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}