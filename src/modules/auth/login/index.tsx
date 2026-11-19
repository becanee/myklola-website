import Link from "next/link";
import { LoginBanner } from "./_comp/banner";
import { LoginForm } from "./_comp/form";

export default function LoginModules() {
  return (
    <div className="relative grid min-h-svh grid-cols-1 bg-background lg:grid-cols-2">
      {/* Left — brand banner. Collapses to a short strip on mobile. */}
      <div className="relative flex min-h-[300px] min-w-0 lg:min-h-svh">
        <LoginBanner />
      </div>

      {/* Right — form. `min-w-0` keeps the grid track from sizing to the
          form's max-content width on narrow screens. */}
      <div className="relative flex min-w-0 flex-col">
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
          <Link
            href="/"
            className="text-sm text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← Back to home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-14 pt-4 sm:px-10 lg:px-14">
          <LoginForm />
        </main>

        <footer className="hidden px-6 pb-8 text-xs text-muted-foreground lg:block lg:px-14">
          © 2026 PT. Klola Indonesia. All rights reserved.
        </footer>
      </div>
    </div>
  );
}