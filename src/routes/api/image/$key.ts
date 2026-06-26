import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/image/$key")({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const env = (context as any).env;
        const bucket = env?.SITE_IMAGES;

        if (!bucket) {
          return new Response("R2 bucket not configured", { status: 500 });
        }

        const object = await bucket.get(params.key);

        if (!object) {
          return new Response("Image not found", { status: 404 });
        }

        return new Response(object.body, {
          headers: {
            "content-type":
              object.httpMetadata?.contentType || "application/octet-stream",
            "cache-control": "public, max-age=31536000",
          },
        });
      },
    },
  },
});
