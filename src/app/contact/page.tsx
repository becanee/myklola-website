import ContactModules from "@/modules/contacts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell us what your team is running into. Our team responds within one business day.",
};

// No Navigation/FooterSection: the contact page now owns its chrome, the same
// way /login does. The module renders its own split-screen header and footer.
export default function ContactPage() {
  return <ContactModules />;
}
