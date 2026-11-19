import { LogoutButton } from "@/modules/auth/_comp/logout-button";
import { getPostbaseSession } from "@/services/postbase/server-session";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashPage() {
  const session = await getPostbaseSession();

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
          Selamat datang{session?.user?.email ? "," : ""}{" "}
          <span className="text-foreground/50">{session?.user?.email}</span>
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Halaman terproteksi. Proxy memverifikasi sesi sebelum halaman ini
          dirender.
        </p>

        <dl className="mt-12 grid gap-px bg-foreground/10 border border-foreground/10 sm:grid-cols-3">
          {[
            { k: "Status", v: session ? "Authenticated" : "No session" },
            { k: "User ID", v: session?.user?.id?.slice(0, 8) ?? "—" },
            { k: "Expires", v: session?.expiresAt
              ? new Date(session.expiresAt * 1000).toLocaleDateString("id-ID")
              : "—" },
          ].map((row) => (
            <div key={row.k} className="bg-background p-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {row.k}
              </dt>
              <dd className="mt-2 font-mono text-sm text-foreground">{row.v}</dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  );
}