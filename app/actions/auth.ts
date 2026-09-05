"use server";

import { redirect } from "next/navigation";
import { createAdminSession, hasValidAdminCredentials, removeAdminSession } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!hasValidAdminCredentials(email, password)) redirect("/login?error=kredensial-tidak-valid");
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await removeAdminSession();
  redirect("/login");
}
