import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { Article, ArticleInput } from "@/types/article";

const databasePath = path.join(process.cwd(), "data", "articles.json");

async function readArticles(): Promise<Article[]> {
  const file = await fs.readFile(databasePath, "utf8");
  return JSON.parse(file) as Article[];
}

async function writeArticles(articles: Article[]) {
  const temporaryPath = `${databasePath}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(articles, null, 2), "utf8");
  await fs.rename(temporaryPath, databasePath);
}

function createSlug(title: string, existingArticles: Article[], currentId?: string) {
  const base = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "artikel";
  let slug = base;
  let sequence = 2;

  while (existingArticles.some((article) => article.slug === slug && article.id !== currentId)) {
    slug = `${base}-${sequence++}`;
  }

  return slug;
}

export async function getPublishedArticles() {
  const articles = await readArticles();
  return articles
    .filter((article) => article.status === "published")
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function getAllArticles() {
  const articles = await readArticles();
  return articles.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

export async function getArticleBySlug(slug: string) {
  return (await getPublishedArticles()).find((article) => article.slug === slug);
}

export async function getArticleById(id: string) {
  return (await readArticles()).find((article) => article.id === id);
}

export async function createArticle(input: ArticleInput) {
  const articles = await readArticles();
  const now = new Date().toISOString();
  const article: Article = {
    ...input,
    id: crypto.randomUUID(),
    slug: createSlug(input.title, articles),
    publishedAt: now,
    updatedAt: now,
  };
  await writeArticles([article, ...articles]);
  return article;
}

export async function updateArticle(id: string, input: ArticleInput) {
  const articles = await readArticles();
  const current = articles.find((article) => article.id === id);
  if (!current) return null;

  const updated: Article = {
    ...current,
    ...input,
    slug: createSlug(input.title, articles, id),
    updatedAt: new Date().toISOString(),
  };
  await writeArticles(articles.map((article) => (article.id === id ? updated : article)));
  return updated;
}

export async function deleteArticle(id: string) {
  const articles = await readArticles();
  await writeArticles(articles.filter((article) => article.id !== id));
}
