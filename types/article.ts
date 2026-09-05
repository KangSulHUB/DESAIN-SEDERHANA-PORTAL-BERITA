export const CATEGORIES = [
  "Teknologi",
  "Tren & Viral",
  "Finansial",
  "Gaya Hidup",
  "Hiburan",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const categoryToSlug = (category: string) => category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-");

export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: Category;
  author: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  sourceUrl: string;
  sourceName: string;
  videoUrl: string;
  status: "published" | "draft";
  publishedAt: string;
  updatedAt: string;
};

export type ArticleInput = Omit<Article, "id" | "slug" | "publishedAt" | "updatedAt">;
