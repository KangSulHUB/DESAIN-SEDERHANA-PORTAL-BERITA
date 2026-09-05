import Link from "next/link";
import { notFound } from "next/navigation";
import { updateArticleAction } from "@/app/actions/articles";
import { ArticleForm } from "@/components/articles/ArticleForm";
import { getArticleById } from "@/lib/articles";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const article = await getArticleById(id); if (!article) notFound(); const updateWithId = updateArticleAction.bind(null, article.id); return <><Link href="/admin" className="text-sm font-semibold text-orange-600 hover:text-orange-700">← Kembali ke daftar</Link><h1 className="mt-3 text-3xl font-black text-slate-950">Edit berita</h1><p className="mt-1 text-slate-600">Perubahan akan langsung terlihat setelah artikel disimpan dan diterbitkan.</p><div className="mt-8 max-w-3xl"><ArticleForm article={article} action={updateWithId} /></div></>; }
