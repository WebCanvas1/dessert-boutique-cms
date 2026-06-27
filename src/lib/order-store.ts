// Tiny client-side store for the homepage order form. Product cards push
// items; the order form subscribes. No external state library required.

import { useEffect, useState } from "react";

export type OrderItem = { name: string; quantity: number };

const KEY = "da-order-items";
const EVENT = "da-order-items-change";

function read(): OrderItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OrderItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: OrderItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addOrderItem(name: string) {
  const items = read();
  const existing = items.find((i) => i.name === name);
  if (existing) existing.quantity += 1;
  else items.push({ name, quantity: 1 });
  write(items);
  // Smooth scroll to the form
  if (typeof document !== "undefined") {
    const el = document.getElementById("order");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function setOrderItems(items: OrderItem[]) {
  write(items);
}

export function clearOrderItems() {
  write([]);
}

export function useOrderItems(): OrderItem[] {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    clearOrderItems();

    const handler = () => setItems(read());

    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return items;
}
