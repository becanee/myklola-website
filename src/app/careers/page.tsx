import CareersModules from "@/modules/careers";
import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Bangun karir Anda dan ciptakan solusi HR terbaik bersama Klola. Lihat posisi karir dan magang yang sedang dibuka.",
};

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <CareersModules />
      <FooterSection />
    </>
  );
}
