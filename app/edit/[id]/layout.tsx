import { redirect } from "next/navigation";

export default function LegacyEditLayout({ children: _children }: { children: React.ReactNode }) {
  redirect("/admin");
}
