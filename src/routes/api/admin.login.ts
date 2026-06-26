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
        const env = (globalThis as any).process?.env ?? {};

        const expectedUser =
          env.ADMIN_USERNAME || (globalThis as any).ADMIN_USERNAME;

        const expectedPass =
          env.ADMIN_PASSWORD || (globalThis as any).ADMIN_PASSWORD;

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
          return Response.json(
            { ok: false, error: "Invalid JSON" },
            { status: 400 },
          );
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
