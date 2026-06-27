const KV_KEY = "site";

export const onRequestGet = async ({ env }: any) => {
  const raw = await env.SITE_CONTENT?.get(KV_KEY, "text");

  if (!raw) {
    return fetch("https://dessert-boutique-cms.pages.dev/api/content");
  }

  return new Response(raw, {
    headers: { "content-type": "application/json" },
  });
};

export const onRequestPost = async ({ request, env }: any) => {
  const kv = env.SITE_CONTENT;

  if (!kv) {
    return Response.json(
      { ok: false, error: "SITE_CONTENT KV is not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();

  await kv.put(KV_KEY, body);

  return Response.json({ ok: true });
};
