import AboutModules from "@/modules/about";
import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Klola adalah perusahaan teknologi dengan fokus pada bidang SDM — membantu setiap organisasi mengelola SDM-nya dari mana saja dan kapan saja.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AboutModules />
      <FooterSection />
    </>
  );
}
