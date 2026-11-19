import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import ContactModules from "@/modules/contacts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Managing People. Anywhere. Anytime",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Spacer for fixed nav */}
      <div className="h-24 sm:h-28" />

      <ContactModules />

      <FooterSection />
    </div>
  );
}