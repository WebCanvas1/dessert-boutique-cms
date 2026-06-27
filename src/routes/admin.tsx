import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, ArrowUp, ArrowDown, LogOut } from "lucide-react";
import type { SiteContent, SiteProduct } from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Dessert Addiction" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Tab =
  | "branding"
  | "hero"
  | "about"
  | "menu"
  | "gallery"
  | "reviews"
  | "contact"
  | "whatsapp"
  | "social"
  | "faq"
  | "policies"
  | "orderForm";

const TABS: { id: Tab; label: string }[] = [
  { id: "branding", label: "Branding" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "social", label: "Social" },
  { id: "faq", label: "FAQ" },
  { id: "policies", label: "Policies" },
  { id: "orderForm", label: "Order Form" },
];

function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => r.json())
      .then((d: { isAdmin: boolean }) => setAuthed(d.isAdmin))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading…</div>;
  }

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  return <Dashboard onLogout={() => setAuthed(false)} />;
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) throw new Error(data.error ?? "Login failed");

      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl bg-card border border-border shadow-soft p-8 grid gap-4"
      >
        <h1 className="font-display text-2xl text-chocolate text-center">
          Admin Login
        </h1>

        <input
          required
          placeholder="Username"
          className="w-full rounded-xl border border-border bg-cream px-4 py-3"
          value={u}
          onChange={(e) => setU(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-border bg-cream px-4 py-3"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />

        <button
          disabled={busy}
          className="rounded-full bg-chocolate-soft text-cream px-6 py-3 font-semibold hover:bg-chocolate transition disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>("branding");

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: SiteContent) => setContent(d))
      .catch(() => toast.error("Failed to load content"));
  }, []);

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    if (!content) return;
    setContent({ ...content, [key]: value });
    setDirty(true);
  }

  async function save() {
  if (!content) return;

  setSaving(true);

  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || data?.ok === false) {
      throw new Error(data?.error || "Save failed");
    }

    toast.success("Saved");
    setDirty(false);
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Save failed");
  } finally {
    setSaving(false);
  }
}

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    onLogout();
  }

  if (!content) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-3xl text-chocolate">
          Admin Dashboard
        </h1>

        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="rounded-full bg-chocolate-soft text-cream px-5 py-2 font-semibold hover:bg-chocolate transition disabled:opacity-50"
          >
            {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </button>

          <button
            onClick={logout}
            className="rounded-full bg-cream text-chocolate border border-border px-4 py-2 font-semibold inline-flex items-center gap-2"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${
              tab === t.id
                ? "bg-pink text-white"
                : "bg-cream text-chocolate hover:bg-pink-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-card border border-border shadow-soft p-6 sm:p-8">
        {tab === "branding" && (
          <Fields
            obj={content.branding}
            onChange={(v) => update("branding", v)}
            schema={[
              ["name", "Business name", "text"],
              ["fullName", "Full name", "text"],
              ["tagline", "Tagline", "textarea"],
              ["logo", "Logo URL", "text"],
            ]}
          />
        )}

        {tab === "hero" && (
          <Fields
            obj={content.hero}
            onChange={(v) => update("hero", v)}
            schema={[
              ["eyebrow", "Eyebrow", "text"],
              ["title", "Title", "text"],
              ["subtitle", "Subtitle", "textarea"],
              ["primaryButtonText", "Primary button text", "text"],
              ["secondaryButtonText", "Secondary button text", "text"],
              ["image", "Hero image URL", "text"],
            ]}
          />
        )}

        {tab === "about" && (
          <Fields
            obj={content.about}
            onChange={(v) => update("about", v)}
            schema={[
              ["heading", "Heading", "text"],
              ["story", "Story", "textarea"],
              ["owner", "Owner note", "textarea"],
              ["mission", "Mission", "textarea"],
              ["image", "About image URL", "text"],
            ]}
          />
        )}

        {tab === "menu" && (
          <MenuEditor items={content.menu} onChange={(v) => update("menu", v)} />
        )}

        {tab === "gallery" && (
          <ListEditor
            items={content.gallery}
            onChange={(v) => update("gallery", v)}
            blank={() => ({ src: "", alt: "" })}
            fields={[
              ["src", "Image URL", "text"],
              ["alt", "Caption / alt text", "text"],
            ]}
            title="Gallery"
          />
        )}

        {tab === "reviews" && (
          <ListEditor
            items={content.reviews}
            onChange={(v) => update("reviews", v)}
            blank={() => ({ name: "", quote: "", rating: 5 })}
            fields={[
              ["name", "Name", "text"],
              ["quote", "Quote", "textarea"],
              ["rating", "Rating (1-5)", "number"],
            ]}
            title="Reviews"
          />
        )}

        {tab === "contact" && (
          <Fields
            obj={content.contact}
            onChange={(v) => update("contact", v)}
            schema={[
              ["phone", "Phone", "text"],
              ["email", "Email", "text"],
              ["address", "Address", "text"],
              ["serviceAreas", "Service / delivery areas", "text"],
              ["hours", "Opening hours", "text"],
            ]}
          />
        )}

        {tab === "whatsapp" && (
          <Fields
            obj={content.whatsapp}
            onChange={(v) => update("whatsapp", v)}
            schema={[
              ["number", "WhatsApp number (international, no +)", "text"],
              ["message", "Default message", "textarea"],
            ]}
          />
        )}

        {tab === "social" && (
          <Fields
            obj={content.social}
            onChange={(v) => update("social", v)}
            schema={[
              ["instagram", "Instagram URL", "text"],
              ["facebook", "Facebook URL", "text"],
              ["tiktok", "TikTok URL", "text"],
              ["pinterest", "Pinterest URL", "text"],
            ]}
          />
        )}

        {tab === "faq" && (
          <ListEditor
            items={content.faqs}
            onChange={(v) => update("faqs", v)}
            blank={() => ({ q: "", a: "" })}
            fields={[
              ["q", "Question", "text"],
              ["a", "Answer", "textarea"],
            ]}
            title="FAQs"
          />
        )}

        {tab === "policies" && (
          <ListEditor
            items={content.policies}
            onChange={(v) => update("policies", v)}
            blank={() => ({ slug: "", title: "", body: "" })}
            fields={[
              ["slug", "Slug", "text"],
              ["title", "Title", "text"],
              ["body", "Body", "textarea"],
            ]}
            title="Policies"
          />
        )}

        {tab === "orderForm" && (
          <Fields
            obj={content.orderForm}
            onChange={(v) => update("orderForm", v)}
            schema={[
              ["heading", "Heading", "text"],
              ["subtitle", "Subtitle", "textarea"],
              ["termsLabel", "Terms checkbox label", "text"],
              ["submitLabel", "Submit button label", "text"],
              ["destinationEmail", "Destination email", "text"],
            ]}
          />
        )}
      </div>
    </div>
  );
}

type FieldKind = "text" | "textarea" | "number" | "checkbox";

function Fields<T extends Record<string, unknown>>({
  obj,
  onChange,
  schema,
}: {
  obj: T;
  onChange: (v: T) => void;
  schema: [keyof T & string, string, FieldKind][];
}) {
  function set(k: keyof T, v: unknown) {
    onChange({ ...obj, [k]: v });
  }

  return (
    <div className="grid gap-4">
      {schema.map(([key, label, kind]) => (
        <label key={key} className="block">
          <span className="text-sm font-semibold text-chocolate">{label}</span>

          {kind === "textarea" ? (
            <textarea
              rows={3}
              className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-2"
              value={String(obj[key] ?? "")}
              onChange={(e) => set(key, e.target.value)}
            />
          ) : kind === "checkbox" ? (
            <div className="mt-2">
              <input
                type="checkbox"
                className="h-5 w-5 accent-pink"
                checked={Boolean(obj[key])}
                onChange={(e) => set(key, e.target.checked)}
              />
            </div>
          ) : kind === "number" ? (
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-2"
              value={String(obj[key] ?? "")}
              onChange={(e) => set(key, Number(e.target.value))}
            />
          ) : (
            <div className="grid gap-2">
              <input
                className="mt-1 w-full rounded-xl border border-border bg-cream px-4 py-2"
                value={String(obj[key] ?? "")}
                onChange={(e) => set(key, e.target.value)}
              />

              {(key === "logo" || key === "image") && (
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    try {
                      const url = await uploadImage(file);
                      set(key, url);
                      toast.success("Image uploaded. Click Save changes.");
                    } catch (err) {
                      toast.error(
                        err instanceof Error ? err.message : "Upload failed",
                      );
                    }
                  }}
                />
              )}
            </div>
          )}
        </label>
      ))}
    </div>
  );
}

function ListEditor<T extends Record<string, unknown>>({
  items,
  onChange,
  blank,
  fields,
  title,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  blank: () => T;
  fields: [keyof T & string, string, FieldKind][];
  title: string;
}) {
  function update(i: number, k: keyof T, v: unknown) {
    const next = [...items];
    next[i] = { ...next[i], [k]: v };
    onChange(next);
  }

  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;

    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-chocolate">{title}</h2>

        <button
          type="button"
          onClick={() => onChange([...items, blank()])}
          className="inline-flex items-center gap-1 rounded-full bg-pink text-white px-3 py-1.5 text-sm font-semibold"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border p-4 bg-cream/40 grid gap-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-chocolate-soft font-semibold">
              #{i + 1}
            </span>

            <div className="flex gap-1">
              <IconBtn onClick={() => move(i, -1)} aria="Move up">
                <ArrowUp size={14} />
              </IconBtn>

              <IconBtn onClick={() => move(i, 1)} aria="Move down">
                <ArrowDown size={14} />
              </IconBtn>

              <IconBtn onClick={() => remove(i)} aria="Delete" danger>
                <Trash2 size={14} />
              </IconBtn>
            </div>
          </div>

          {fields.map(([k, label, kind]) =>
            kind === "textarea" ? (
              <label key={k} className="block">
                <span className="text-xs font-semibold text-chocolate">
                  {label}
                </span>
                <textarea
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2"
                  value={String(item[k] ?? "")}
                  onChange={(e) => update(i, k, e.target.value)}
                />
              </label>
            ) : kind === "checkbox" ? (
              <label key={k} className="block">
                <span className="text-xs font-semibold text-chocolate">
                  {label}
                </span>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-pink"
                    checked={Boolean(item[k])}
                    onChange={(e) => update(i, k, e.target.checked)}
                  />
                </div>
              </label>
            ) : (
              <label key={k} className="block">
                <span className="text-xs font-semibold text-chocolate">
                  {label}
                </span>

                <div className="grid gap-2">
                  <input
                    type={kind === "number" ? "number" : "text"}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2"
                    value={String(item[k] ?? "")}
                    onChange={(e) =>
                      update(
                        i,
                        k,
                        kind === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                      )
                    }
                  />

                  {(k === "image" || k === "src") && (
                    <input
                      type="file"
                      accept="image/*"
                      className="text-sm"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        try {
                          const url = await uploadImage(file);
                          update(i, k, url);
                          toast.success("Image uploaded. Click Save changes.");
                        } catch (err) {
                          toast.error(
                            err instanceof Error
                              ? err.message
                              : "Upload failed",
                          );
                        }
                      }}
                    />
                  )}
                </div>
              </label>
            ),
          )}
        </div>
      ))}
    </div>
  );
}
function MenuEditor({
  items,
  onChange,
}: {
  items: SiteProduct[];
  onChange: (next: SiteProduct[]) => void;
}) {
  return (
    <ListEditor
      items={items as unknown as Record<string, unknown>[]}
      onChange={(v) => onChange(v as unknown as SiteProduct[])}
      blank={() =>
        ({
          id: crypto.randomUUID(),
          name: "",
          description: "",
          price: "",
          category: "Brownies",
          image: "",
          available: true,
        }) as unknown as Record<string, unknown>
      }
      title="Menu items"
      fields={[
        ["name", "Name", "text"],
        ["description", "Description", "textarea"],
        ["price", "Price", "text"],
        ["category", "Category", "text"],
        ["image", "Image URL", "text"],
        ["available", "Available", "checkbox"],
      ]}
    />
  );
}
async function uploadImage(file: File): Promise<string> {
  const maxWidth = 400;
  const quality = 0.40;

  const imageUrl = URL.createObjectURL(file);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imageUrl;
    });

    const scale = Math.min(1, maxWidth / img.width);
    const width = Math.round(img.width * scale);
    const height = Math.round(img.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not process image");
    }

    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}
function IconBtn({
  children,
  onClick,
  aria,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  aria: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className={`h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border ${
        danger ? "bg-pink-soft text-chocolate" : "bg-card text-chocolate-soft"
      } hover:bg-pink-soft`}
    >
      {children}
    </button>
  );
}
