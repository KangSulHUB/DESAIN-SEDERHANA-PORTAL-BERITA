"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function EditBerita() {
  const router = useRouter();
  const params = useParams();
  const idBerita = params.id as string;

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [penulis, setPenulis] = useState("");
  const [konten, setKonten] = useState("");
  const [gambarPreview, setGambarPreview] = useState<string | null>(null);
  const [captionGambar, setCaptionGambar] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sumberLink, setSumberLink] = useState("");

  // Load data berita yang ingin diedit
  useEffect(() => {
    const data = localStorage.getItem("berita_fomo");
    if (data) {
      const list: Berita[] = JSON.parse(data);
      const target = list.find((b) => b.id === idBerita);
      if (target) {
        setJudul(target.judul);
        setKategori(target.kategori);
        setPenulis(target.penulis);
        setKonten(target.konten);
        setGambarPreview(target.gambar || null);
        setCaptionGambar(target.captionGambar || "");
        setVideoUrl(target.videoUrl || "");
        setSumberLink(target.sumberLink || "");
      }
    }
  }, [idBerita]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGambarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = localStorage.getItem("berita_fomo");
    if (!data) return;

    const list: Berita[] = JSON.parse(data);
    const updatedList = list.map((b) => {
      if (b.id === idBerita) {
        return {
          ...b,
          judul,
          kategori,
          penulis,
          konten,
          gambar: gambarPreview || b.gambar,
          captionGambar,
          videoUrl,
          sumberLink,
        };
      }
      return b;
    });

    localStorage.setItem("berita_fomo", JSON.stringify(updatedList));
    router.push("/admin");
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/admin" className="hover:text-orange-600">Dashboard Admin</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Edit Artikel</span>
      </div>

      <div className="bg-white border border-orange-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit Naskah Berita</h1>
        <p className="text-sm text-gray-500 mb-6">Perbarui informasi artikel yang telah dipublikasikan.</p>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Berita</label>
            <input
              type="text"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Teknologi">Teknologi</option>
                <option value="Tren & Viral">Tren & Viral</option>
                <option value="Finansial">Finansial</option>
                <option value="Gaya Hidup">Gaya Hidup</option>
                <option value="Hiburan">Hiburan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Penulis</label>
              <input
                type="text"
                required
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ganti Foto Headline</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Isi Berita</label>
            <textarea
              required
              rows={8}
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/admin"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}