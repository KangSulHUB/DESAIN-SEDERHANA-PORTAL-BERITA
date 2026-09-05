import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Admin Backend */}
      <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <span className="font-bold text-white tracking-wider">PANEL CMS</span>
            <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded font-mono">
              v1.0
            </span>
          </div>

          <nav className="p-4 space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-gray-800 transition"
            >
              <span className="text-orange-500">●</span> Dashboard Berita
            </Link>
            <Link
              href="/admin/upload"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <span className="text-green-500">+</span> Tulis Berita
            </Link>
          </nav>
        </div>

        {/* Tautan kembali ke website publik */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            className="block text-center text-xs font-semibold py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
          >
            &larr; Ke Halaman Depan
          </Link>
        </div>
      </aside>

      {/* Area Konten CRUD Admin */}
      <section className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Ruang Kerja Redaksi</h2>
          <span className="text-xs text-gray-500">Editor Aktif: <strong>Admin Redaksi</strong></span>
        </header>
        <div className="p-6">
          {children}
        </div>
      </section>
    </div>
  );
}