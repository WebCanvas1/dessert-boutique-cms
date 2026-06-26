import { createFileRoute } from "@tanstack/react-router";
import { readContent, writeContent } from "@/lib/content-store.server";
import { isAdmin } from "@/lib/admin-session.server";
import type { SiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/api/content")({
  server: {
    handlers: {
      GET: async () => {
        const content = await readContent();
        return Response.json(content);
      },

      POST: async ({ request }) => {
        if (!(await isAdmin())) {
          return new Response("Unauthorized", { status: 401 });
        }

        let body: SiteContent;

        try {
          body = (await request.json()) as SiteContent;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        if (!body || typeof body !== "object") {
          return new Response("Invalid content shape", { status: 400 });
        }

       if (!body || typeof body !== "object" || !Array.isArray((body as any).menu)) {
  return new Response("Invalid content shape", { status: 400 });
}

        await writeContent(body);

        return Response.json({ ok: true });
      },
    },
  },
});
