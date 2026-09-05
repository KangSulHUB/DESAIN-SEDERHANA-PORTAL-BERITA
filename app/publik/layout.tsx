import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500 bg-white">
        &copy; 2026 BeritaFomo. Hak cipta dilindungi.
      </footer>
    </>
  );
}