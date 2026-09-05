import { Box, Button, Frame, Line, Placeholder, Tag } from "@/components/wireframes/Wireframe";

export default function BerandaWireframe() {
  return (
    <Frame title="Beranda Publik">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-2xl font-black text-gray-900">BeritaFomo</span>
          <Button variant="dark">Portal Redaksi</Button>
        </div>
        <div className="flex gap-6 border-b border-gray-200 pb-3 text-sm font-semibold text-gray-500">
          <span className="text-gray-900">Terkini</span>
          <span>Teknologi</span>
          <span>Tren & Viral</span>
          <span>Finansial</span>
          <span>Gaya Hidup</span>
          <span>Hiburan</span>
        </div>

        {/* Hero */}
        <Box className="bg-gray-900 p-8">
          <Tag color="orange">Portal Berita</Tag>
          <div className="mt-4 space-y-2">
            <Line className="h-8 w-3/4 bg-gray-300" />
            <Line className="h-8 w-2/3 bg-gray-300" />
          </div>
          <Line className="mt-4 h-4 w-1/2 bg-gray-400" />
        </Box>

        {/* Featured */}
        <Box className="grid gap-6 p-6 md:grid-cols-2">
          <Placeholder label="Featured Image" className="h-48" />
          <div className="space-y-3">
            <Tag color="orange">Teknologi</Tag>
            <Line className="h-6 w-full bg-gray-300" />
            <Line className="h-6 w-4/5 bg-gray-300" />
            <Line className="h-4 w-full bg-gray-200" />
            <Line className="h-4 w-3/4 bg-gray-200" />
            <span className="mt-4 inline-block text-sm font-bold text-orange-600">Baca selengkapnya →</span>
          </div>
        </Box>

        {/* Latest grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">Jangan sampai terlewat</h2>
            <span className="text-sm text-gray-500">5 artikel</span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Box key={i} className="space-y-3 p-4">
                <Placeholder label="Thumb" className="h-24" />
                <Tag color="orange">Kategori</Tag>
                <Line className="h-4 w-full bg-gray-300" />
                <Line className="h-4 w-2/3 bg-gray-300" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Penulis</span>
                  <span>1 Jan 2026</span>
                </div>
              </Box>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-400">
          © 2026 BeritaFomo · Informasi cepat, sumber tetap jelas.
        </div>
      </div>
    </Frame>
  );
}