import { createFileRoute } from "@tanstack/react-router";
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

          return json({
            ok: false,
            error:
              "Image upload via R2 is not supported in this Lovable/TanStack setup. Use direct image URLs or static assets instead.",
          }, 400);
        } catch (error: any) {
          return json({ ok: false, error: error?.message || "Upload failed" }, 500);
        }
      },
    },
  },
});
