import { createFileRoute } from "@tanstack/react-router";
import { getWebRequest } from "@tanstack/react-start/server";
import { isAdmin } from "@/lib/admin-session.server";

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          if (!(await isAdmin())) {
            return json({ ok: false, error: "Unauthorized" }, 401);
          }

          const webRequest = getWebRequest();
          const env = (webRequest as any)?.env;
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
