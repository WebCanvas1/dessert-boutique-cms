import { createFileRoute } from "@tanstack/react-router";
import { isAdmin } from "@/lib/admin-session.server";

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {import { createFileRoute } from "@tanstack/react-router";
import { isAdmin } from "@/lib/admin-session.server";

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request, context }) => {
        try {
          if (!(await isAdmin())) {
            return json({ ok: false, error: "Unauthorized" }, 401);
          }

          const env = (context as any)?.env || (globalThis as any).__CF_ENV__;
          const kv = env?.SITE_CONTENT;

          if (!kv) {
            return json({ ok: false, error: "SITE_CONTENT KV is not configured" }, 500);
          }

          const formData = await request.formData();
          const file = formData.get("file") as File | null;

          if (!file) {
            return json({ ok: false, error: "No file uploaded" }, 400);
          }

          const buffer = await file.arrayBuffer();
          const base64 = btoa(
            String.fromCharCode(...new Uint8Array(buffer))
          );

          const dataUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

          return json({
            ok: true,
            url: dataUrl,
          });
        } catch (error: any) {
          return json({ ok: false, error: error?.message || "Image upload failed" }, 500);
        }
      },
    },
  },
});
          if (!(await isAdmin())) {
            return json({ ok: false, error: "Unauthorized" }, 401);
          }

          const env = (globalThis as any).__CF_ENV__;
          const bucket = env?.SITE_IMAGES;

          if (!bucket) {
            return json(
              {
                ok: false,
                error: "R2 bucket SITE_IMAGES is not configured",
                availableEnvKeys: env ? Object.keys(env) : [],
              },
              500
            );
          }

          const formData = await request.formData();
          const file = formData.get("file") as File | null;

          if (!file) {
            return json({ ok: false, error: "No file uploaded" }, 400);
          }

          const ext = file.name.split(".").pop() || "jpg";
          const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

          await bucket.put(safeName, file.stream(), {
            httpMetadata: {
              contentType: file.type || "image/jpeg",
            },
          });

          return json({
            ok: true,
            url: `/api/image/${safeName}`,
          });
        } catch (error: any) {
          return json(
            {
              ok: false,
              error: error?.message || "Image upload failed",
            },
            500
          );
        }
      },
    },
  },
});
