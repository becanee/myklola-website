import PrivacyModules from "@/modules/privacy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Policy",
  description:
    "What information myklola collects, why we collect it, and how we keep it secure.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyModules />;
}
