import Link from "next/link";
import { createArticleAction } from "@/app/actions/articles";
import { ArticleForm } from "@/components/articles/ArticleForm";

export default function NewArticlePage() { return <><Link href="/admin" className="text-sm font-semibold text-orange-600 hover:text-orange-700">← Kembali ke daftar</Link><h1 className="mt-3 text-3xl font-black text-slate-950">Tulis berita baru</h1><p className="mt-1 text-slate-600">Lengkapi konten, sumber, thumbnail, dan video terkait.</p><div className="mt-8 max-w-3xl"><ArticleForm action={createArticleAction} /></div></>; }
