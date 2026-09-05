import Link from "next/link";
import { CATEGORIES, categoryToSlug } from "@/types/article";

export function Navbar() {
  return <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"><Link href="/" className="text-2xl font-black tracking-tight text-orange-600">Berita<span className="text-slate-950">Fomo</span></Link><Link href="/admin" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Portal Redaksi</Link></div><nav aria-label="Kategori berita" className="border-t border-orange-100 bg-orange-50/60"><div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold text-slate-600"><Link href="/" className="whitespace-nowrap hover:text-orange-600">Terkini</Link>{CATEGORIES.map((category) => <Link key={category} href={`/kategori/${categoryToSlug(category)}`} className="whitespace-nowrap hover:text-orange-600">{category}</Link>)}</div></nav></header>;
}
