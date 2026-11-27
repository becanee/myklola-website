import ContactModules from "@/modules/contacts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Ceritakan kendala tim Anda. Tim kami merespons dalam satu hari kerja.",
};

// No Navigation/FooterSection: the contact page now owns its chrome, the same
// way /login does. The module renders its own split-screen header and footer.
export default function ContactPage() {
  return <ContactModules />;
}
