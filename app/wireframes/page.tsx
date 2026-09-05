import Link from "next/link";

const list = [
  { href: "/wireframes/beranda", title: "Beranda Publik", desc: "Hero, berita unggulan, daftar artikel terbaru." },
  { href: "/wireframes/kategori", title: "Halaman Kategori", desc: "Daftar artikel berdasarkan rubrik." },
  { href: "/wireframes/detail-berita", title: "Detail Berita", desc: "Konten artikel, video, dan sumber berita." },
  { href: "/wireframes/login", title: "Login Redaksi", desc: "Halaman masuk untuk admin/editor." },
  { href: "/wireframes/admin-dashboard", title: "Dashboard Admin", desc: "Tabel manajemen berita (CRUD)." },
  { href: "/wireframes/admin-tulis-berita", title: "Tulis Berita Baru", desc: "Form pembuatan artikel baru." },
  { href: "/wireframes/admin-edit", title: "Edit Berita", desc: "Form perubahan artikel." },
];

export default function WireframeIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <h1 className="text-3xl font-black text-gray-900">Wireframe Low-Fidelity</h1>
      <p className="mt-2 text-gray-600">7 wireframe setiap fitur utama pada portal berita BeritaFomo.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {list.map((w) => (
          <Link key={w.href} href={w.href} className="block rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 hover:border-orange-400">
            <h2 className="text-xl font-bold text-gray-900">{w.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{w.desc}</p>
            <span className="mt-4 inline-block text-sm font-bold text-orange-600">Lihat wireframe →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}