import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_NAME = "beritafomo_admin";
const sessionSecret = process.env.AUTH_SECRET || "ganti-auth-secret-sebelum-produksi";
const adminEmail = process.env.ADMIN_EMAIL || "admin@beritafomo.local";
const adminPassword = process.env.ADMIN_PASSWORD || "ubah-password-anda";

function signature(value: string) {
  return createHmac("sha256", sessionSecret).update(value).digest("base64url");
}

function encodeSession(email: string) {
  const value = Buffer.from(email).toString("base64url");
  return `${value}.${signature(value)}`;
}

function validSession(value?: string) {
  if (!value) return false;
  const [email, receivedSignature] = value.split(".");
  if (!email || !receivedSignature) return false;
  const expectedSignature = signature(email);
  if (receivedSignature.length !== expectedSignature.length) return false;
  return timingSafeEqual(Buffer.from(receivedSignature), Buffer.from(expectedSignature));
}

export function hasValidAdminCredentials(email: string, password: string) {
  return email === adminEmail && password === adminPassword;
}

export async function isAdmin() {
  const session = (await cookies()).get(SESSION_NAME)?.value;
  return validSession(session);
}

export async function createAdminSession() {
  (await cookies()).set(SESSION_NAME, encodeSession(adminEmail), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
}

export async function removeAdminSession() {
  (await cookies()).delete(SESSION_NAME);
}
