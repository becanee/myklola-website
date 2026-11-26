import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import PayrollModules from "@/modules/products/payroll";
import { PRODUCTS } from "@/modules/products/_comp/content";
import type { Metadata } from "next";

const product = PRODUCTS.find((p) => p.slug === "payroll")!;

export const metadata: Metadata = {
  title: product.longName,
  description: product.metaDescription,
  alternates: { canonical: `/products/${product.slug}` },
  openGraph: {
    images: [{ url: product.hero.image, width: 774, height: 678 }],
  },
};

export default function PayrollPage() {
  return (
    <>
      <Navigation />
      <PayrollModules />
      <FooterSection />
    </>
  );
}
