import CompanyModules from "@/modules/company";
import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perusahaan",
  description:
    "Tentang Klola, klien yang kami layani, dan posisi yang sedang kami buka — dalam satu halaman.",
};

export default function CompanyPage() {
  return (
    <>
      <Navigation />
      <CompanyModules />
      <FooterSection />
    </>
  );
}
