import { createFileRoute } from "@tanstack/react-router";
import {
  readContent,
  writeContent,
  type KVNamespace,
} from "@/lib/content-store.server";
import { isAdmin } from "@/lib/admin-session.server";
import type { SiteContent } from "@/lib/site-content";

function getKV(context: unknown): KVNamespace | null {
  const c = context as any;

  return (
    c?.cloudflare?.env?.SITE_CONTENT ||
    c?.env?.SITE_CONTENT ||
    c?.platform?.env?.SITE_CONTENT ||
    c?.event?.context?.cloudflare?.env?.SITE_CONTENT ||
    c?.event?.context?.env?.SITE_CONTENT ||
    null
  );
}

export const Route = createFileRoute("/api/content")({
  server: {
    handlers: {
      GET: async ({ context }) => {
        try {
          const content = await readContent(getKV(context));
          return Response.json(content);
        } catch (e: any) {
          return Response.json(
            { ok: false, error: e?.message || "Failed to load content" },
            { status: 500 },
          );
        }
      },

      POST: async ({ request, context }) => {
        try {
          if (!(await isAdmin())) {
            return Response.json(
              { ok: false, error: "Unauthorized" },
              { status: 401 },
            );
          }

          let body: SiteContent;

          try {
            body = (await request.json()) as SiteContent;
          } catch {
            return Response.json(
              { ok: false, error: "Invalid JSON" },
              { status: 400 },
            );
          }

          if (
            !body ||
            typeof body !== "object" ||
            !Array.isArray((body as any).menu)
          ) {
            return Response.json(
              { ok: false, error: "Invalid content shape" },
              { status: 400 },
            );
          }

          await writeContent(body, getKV(context));

          return Response.json({ ok: true });
        } catch (e: any) {
          return Response.json(
            {
              ok: false,
              error: e?.message || "Unknown server error",
              name: e?.name || "Error",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
