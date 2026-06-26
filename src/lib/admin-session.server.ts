import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

export type AdminSession = { isAdmin?: boolean };

export const adminSessionConfig = {
  password: "8f9c2a71b5e84f30a91d7e4f63b28a9c5e1f7d94a6b8c3d2",
  name: "da-admin",
  maxAge: 60 * 60 * 24 * 7,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
};

export function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

export type AdminSession = { isAdmin?: boolean };

const env = (globalThis as any).process?.env ?? {};

export const adminSessionConfig = {
  password:
    env.SESSION_SECRET ||
    (globalThis as any).SESSION_SECRET ||
    "fallback-dev-secret-please-set-SESSION_SECRET-env",
  name: "da-admin",
  maxAge: 60 * 60 * 24 * 7,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
};

export function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const session = await useSession<AdminSession>(adminSessionConfig);
  return session.data.isAdmin === true;
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Response("Unauthorized", { status: 401 });
  }
}
  return timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const session = await useSession<AdminSession>(adminSessionConfig);
  return session.data.isAdmin === true;
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Response("Unauthorized", { status: 401 });
  }
}
