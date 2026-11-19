import LoginModules from "@/modules/auth/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Manage people. Anywhere. Anytime.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginModules />;
}
