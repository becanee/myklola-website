"use client";

import { LegalPage } from "@/modules/legal/_comp/legal-page";
import { termsDocument } from "./content";
import { Navigation } from "../landing/navigation";
import { FooterSection } from "../landing/footer-section";

export default function TermsModules() {
  return <>
    <Navigation />
    <LegalPage document={termsDocument} />
    <FooterSection />
  </>
}
