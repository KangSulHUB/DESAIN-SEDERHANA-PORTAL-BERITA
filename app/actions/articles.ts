"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createArticle, deleteArticle, updateArticle } from "@/lib/articles";
import { isAdmin } from "@/lib/auth";
import { CATEGORIES, type ArticleInput, type Category } from "@/types/article";

const field = (formData: FormData, name: string) => String(formData.get(name) || "").trim();

function isHttpUrl(value: string) {
  if (!value) return true;
  try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; }
}

function readArticleInput(formData: FormData): ArticleInput {
  const input = {
    title: field(formData, "title"), description: field(formData, "description"), content: field(formData, "content"),
    category: field(formData, "category"), author: field(formData, "author"), thumbnailUrl: field(formData, "thumbnailUrl"),
    thumbnailAlt: field(formData, "thumbnailAlt"), sourceUrl: field(formData, "sourceUrl"), sourceName: field(formData, "sourceName"),
    videoUrl: field(formData, "videoUrl"), status: field(formData, "status"),
  };
  if (input.title.length < 8 || input.title.length > 160) throw new Error("Judul harus terdiri dari 8–160 karakter.");
  if (input.description.length < 20 || input.description.length > 300) throw new Error("Deskripsi harus terdiri dari 20–300 karakter.");
  if (input.content.length < 50) throw new Error("Isi berita minimal 50 karakter.");
  if (input.author.length < 2 || input.author.length > 80) throw new Error("Nama penulis tidak valid.");
  if (!CATEGORIES.includes(input.category as Category)) throw new Error("Kategori tidak valid.");
  if (input.status !== "published" && input.status !== "draft") throw new Error("Status tidak valid.");
  if (![input.thumbnailUrl, input.sourceUrl, input.videoUrl].every(isHttpUrl)) throw new Error("URL harus menggunakan http:// atau https://.");
  if (input.thumbnailUrl && !input.thumbnailAlt) throw new Error("Alt thumbnail wajib diisi bila thumbnail digunakan.");
  if (input.sourceUrl && !input.sourceName) throw new Error("Nama sumber wajib diisi bila tautan sumber digunakan.");
  return { ...input, category: input.category as Category, status: input.status as "published" | "draft" };
}

async function requireAdmin() { if (!(await isAdmin())) redirect("/login"); }
function revalidateArticleRoutes() { revalidatePath("/"); revalidatePath("/admin"); revalidatePath("/kategori/[slug]", "page"); revalidatePath("/berita/[slug]", "page"); }

export async function createArticleAction(formData: FormData) { await requireAdmin(); await createArticle(readArticleInput(formData)); revalidateArticleRoutes(); redirect("/admin"); }
export async function updateArticleAction(id: string, formData: FormData) { await requireAdmin(); const article = await updateArticle(id, readArticleInput(formData)); if (!article) redirect("/admin"); revalidateArticleRoutes(); redirect("/admin"); }
export async function deleteArticleAction(id: string) { await requireAdmin(); await deleteArticle(id); revalidateArticleRoutes(); }
