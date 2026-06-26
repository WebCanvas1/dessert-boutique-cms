import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@tanstack/react-start/server";
import {
  adminSessionConfig,
  passwordMatches,
  type AdminSession,
} from "@/lib/admin-session.server";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expectedUser = process.env.ADMIN_USERNAME;
        const expectedPass = process.env.ADMIN_PASSWORD;
        if (!expectedUser || !expectedPass) {
          return Response.json(
            { ok: false, error: "Admin credentials not configured" },
            { status: 500 },
          );
        }
        let body: { username?: string; password?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }
        const u = (body.username ?? "").toString();
        const p = (body.password ?? "").toString();
        if (!passwordMatches(u, expectedUser) || !passwordMatches(p, expectedPass)) {
          return Response.json(
            { ok: false, error: "Invalid credentials" },
            { status: 401 },
          );
        }
        const session = await useSession<AdminSession>(adminSessionConfig);
        await session.update({ isAdmin: true });
        return Response.json({ ok: true });
      },
    },
  },
});