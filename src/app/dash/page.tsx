import { LogoutButton } from "@/modules/auth/_comp/logout-button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// TODO(auth): render real user data once the login API route lands.
export default function DashPage() {
  return (
    <div className="min-h-svh bg-background">
      <header className="flex items-center justify-between border-b border-foreground/10 px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-blue.png" alt="Klola" className="w-14" />
        </Link>
        <LogoutButton />
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-foreground/30" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Dashboard
          </span>
        </div>

        <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-foreground">
          Selamat datang
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Halaman terproteksi. Proxy memverifikasi sesi sebelum halaman ini
          dirender.
        </p>
      </main>
    </div>
  );
}