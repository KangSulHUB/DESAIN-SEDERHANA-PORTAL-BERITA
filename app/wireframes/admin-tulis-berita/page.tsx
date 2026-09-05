import { Box, Button, FieldLabel, Frame, Tag } from "@/components/wireframes/Wireframe";

export default function TulisBeritaWireframe() {
  return (
    <Frame title="Tulis Berita Baru">
      <div className="flex min-h-[600px]">
        {/* Sidebar */}
        <div className="w-64 space-y-4 bg-gray-900 p-5 text-gray-300">
          <span className="text-xl font-black text-white">BeritaFomo CMS</span>
          <div className="space-y-2 pt-6">
            <div className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-800">Daftar berita</div>
            <div className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-bold text-white">+ Tulis berita</div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 space-y-6 p-8">
          <div className="text-sm font-semibold text-orange-600">← Kembali ke daftar</div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">Tulis berita baru</h2>
            <p className="text-sm text-gray-500">Lengkapi konten, sumber, thumbnail, dan video terkait.</p>
          </div>

          {/* Form */}
          <Box className="max-w-3xl space-y-6 p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <FieldLabel>Judul berita</FieldLabel>
                <Box className="h-11 px-3 py-2 text-sm text-gray-400">Masukkan judul...</Box>
              </div>
              <div>
                <FieldLabel>Penulis</FieldLabel>
                <Box className="h-11 px-3 py-2 text-sm text-gray-400">Nama penulis...</Box>
              </div>
            </div>
            <div>
              <FieldLabel>Deskripsi singkat</FieldLabel>
              <Box className="h-20 px-3 py-2 text-sm text-gray-400">Ringkasan untuk kartu artikel dan SEO...</Box>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <FieldLabel>Kategori</FieldLabel>
                <Box className="h-11 px-3 py-2 text-sm text-gray-400">Teknologi ▾</Box>
              </div>
              <div>
                <FieldLabel>Status</FieldLabel>
                <Box className="h-11 px-3 py-2 text-sm text-gray-400">Terbit ▾</Box>
              </div>
            </div>

            {/* Thumbnail */}
            <Box className="space-y-3 border-l-4 border-orange-400 p-4">
              <Tag color="orange">Thumbnail artikel</Tag>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>URL gambar</FieldLabel>
                  <Box className="h-11 px-3 py-2 text-sm text-gray-400">https://...</Box>
                </div>
                <div>
                  <FieldLabel>Alt text gambar</FieldLabel>
                  <Box className="h-11 px-3 py-2 text-sm text-gray-400">Deskripsikan gambar...</Box>
                </div>
              </div>
            </Box>

            {/* Source */}
            <Box className="space-y-3 border-l-4 border-blue-400 p-4">
              <Tag color="blue">Sumber berita</Tag>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Nama sumber</FieldLabel>
                  <Box className="h-11 px-3 py-2 text-sm text-gray-400">Kompas.com</Box>
                </div>
                <div>
                  <FieldLabel>Link sumber</FieldLabel>
                  <Box className="h-11 px-3 py-2 text-sm text-gray-400">https://...</Box>
                </div>
              </div>
            </Box>

            {/* Video */}
            <Box className="space-y-3 border-l-4 border-red-400 p-4">
              <Tag color="red">Video</Tag>
              <div>
                <FieldLabel>Link YouTube atau Vimeo</FieldLabel>
                <Box className="h-11 px-3 py-2 text-sm text-gray-400">https://youtube.com/watch?v=...</Box>
              </div>
            </Box>

            {/* Content */}
            <div>
              <FieldLabel>Isi berita</FieldLabel>
              <Box className="h-40 px-3 py-2 text-sm text-gray-400">Tuliskan naskah berita lengkap...</Box>
            </div>

            <div className="flex justify-end">
              <Button variant="primary">Buat berita</Button>
            </div>
          </Box>
        </div>
      </div>
    </Frame>
  );
}