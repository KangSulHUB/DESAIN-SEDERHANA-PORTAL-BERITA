import Link from "next/link";

export default function Navbar() {
  const categories = [
    { name: "Terkini", href: "/" },
    { name: "Teknologi", href: "/kategori/teknologi" },
    { name: "Tren & Viral", href: "/kategori/tren" },
    { name: "Finansial", href: "/kategori/finansial" },
    { name: "Gaya Hidup", href: "/kategori/gaya-hidup" },
    { name: "Hiburan", href: "/kategori/hiburan" },
  ];

  return (
    <header className="border-b border-orange-100 bg-white sticky top-0 z-50 shadow-sm">
      {/* Baris Atas: Logo, Ticker Tagline, dan Tombol Tulis Berita */}
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-black tracking-tight text-orange-600">
            Berita<span className="text-gray-900">Fomo</span>
          </Link>
          <span className="hidden md:inline-block text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
            Biar Gak Ketinggalan Info
          </span>
        </div>
        <div className="flex items-center gap-3">
            <Link
            href="/admin/upload"
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm shadow-orange-200 flex items-center gap-1.5"
          >
            <span>+</span> Tulis Berita
          </Link>
        </div>
        <Link
            href="/admin/upload"
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm shadow-orange-200 flex items-center gap-1.5"
          >
            <span>+</span> Tulis Berita
          </Link>
        </div>

      {/* Baris Bawah: Navigasi Kategori Berita */}
      <nav className="bg-orange-50/50 border-t border-orange-100/60 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-6 overflow-x-auto py-2.5 text-sm font-medium text-gray-700">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="hover:text-orange-600 transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}