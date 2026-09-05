import { Box, Button, Frame, Tag } from "@/components/wireframes/Wireframe";

export default function AdminDashboardWireframe() {
  return (
    <Frame title="Dashboard Admin">
      <div className="flex min-h-[600px]">
        {/* Sidebar */}
        <div className="w-64 space-y-4 bg-gray-900 p-5 text-gray-300">
          <span className="text-xl font-black text-white">BeritaFomo CMS</span>
          <div className="space-y-2 pt-6">
            <div className="rounded-lg bg-gray-700 px-3 py-2 text-sm font-semibold text-white">Daftar berita</div>
            <div className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-bold text-white">+ Tulis berita</div>
          </div>
          <div className="mt-auto space-y-2 border-t border-gray-700 pt-4">
            <div className="text-sm">← Lihat situs publik</div>
            <div className="text-sm font-semibold">Keluar</div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 space-y-6 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-orange-600">Dashboard</p>
              <h2 className="text-3xl font-black text-gray-900">Manajemen berita</h2>
              <p className="text-sm text-gray-500">5 artikel dalam sistem.</p>
            </div>
            <Button variant="primary">+ Buat berita</Button>
          </div>

          {/* Table */}
          <Box className="overflow-hidden">
            <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-bold uppercase text-gray-500">
              <span>Berita</span>
              <span>Status</span>
              <span>Diperbarui</span>
              <span className="text-right">Aksi</span>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-4 items-center border-b border-gray-100 px-4 py-4">
                <div>
                  <div className="h-4 w-40 rounded bg-gray-300" />
                  <div className="mt-1 h-3 w-24 rounded bg-gray-200" />
                </div>
                <div>
                  <Tag color={i % 2 === 0 ? "amber" : "green"}>
                    {i % 2 === 0 ? "Draf" : "Terbit"}
                  </Tag>
                </div>
                <span className="text-sm text-gray-400">1 Jan 2026</span>
                <div className="flex justify-end gap-2">
                  <Button variant="blue">Edit</Button>
                  <Button variant="red">Hapus</Button>
                </div>
              </div>
            ))}
          </Box>
        </div>
      </div>
    </Frame>
  );
}