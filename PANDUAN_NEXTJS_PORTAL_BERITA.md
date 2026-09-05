# Panduan pengembangan Portal Berita dengan Next.js

Dokumen ini adalah acuan kerja untuk `portal-berita`. Proyek memakai **Next.js 16**, **React 19**, **TypeScript**, App Router, ESLint, dan Tailwind CSS 4. Tujuannya adalah membuat portal berita yang cepat, mudah dirawat, aman, dan siap berkembang dari prototipe menjadi CMS produksi.

## Prinsip arsitektur

Gunakan **App Router** sebagai satu-satunya sistem routing. Folder di dalam `app/` membentuk URL, sedangkan `page.tsx` membuat URL dapat diakses. `layout.tsx` dipakai untuk UI bersama. Jadikan komponen sebagai **Server Component** secara default; tambahkan `'use client'` hanya untuk interaksi browser seperti state formulir, event klik, `localStorage`, atau API browser.

| Prinsip | Kegunaan |
| --- | --- |
| Server-first | JavaScript ke browser lebih kecil; query database dan secret tetap di server. |
| Route berdasarkan fitur | Halaman publik, artikel, dan CMS jelas terpisah dan mudah dikembangkan tim. |
| Satu sumber data | Artikel disimpan serta divalidasi di server/basis data, bukan tersebar dalam state atau `localStorage`. |
| TypeScript ketat | Kesalahan bentuk data artikel terdeteksi sebelum produksi. |
| Komponen kecil | Tampilan dapat dipakai ulang dan mudah diuji. |

## Struktur yang direkomendasikan

Route group dengan tanda kurung hanya mengelompokkan file dan **tidak** muncul pada URL.

```text
app/
  (public)/
    layout.tsx                  # Navbar dan footer publik
    page.tsx                    # URL: /
    kategori/[slug]/page.tsx    # URL: /kategori/:slug
    berita/[slug]/page.tsx      # URL: /berita/:slug
    loading.tsx                 # Skeleton halaman publik
    not-found.tsx               # 404 artikel/kategori
  (dashboard)/
    admin/
      layout.tsx                # Sidebar dan proteksi area admin
      page.tsx                  # URL: /admin
      berita/baru/page.tsx      # URL: /admin/berita/baru
      berita/[id]/edit/page.tsx # URL: /admin/berita/:id/edit
  api/upload/route.ts           # Endpoint unggah, bila diperlukan
  actions/berita.ts             # Server Actions create/update/delete
  globals.css
  layout.tsx                    # Root layout, font, metadata global
components/
  berita/                       # ArticleCard, ArticleForm, ArticleList
  layout/                       # Navbar, Footer, AdminSidebar
lib/
  berita.ts                     # Query data/repository
  validation.ts                 # Skema validasi input
  utils.ts
types/berita.ts                 # Tipe Article, Category, dan DTO
public/images/                  # Aset statis yang memang disimpan di repo
```

Jangan membuat folder `publik` hanya untuk membungkus halaman karena `app/publik/layout.tsx` menghasilkan layout untuk URL `/publik`, bukan `/`. Gunakan `(public)` bila tujuannya pengelompokan. Dashboard harus berada di `app/admin/page.tsx`; rute edit harus konsisten sebagai `app/admin/berita/[id]/edit/page.tsx` agar semua tautan dan layout admin cocok.

## Audit kondisi proyek saat ini

| Temuan | Dampak | Perbaikan yang benar |
| --- | --- | --- |
| `app/page.tsx` berisi dashboard admin | URL `/` bukan halaman publik. | Jadikan sebagai beranda publik dan pindahkan dashboard ke `app/admin/page.tsx`. |
| `app/publik/layout.tsx` tidak membungkus `/` | Navbar/footer publik tidak tampil pada beranda. | Ganti dengan route group `(public)`. |
| Tautan edit menuju `/admin/edit/:id`, tetapi file berada di `/edit/[id]` | Tombol Edit menuju 404. | Gunakan satu URL: `/admin/berita/:id/edit`. |
| `Navbar.tsx` memiliki tombol “Tulis Berita” ganda | Antarmuka desktop menampilkan aksi yang sama dua kali. | Sisakan satu tombol dalam container aksi header. |
| CRUD serta gambar memakai `localStorage`/Data URL | Data hanya ada di satu browser, kapasitas kecil, tidak aman untuk CMS. | Gunakan database, penyimpanan objek, autentikasi, dan otorisasi. |
| `<img>` digunakan untuk gambar konten | Tidak memperoleh optimasi gambar Next.js. | Gunakan `next/image`, ukuran eksplisit, dan konfigurasi host remote tepercaya. |

`localStorage` hanya layak sebagai mock/prototipe lokal; jangan menyimpan gambar base64 di dalamnya untuk produksi.

## Langkah implementasi yang benar

1. **Pastikan baseline bersih.** Jalankan `npm.cmd run lint` lalu `npm.cmd run build`. Perbaiki error sebelum menambah fitur. Pada PowerShell komputer ini gunakan `npm.cmd`, karena kebijakan eksekusi dapat memblokir `npm.ps1`.
2. **Rapikan route dan layout.** Terapkan struktur di atas. Verifikasi setiap `Link`; navbar/footer hanya di publik dan sidebar hanya di `/admin`.
3. **Definisikan model data.** Buat `types/berita.ts`: `Article` berisi id, slug, title, excerpt, content, categoryId, authorId, coverImageUrl, publishedAt, dan status. Hindari `interface Berita` berulang di banyak page.
4. **Tambahkan validasi di server.** Validasi judul, slug, kategori, isi, URL, MIME, dan ukuran berkas sebelum menyimpan. Validasi HTML di browser hanya membantu pengalaman pengguna, bukan proteksi utama.
5. **Pilih lapisan data.** Untuk produksi, gunakan database relasional dan ORM yang disepakati tim (misalnya PostgreSQL + Prisma/Drizzle). Simpan query di `lib/berita.ts`, bukan di komponen UI. Buat migrasi dan seed kategori/data awal.
6. **Gunakan Server Actions untuk mutasi.** Action membuat/mengubah/menghapus artikel, memeriksa sesi dan role editor, menyimpan data, lalu memanggil `revalidatePath` atau `revalidateTag`. Client Component hanya untuk preview gambar atau state interaktif.
7. **Tangani media dengan layanan penyimpanan.** Unggah melalui endpoint/layanan tervalidasi, simpan URL dan kredit foto di database, lalu tampilkan dengan `next/image`. Jangan menaruh unggahan pengguna langsung di `public/` pada deployment serverless.
8. **Tambahkan autentikasi dan otorisasi.** Lindungi `/admin/*` di layout/proxy. Bedakan pembaca, penulis, editor, dan admin; cek izin lagi pada setiap Server Action/Route Handler.
9. **Lengkapi UX dan SEO.** Tambahkan `loading.tsx`, `error.tsx`, `not-found.tsx`, metadata per artikel, `sitemap.ts`, `robots.ts`, dan Open Graph image. Gunakan slug stabil.
10. **Uji dan rilis.** Uji unit validasi/lib, integrasi action/API, serta E2E alur editor. CI minimal menjalankan lint dan build sebelum deploy.

## Batas Server dan Client Component

| Kebutuhan | Tempat yang tepat | Alasan |
| --- | --- | --- |
| Mengambil artikel, metadata, kategori | Server Component atau `lib/` | Bisa memakai database tanpa mengirim kredensial ke browser. |
| Render daftar/kartu tanpa event | Server Component | Bundle browser lebih kecil. |
| Preview file dan input terkontrol | Client Component kecil | Memerlukan `FileReader`, `useState`, dan event browser. |
| Membuat/mengubah/menghapus artikel | Server Action | Validasi, role, dan mutasi berada di server. |
| Webhook/unggahan | Route Handler (`route.ts`) | Endpoint HTTP jelas dan dapat diverifikasi. |

Direktif `'use client'` memasukkan seluruh subtree impor ke bundle browser. Letakkan pada komponen interaktif paling kecil, bukan pada `page.tsx` atau layout jika tidak diperlukan.

## Konfigurasi, keamanan, dan kualitas

- Simpan rahasia di `.env.local`; jangan commit. Variabel tanpa `NEXT_PUBLIC_` hanya di server; variabel dengan awalan tersebut masuk ke bundle browser.
- Buat `.env.example` tanpa nilai rahasia, misalnya `DATABASE_URL=`, `AUTH_SECRET=`, `STORAGE_BUCKET=`.
- Sanitasi rich text sebelum ditampilkan. Batasi ukuran/MIME gambar, buat nama objek di server, dan jangan percaya URL atau role dari klien.
- Gunakan `Link` untuk navigasi internal, `Image` untuk gambar, `Metadata` untuk SEO, dan alias `@/` untuk impor internal.
- Gunakan ESLint yang telah tersedia. Tambahkan formatter yang konsisten bila disepakati tim. Jangan menaikkan Next.js/React tanpa menjalankan pemeriksaan.

## Rutinitas kerja

```powershell
npm.cmd install       # memasang dependensi sesuai package-lock.json
npm.cmd run dev       # server pengembangan lokal
npm.cmd run lint      # pemeriksaan aturan kode
npm.cmd run build     # type check dan build produksi
npm.cmd run start     # menjalankan hasil build produksi
```

## Konfigurasi CMS lokal

Salin `.env.example` menjadi `.env.local`, lalu isi `ADMIN_EMAIL`, `ADMIN_PASSWORD`, dan `AUTH_SECRET` dengan nilai unik. Login tersedia di `/login`; setelah berhasil masuk, dashboard backend tersedia di `/admin`. Artikel pada implementasi ini disimpan di `data/articles.json` agar dapat langsung dijalankan secara lokal. Untuk deployment multi-instance/produksi, ganti implementasi `lib/articles.ts` dengan database terkelola dan penyimpanan gambar terpisah.

Urutan kerja fitur: ubah tipe dan validasi, implementasikan repository/action di server, buat UI Server Component, isolasi interaksi ke Client Component, tambahkan state loading/error/empty, kemudian jalankan lint dan build. Buat pull request kecil dengan penjelasan route, model data, dampak keamanan, dan cara menguji.

## Checklist sebelum merge/deploy

- [ ] URL, `Link`, page, dan layout konsisten.
- [ ] Tidak ada secret, token, atau data pengguna di repo/bundle klien.
- [ ] Semua input dan unggahan divalidasi di server.
- [ ] Halaman publik tidak bergantung pada `localStorage`.
- [ ] Ada 404, loading, dan penanganan error yang relevan.
- [ ] Metadata artikel, alt gambar, serta heading semantik tersedia.
- [ ] `npm.cmd run lint` dan `npm.cmd run build` lulus.
- [ ] Migrasi database dan environment didokumentasikan.

## Referensi lokal Next.js 16

Panduan versi yang benar tersedia di `node_modules/next/dist/docs/01-app/`: `01-getting-started/02-project-structure.md`, `01-getting-started/03-layouts-and-pages.md`, `01-getting-started/05-server-and-client-components.md`, `01-getting-started/10-error-handling.md`, `01-getting-started/12-images.md`, serta `02-guides/environment-variables.md`.
