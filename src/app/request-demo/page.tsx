import RequestDemoModules from "@/modules/request-demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permintaan Demo",
  description:
    "Lihat Klola berjalan pada ruang kerja yang menyerupai tim Anda. Ceritakan organisasi Anda dan kami akan menjadwalkan sesi demo.",
};

// No Navigation/FooterSection: like /contact and /login, this page owns its
// chrome. The module renders the split-screen header and footer.
export default function RequestDemoPage() {
  return <RequestDemoModules />;
}
