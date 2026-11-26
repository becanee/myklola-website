import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import ProductsOverview from "@/modules/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Empat modul Klola — Core HRIS, Payroll, Performance Management, dan Recruitment+ — berbagi satu catatan kepegawaian.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <Navigation />
      <ProductsOverview />
      <FooterSection />
    </>
  );
}
