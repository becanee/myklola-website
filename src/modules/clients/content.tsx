import { CLIENT_LOGOS } from "@/lib/client-logos";

/**
 * The client roster. Same set the landing section draws from — this page
 * renders all of them, the landing section only the first nine.
 */

export const clients = CLIENT_LOGOS;

export { logoSrc } from "@/lib/client-logos";

export const clientsPage = {
  eyebrow: "Our Clients",
  title: ["Dipercaya untuk", "mengelola orang."],
  intro:
    "Klola membantu efisiensi dan efektivitas pengelolaan SDM di berbagai industri, ukuran, dan kondisi kepegawaian di Indonesia.",
  stats: [
    ["20+", "Perusahaan"],
    ["12y", "Pengalaman"],
    ["24/7", "Dukungan"],
  ] as const,
  note: "Sebagian klien yang mempercayakan pengelolaan SDM-nya kepada Klola.",
};
