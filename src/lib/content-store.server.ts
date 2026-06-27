import { defaultContent, type SiteContent } from "./site-content";

const KV_KEY = "site";

type KVNamespace = {
  get: (key: string, type?: "text" | "json") => Promise<string | null | unknown>;
  put: (key: string, value: string) => Promise<void>;
};

function getKV(): KVNamespace | null {
  const g = globalThis as any;

  console.log("GLOBAL KEYS", Object.keys(g));
  console.log("__CF_ENV__", g.__CF_ENV__);
  console.log("SITE_CONTENT", g.SITE_CONTENT);

  const kv =
    g.__CF_ENV__?.SITE_CONTENT ??
    g.SITE_CONTENT ??
    null;

  if (kv) {
    console.log("KV FOUND");
    return kv;
  }

  console.log("KV NOT FOUND");

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

  if (!kv) {
    throw new Error("SITE_CONTENT KV is not configured");
  }

  await kv.put(KV_KEY, JSON.stringify(next));
}
