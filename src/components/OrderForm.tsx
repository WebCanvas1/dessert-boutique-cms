import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  clearOrderItems,
  setOrderItems,
  useOrderItems,
  type OrderItem,
} from "@/lib/order-store";

type Props = {
  heading?: string;
  subtitle?: string;
  termsLabel?: string;
  submitLabel?: string;
};

export function OrderForm({
  heading = "Place an order",
  subtitle = "Tell us what you'd like and we'll be in touch to confirm pricing, pickup or delivery.",
  termsLabel = "I agree to the Terms & Conditions.",
  submitLabel = "Submit Order",
}: Props) {
  const items = useOrderItems();
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    fulfilment: "Pickup" as "Pickup" | "Delivery",
    dateRequired: "",
    notes: "",
  });

  function updateItem(idx: number, patch: Partial<OrderItem>) {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    setOrderItems(next);
  }
  function removeItem(idx: number) {
    setOrderItems(items.filter((_, i) => i !== idx));
  }
  function addBlankItem() {
    setOrderItems([...items, { name: "", quantity: 1 }]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions to continue.");
      return;
    }
    const cleanItems = items
      .map((i) => ({ name: i.name.trim(), quantity: Number(i.quantity) || 1 }))
      .filter((i) => i.name.length > 0);
    if (cleanItems.length === 0) {
      toast.error("Please add at least one product to your order.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cleanItems,
          agreedToTerms: true,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Submission failed");
      }
      toast.success("Order received! We'll be in touch shortly.");
      clearOrderItems();
      setAgreed(false);
      setForm({
        customerName: "",
        phone: "",
        email: "",
        fulfilment: "Pickup",
        dateRequired: "",
        notes: "",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-cream px-4 py-3 text-chocolate placeholder:text-chocolate-soft/60 focus:outline-none focus:ring-2 focus:ring-pink";

  return (
    <section id="order" className="bg-pink-soft py-16 scroll-mt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="script text-3xl text-chocolate-soft">order enquiry</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chocolate">{heading}</h2>
          <p className="mt-3 text-chocolate-soft max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-card border border-border shadow-soft p-6 sm:p-8 grid gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-chocolate">Customer name</span>
              <input
                required
                className={inputCls + " mt-1"}
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-chocolate">Phone number</span>
              <input
                required
                className={inputCls + " mt-1"}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold text-chocolate">Email address</span>
              <input
                required
                type="email"
                className={inputCls + " mt-1"}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-chocolate">Pickup / Delivery</span>
              <select
                className={inputCls + " mt-1"}
                value={form.fulfilment}
                onChange={(e) =>
                  setForm({ ...form, fulfilment: e.target.value as "Pickup" | "Delivery" })
                }
              >
                <option>Pickup</option>
                <option>Delivery</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-chocolate">Date required</span>
              <input
                required
                type="date"
                className={inputCls + " mt-1"}
                value={form.dateRequired}
                onChange={(e) => setForm({ ...form, dateRequired: e.target.value })}
              />
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-chocolate">Products ordered</span>
              <button
                type="button"
                onClick={addBlankItem}
                className="inline-flex items-center gap-1 text-sm text-chocolate-soft hover:text-chocolate"
              >
                <Plus size={14} /> Add item
              </button>
            </div>
            {items.length === 0 && (
              <p className="text-sm text-chocolate-soft italic mb-2">
                Click "Order" on any menu item above to add it, or add manually.
              </p>
            )}
            <div className="grid gap-2">
              {items.map((it, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    placeholder="Product name"
                    className={inputCls + " flex-1"}
                    value={it.name}
                    onChange={(e) => updateItem(idx, { name: e.target.value })}
                  />
                  <input
                    type="number"
                    min={1}
                    className={inputCls + " w-24"}
                    value={it.quantity}
                    onChange={(e) =>
                      updateItem(idx, { quantity: Math.max(1, Number(e.target.value) || 1) })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    aria-label="Remove"
                    className="h-12 w-12 rounded-xl border border-border bg-cream flex items-center justify-center text-chocolate-soft hover:bg-pink-soft"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-chocolate">Additional notes</span>
            <textarea
              rows={4}
              className={inputCls + " mt-1"}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Allergies, dietary needs, occasion, design preferences…"
            />
          </label>

          <label className="flex items-start gap-3 text-sm text-chocolate">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 accent-pink"
              required
            />
            <span>
              {termsLabel}{" "}
              <Link to="/policies" className="underline hover:text-pink">
                Read here
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex justify-center items-center rounded-full bg-chocolate-soft text-cream px-6 py-3 font-semibold shadow-soft hover:bg-chocolate transition disabled:opacity-60"
          >
            {submitting ? "Submitting…" : submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}