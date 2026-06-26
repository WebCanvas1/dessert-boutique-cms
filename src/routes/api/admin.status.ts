import { createFileRoute } from "@tanstack/react-router";
import { isAdmin } from "@/lib/admin-session.server";

export const Route = createFileRoute("/api/admin/status")({
  server: {
    handlers: {
      GET: async () => Response.json({ isAdmin: await isAdmin() }),
    },
  },
});