import type { ReactNode } from "react";

/* Komponen primitif wireframe low-fidelity */

export function Box({ className = "", children }: { className?: string; children?: ReactNode }) {
  return <div className={`rounded-lg border-2 border-gray-300 bg-white ${className}`}>{children}</div>;
}

export function Placeholder({ label = "Gambar", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 text-sm text-gray-400 ${className}`}>
      {label}
    </div>
  );
}

export function Line({ className = "" }: { className?: string }) {
  return <div className={`rounded bg-gray-200 ${className}`} />;
}

export function Tag({ children, color = "gray" }: { children: ReactNode; color?: "gray" | "orange" | "green" | "amber" | "blue" | "red" }) {
  const colors: Record<string, string> = {
    gray: "bg-gray-100 text-gray-600",
    orange: "bg-orange-100 text-orange-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${colors[color]}`}>{children}</span>;
}

export function Button({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "dark" | "outline" | "blue" | "red" }) {
  const styles: Record<string, string> = {
    primary: "bg-gray-800 text-white",
    dark: "bg-gray-900 text-white",
    outline: "border-2 border-gray-300 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
  };
  return <div className={`inline-block rounded-lg px-4 py-2 text-sm font-bold ${styles[variant]}`}>{children}</div>;
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <div className="mb-1.5 text-sm font-semibold text-gray-700">{children}</div>;
}

export function InputBox({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Box className="h-11 px-3 py-2 text-sm text-gray-400">{placeholder || "..."}</Box>
    </div>
  );
}

export function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-400">Wireframe</p>
      <h1 className="mb-6 text-2xl font-black text-gray-900">{title}</h1>
      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-50">{children}</div>
    </div>
  );
}