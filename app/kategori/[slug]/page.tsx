import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPublishedArticles } from "@/lib/articles";
import { CATEGORIES, categoryToSlug } from "@/types/article";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const category = CATEGORIES.find((item) => categoryToSlug(item) === slug); if (!category) notFound(); const articles = (await getPublishedArticles()).filter((article) => article.category === category); return <><Navbar /><main className="mx-auto max-w-6xl px-4 py-10"><p className="text-sm font-bold uppercase tracking-wider text-orange-600">Kategori</p><h1 className="mt-1 text-4xl font-black text-slate-950">{category}</h1><p className="mt-3 text-slate-600">Pilihan berita terbaru dari rubrik {category}.</p><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <ArticleCard key={article.id} article={article} />)}</div>{articles.length === 0 && <p className="mt-8 rounded-xl bg-white p-8 text-slate-500">Belum ada artikel pada kategori ini.</p>}</main><Footer /></>; }
