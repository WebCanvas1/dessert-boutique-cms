import { defaultContent, type SiteContent } from "./site-content";

const KV_KEY = "site";

export type KVNamespace = {
  get: (key: string, type?: "text" | "json") => Promise<string | null | unknown>;
  put: (key: string, value: string) => Promise<void>;
};

let cache: SiteContent | null = null;

export async function readContent(kv?: KVNamespace | null): Promise<SiteContent> {
  if (cache) return cache;

  if (kv) {
    const raw = (await kv.get(KV_KEY, "text")) as string | null;

    if (raw) {
      const parsed = JSON.parse(raw) as SiteContent;
      cache = { ...defaultContent, ...parsed };
      return cache;
    }
  }

  cache = defaultContent;
  return cache;
}

export async function writeContent(
  next: SiteContent,
  kv?: KVNamespace | null,
): Promise<void> {
  cache = next;

  if (!kv) {
    throw new Error("SITE_CONTENT KV is not configured");
  }

  await kv.put(KV_KEY, JSON.stringify(next));
}
