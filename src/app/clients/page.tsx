import ClientsModules from "@/modules/clients";
import { FooterSection } from "@/modules/landing/footer-section";
import { Navigation } from "@/modules/landing/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Dipercaya lebih dari 20 perusahaan di Indonesia — Klola membantu efisiensi dan efektivitas pengelolaan SDM di berbagai industri.",
};

export default function ClientsPage() {
  return (
    <>
      <Navigation />
      <ClientsModules />
      <FooterSection />
    </>
  );
}
