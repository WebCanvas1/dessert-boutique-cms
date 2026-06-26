import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/image/$key")({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const env = (context as any).env;
        const bucket = env?.SITE_IMAGES;

        if (!bucket) {
          return Response.json(
            { ok: false, error: "R2 bucket SITE_IMAGES is not configured" },
            { status: 500 }
          );
        }

        const object = await bucket.get(params.key);

        if (!object) {
          return Response.json(
            { ok: false, error: "Image not found" },
            { status: 404 }
          );
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        headers.set("cache-control", "public, max-age=31536000");

        return new Response(object.body, { headers });
      },
    },
  },
});
