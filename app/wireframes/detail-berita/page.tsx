import { Box, Button, Frame, Line, Placeholder, Tag } from "@/components/wireframes/Wireframe";

export default function DetailBeritaWireframe() {
  return (
    <Frame title="Detail Berita">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-2xl font-black text-gray-900">BeritaFomo</span>
          <Button variant="dark">Portal Redaksi</Button>
        </div>

        {/* Article */}
        <div className="mx-auto max-w-3xl space-y-5">
          <Tag color="orange">Teknologi</Tag>
          <div className="space-y-2">
            <Line className="h-10 w-full bg-gray-300" />
            <Line className="h-10 w-3/4 bg-gray-300" />
          </div>
          <Line className="h-5 w-full bg-gray-200" />
          <div className="flex gap-3 text-sm text-gray-400">
            <span>Oleh Penulis</span>
            <span>•</span>
            <span>1 Januari 2026</span>
          </div>

          {/* Thumbnail */}
          <Placeholder label="Article Thumbnail" className="h-64" />
          <p className="text-xs text-gray-400">Kredit foto / deskripsi gambar</p>

          {/* Content */}
          <div className="space-y-2">
            <Line className="h-4 w-full bg-gray-200" />
            <Line className="h-4 w-full bg-gray-200" />
            <Line className="h-4 w-5/6 bg-gray-200" />
          </div>

          {/* Video */}
          <div>
            <h3 className="mb-2 text-xl font-black text-gray-900">Video terkait</h3>
            <Box className="h-48 bg-gray-900">
              <Placeholder label="Video Player" className="h-full border-gray-600 bg-transparent text-gray-500" />
            </Box>
          </div>

          {/* Source */}
          <Box className="flex items-center justify-between p-4">
            <span className="font-bold text-gray-900">Sumber berita</span>
            <span className="text-sm text-blue-600">sumber.com ↗</span>
          </Box>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-400">
          © 2026 BeritaFomo · Informasi cepat, sumber tetap jelas.
        </div>
      </div>
    </Frame>
  );
}