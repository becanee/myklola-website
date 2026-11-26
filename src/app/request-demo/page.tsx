import RequestDemoModules from "@/modules/request-demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "See Klola running on a workspace shaped like your own team. Tell us about your organisation and we will schedule a 45-minute walkthrough.",
};

// No Navigation/FooterSection: like /contact and /login, this page owns its
// chrome. The module renders the split-screen header and footer.
export default function RequestDemoPage() {
  return <RequestDemoModules />;
}
