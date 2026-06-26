import { createFileRoute } from "@tanstack/react-router";
import { isAdmin } from "@/lib/admin-session.server";

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request, context }) => {
        if (!(await isAdmin())) {
          return new Response("Unauthorized", { status: 401 });
        }

        const env = (context as any).env;
        const bucket = env?.SITE_IMAGES;

        if (!bucket) {
          return new Response("R2 bucket not configured", { status: 500 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
          return new Response("No file uploaded", { status: 400 });
        }

        const ext = file.name.split(".").pop() || "jpg";
        const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

        await bucket.put(safeName, file.stream(), {
          httpMetadata: {
            contentType: file.type,
          },
        });

        const url = `/api/image/${safeName}`;

        return Response.json({ ok: true, url });
      },
    },
  },
});
