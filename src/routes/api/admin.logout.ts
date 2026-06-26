import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@tanstack/react-start/server";
import { adminSessionConfig, type AdminSession } from "@/lib/admin-session.server";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        const session = await useSession<AdminSession>(adminSessionConfig);
        await session.clear();
        return Response.json({ ok: true });
      },
    },
  },
});