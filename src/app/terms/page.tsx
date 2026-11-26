import TermsModules from "@/modules/terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of Service for myklola HRMS, operated by Klola Indonesia.",
};

export default function TermsCondsPage() {
  return <TermsModules />;
}
