"use client";

import { LegalPage } from "@/modules/legal/_comp/legal-page";
import { privacyDocument } from "./content";
import { Navigation } from "../landing/navigation";
import { FooterSection } from "../landing/footer-section";

export default function PrivacyModules() {
  return <>
    <Navigation />
      <LegalPage document={privacyDocument} />
    <FooterSection />
  </>
}
