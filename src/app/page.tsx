import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import { ClientsSection } from "@/modules/landing/clients-section";
import { CtaSection } from "@/modules/landing/cta-section";
import { HeroSection } from "@/modules/landing/hero-section";
import { ProductSections } from "@/modules/landing/product-sections";
import { ServicesSection } from "@/modules/landing/services-section";
import { TeamSection } from "@/modules/landing/team-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klola Indonesia",
  description: "Managing People. Anywhere. Anytime",
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProductSections />
      <TeamSection />
      <ClientsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
