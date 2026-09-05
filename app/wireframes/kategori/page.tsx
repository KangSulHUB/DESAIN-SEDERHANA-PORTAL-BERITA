import { Box, Frame, Line, Placeholder, Tag } from "@/components/wireframes/Wireframe";

export default function KategoriWireframe() {
  return (
    <Frame title="Halaman Kategori">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-2xl font-black text-gray-900">BeritaFomo</span>
        </div>
        <div className="flex gap-6 border-b border-gray-200 pb-3 text-sm font-semibold text-gray-500">
          <span>Terkini</span>
          <span className="text-gray-900">Teknologi</span>
          <span>Tren & Viral</span>
          <span>Finansial</span>
          <span>Gaya Hidup</span>
          <span>Hiburan</span>
        </div>

        {/* Title */}
        <div>
          <Tag color="orange">Kategori</Tag>
          <h2 className="mt-2 text-4xl font-black text-gray-900">Teknologi</h2>
          <p className="mt-2 text-gray-500">Pilihan berita terbaru dari rubrik Teknologi.</p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i} className="space-y-3 p-4">
              <Placeholder label="Article Image" className="h-32" />
              <Tag color="orange">Teknologi</Tag>
              <Line className="h-4 w-full bg-gray-300" />
              <Line className="h-4 w-4/5 bg-gray-300" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Penulis</span>
                <span>1 Jan 2026</span>
              </div>
            </Box>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-400">
          © 2026 BeritaFomo · Informasi cepat, sumber tetap jelas.
        </div>
      </div>
    </Frame>
  );
}