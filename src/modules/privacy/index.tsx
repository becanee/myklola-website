"use client";

import { LegalPage } from "@/modules/legal/_comp/legal-page";
import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import { privacyDocument } from "./content";

export default function PrivacyModules() {
  return (
    <>
      <Navigation />
      <LegalPage document={privacyDocument} />
      <FooterSection />
    </>
  );
}
