import type { ReactNode } from "react";
import Link from "next/link";

const wireframes = [
  { href: "/wireframes/beranda", label: "1. Beranda" },
  { href: "/wireframes/kategori", label: "2. Kategori" },
  { href: "/wireframes/detail-berita", label: "3. Detail Berita" },
  { href: "/wireframes/login", label: "4. Login" },
  { href: "/wireframes/admin-dashboard", label: "5. Admin Dashboard" },
  { href: "/wireframes/admin-tulis-berita", label: "6. Tulis Berita" },
  { href: "/wireframes/admin-edit", label: "7. Edit Berita" },
];

export default function WireframeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 border-b border-gray-300 bg-gray-900 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-lg font-bold text-white">Wireframe Low-Fidelity · BeritaFomo</h1>
          <nav className="flex flex-wrap gap-2">
            {wireframes.map((w) => (
              <Link
                key={w.href}
                href={w.href}
                className="rounded-md bg-gray-700 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-gray-600"
              >
                {w.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  );
}