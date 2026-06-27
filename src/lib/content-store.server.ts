import { defaultContent, type SiteContent } from "./site-content";

const KV_KEY = "site";

type KVNamespace = {
  get: (key: string, type?: "text" | "json") => Promise<string | null | unknown>;
  put: (key: string, value: string) => Promise<void>;
};

let cache: SiteContent | null = null;

async function getKV(): Promise<KVNamespace | null> {
  try {
    const { env } = await import("cloudflare:workers");
    return (env.SITE_CONTENT as KVNamespace | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function readContent(): Promise<SiteContent> {
  if (cache) return cache;

  const kv = await getKV();

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

export async function writeContent(next: SiteContent): Promise<void> {
  cache = next;

  const kv = await getKV();

  if (!kv) {
    throw new Error("SITE_CONTENT KV is not configured");
  }

  await kv.put(KV_KEY, JSON.stringify(next));
}
