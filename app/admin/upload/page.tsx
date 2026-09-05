"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadBerita() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [penulis, setPenulis] = useState("");
  const [konten, setKonten] = useState("");
  const [gambarPreview, setGambarPreview] = useState<string | null>(null);
  const [captionGambar, setCaptionGambar] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sumberLink, setSumberLink] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const beritaBaru = {
      id: Date.now().toString(),
      judul,
      kategori,
      penulis,
      konten,
      gambar: gambarPreview,
      captionGambar,
      videoUrl,
      sumberLink,
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Ambil data lama dari localStorage, lalu tambahkan berita baru di paling atas
    const beritaLama = JSON.parse(localStorage.getItem("berita_fomo") || "[]");
    const updateBerita = [beritaBaru, ...beritaLama];
    localStorage.setItem("berita_fomo", JSON.stringify(updateBerita));

    // Arahkan otomatis ke halaman Beranda untuk melihat hasilnya
    router.push("/");
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-600">Beranda</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Panel Redaksi</span>
      </div>

      <div className="bg-white border border-orange-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Editor Berita Multimedia</h1>
        <p className="text-sm text-gray-500 mb-6">
          Isi data berita di bawah ini. Setelah disimpan, artikel akan otomatis muncul di halaman depan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Judul Utama Berita
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: AI Generatif Makin Populer di Kalangan Developer..."
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Kategori Rubrik
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="Teknologi">Teknologi</option>
                <option value="Tren & Viral">Tren & Viral</option>
                <option value="Finansial">Finansial</option>
                <option value="Gaya Hidup">Gaya Hidup</option>
                <option value="Hiburan">Hiburan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nama Penulis / Editor
              </label>
              <input
                type="text"
                required
                placeholder="Nama Anda"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
          </div>

          {/* Foto Headline */}
          <div className="p-4 bg-orange-50/40 border border-orange-100 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-gray-800">Foto Utama (Headline Image)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Kredit foto / Sumber gambar"
                  value={captionGambar}
                  onChange={(e) => setCaptionGambar(e.target.value)}
                  className="mt-3 w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
                />
              </div>

              <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                {gambarPreview ? (
                  <img src={gambarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400">Pratinjau foto akan tampil di sini</span>
                )}
              </div>
            </div>
          </div>

          {/* Video URL & Sumber Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                URL Video (Opsional)
              </label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tautan Sumber (Opsional)
              </label>
              <input
                type="url"
                placeholder="https://sumber-berita.com"
                value={sumberLink}
                onChange={(e) => setSumberLink(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
          </div>

          {/* Isi Berita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Isi Paragraf Berita
            </label>
            <textarea
              required
              rows={8}
              placeholder="Tuliskan naskah berita lengkap..."
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm leading-relaxed"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href="/" className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">
              Batal
            </Link>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition shadow-sm shadow-orange-200"
            >
              Publikasikan Berita
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}