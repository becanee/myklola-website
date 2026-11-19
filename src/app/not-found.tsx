import { NotFoundTerminal } from "@/components/motion/not-found/terminal";
import { Navigation } from "@/modules/landing/navigation";
import { FooterSection } from "@/modules/landing/footer-section";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <NotFoundTerminal
          title="Page not found"
          description="The page you are looking for moved, vanished, or never existed. Let's get you back on track."
          homeHref="/"
          homeLabel="Back home"
          browseHref="/#products"
          browseLabel="See capabilities"
        />
      </main>

      <FooterSection />
    </div>
  );
}
