// In-memory + KV-backed content store. On Lovable preview / non-Cloudflare
// runtimes the in-memory cache persists for the lifetime of the worker
// instance (it resets on cold start). On Cloudflare with the SITE_CONTENT
// KV binding wired, content persists permanently.

import { defaultContent, type SiteContent } from "./site-content";

const KV_KEY = "site";

// Worker globals — only populated when Cloudflare bindings exist.
type KVNamespace = {
  get: (key: string, type?: "text" | "json") => Promise<string | null | unknown>;
  put: (key: string, value: string) => Promise<void>;
};

function getKV(): KVNamespace | null {
  // Cloudflare exposes bindings as globals (or via env). Try both.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = globalThis as any;
  if (g.SITE_CONTENT && typeof g.SITE_CONTENT.get === "function") return g.SITE_CONTENT;
  return null;
}

let cache: SiteContent | null = null;

export async function readContent(): Promise<SiteContent> {
  if (cache) return cache;
  const kv = getKV();
  if (kv) {
    try {
      const raw = (await kv.get(KV_KEY, "text")) as string | null;
      if (raw) {
        const parsed = JSON.parse(raw) as SiteContent;
        cache = { ...defaultContent, ...parsed };
        return cache;
      }
    } catch (err) {
      console.error("KV read failed", err);
    }
  }
  cache = defaultContent;
  return cache;
}

export async function writeContent(next: SiteContent): Promise<void> {
  cache = next;
  const kv = getKV();
  if (kv) {
    try {
      await kv.put(KV_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("KV write failed", err);
      throw new Error("Failed to persist content to KV");
    }
  }
}