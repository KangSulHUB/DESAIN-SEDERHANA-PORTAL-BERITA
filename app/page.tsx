/* Legacy localStorage dashboard retained below only as historical reference.

import { useEffect, useState } from "react";
import Link from "next/link";

interface Berita {
  id: string;
  judul: string;
  kategori: string;
  penulis: string;
  konten: string;
  gambar?: string;
  captionGambar?: string;
  videoUrl?: string;
  sumberLink?: string;
  tanggal: string;
}

export default function AdminDashboard() {
  const [daftarBerita, setDaftarBerita] = useState<Berita[]>([]);

  // READ: Ambil semua data dari storage
  const loadBerita = () => {
    const data = localStorage.getItem("berita_fomo");
    if (data) {
      setDaftarBerita(JSON.parse(data));
    } else {
      setDaftarBerita([]);
    }
  };

  useEffect(() => {
    loadBerita();
  }, []);

  // DELETE: Hapus berita berdasarkan ID
  const handleDelete = (id: string, judul: string) => {
    const konfirmasi = window.confirm(`Yakin ingin menghapus berita: "${judul}"?`);
    if (!konfirmasi) return;

    const dataBaru = daftarBerita.filter((item) => item.id !== id);
    localStorage.setItem("berita_fomo", JSON.stringify(dataBaru));
    setDaftarBerita(dataBaru);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      // Header Dashboard
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
              Panel Admin
            </span>
            <h1 className="text-xl font-black text-gray-900">Manajemen Berita</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Total {daftarBerita.length} artikel terdaftar dalam sistem BeritaFomo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs font-semibold px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Lihat Web Publik
          </Link>
          <Link
            href="/admin/upload"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm shadow-orange-200"
          >
            + Tulis Berita Baru
          </Link>
        </div>
      </div>

      // Tabel CRUD (READ, UPDATE, DELETE)
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-orange-50/50 border-b border-orange-100 text-xs text-gray-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Media</th>
                <th className="py-3 px-4">Judul & Ringkasan</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {daftarBerita.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                    Belum ada data berita di sistem.
                  </td>
                </tr>
              ) : (
                daftarBerita.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50/30 transition">
                    <td className="py-3 px-4">
                      {item.gambar ? (
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 text-[10px] text-gray-400 flex items-center justify-center text-center p-1">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold text-gray-900 truncate">{item.judul}</p>
                      <p className="text-xs text-gray-500 truncate">{item.konten}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-gray-600">{item.penulis}</td>
                    <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{item.tanggal}</td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        // UPDATE Button
                        <Link
                          href={`/admin/edit/${item.id}`}
                          className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        >
                          Edit
                        </Link>
                        // DELETE Button
                        <button
                          onClick={() => handleDelete(item.id, item.judul)}
                          className="text-xs font-semibold px-2.5 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
*/

import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPublishedArticles } from "@/lib/articles";

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const [featured, ...rest] = articles;
  return <><Navbar /><div className="mx-auto max-w-6xl px-4 py-10"><section className="rounded-3xl bg-slate-950 px-6 py-12 text-white sm:px-12"><p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">Portal Berita</p><h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Berita yang mudah dibaca, dengan sumber yang selalu bisa ditelusuri.</h1><p className="mt-5 max-w-2xl text-slate-300">Ikuti teknologi, tren, finansial, gaya hidup, dan hiburan dari redaksi BeritaFomo.</p></section>{featured ? <section className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-[1.1fr_1fr]"><div className="aspect-video rounded-xl bg-gradient-to-br from-orange-200 to-amber-50">{featured.thumbnailUrl ? <img className="h-full w-full rounded-xl object-cover" src={featured.thumbnailUrl} alt={featured.thumbnailAlt} /> : <div className="flex h-full items-center justify-center text-7xl">📰</div>}</div><div className="self-center"><p className="text-sm font-bold text-orange-600">{featured.category}</p><h2 className="mt-2 text-3xl font-black leading-tight text-slate-950"><Link href={`/berita/${featured.slug}`} className="hover:text-orange-600">{featured.title}</Link></h2><p className="mt-4 leading-7 text-slate-600">{featured.description}</p><Link href={`/berita/${featured.slug}`} className="mt-6 inline-block font-bold text-orange-600 hover:text-orange-700">Baca selengkapnya →</Link></div></section> : <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">Belum ada berita yang diterbitkan.</div>}<section className="mt-12"><div className="mb-5 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-wider text-orange-600">Terbaru</p><h2 className="text-3xl font-black text-slate-950">Jangan sampai terlewat</h2></div><span className="text-sm text-slate-500">{articles.length} artikel</span></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rest.map((article) => <ArticleCard key={article.id} article={article} />)}</div></section></div><Footer /></>;
}
