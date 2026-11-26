/**
 * The company hub. Three routes summarized and linked — About, Clients,
 * Careers — so this page stays a directory, not a second copy of them.
 */

export type CompanySection = {
  number: string;
  title: string;
  summary: string;
  href: string;
  label: string;
  /** The facts that make the link worth taking. */
  highlights: string[];
};

export const companyPage = {
  eyebrow: "Company",
  title: ["Satu perusahaan,", "satu pekerjaan."],
  intro:
    "Klola dibangun oleh orang-orang yang percaya pengelolaan SDM bisa jauh lebih sederhana. Tiga halaman berikut menjelaskan siapa kami, siapa yang kami layani, dan siapa yang kami cari.",
};

export const companySections: CompanySection[] = [
  {
    number: "01",
    title: "About",
    summary:
      "Nama klola diambil dari kata “kelola” — mengelola. Itu satu-satunya hal yang kami kerjakan: membantu organisasi mengelola aset terpentingnya, SDM-nya.",
    href: "/about",
    label: "Tentang Klola",
    highlights: ["Visi: Melayani Indonesia", "Empat disiplin dalam satu tim"],
  },
  {
    number: "02",
    title: "Clients",
    summary:
      "Lebih dari 20 perusahaan di berbagai industri, ukuran, dan kondisi kepegawaian mempercayakan pengelolaan SDM-nya kepada Klola.",
    href: "/clients",
    label: "Lihat klien",
    highlights: ["20+ perusahaan", "12 tahun pengalaman"],
  },
  {
    number: "03",
    title: "Careers",
    summary:
      "Kami mencari orang yang menyukai tantangan dan ingin membangun teknologi yang dipakai ratusan perusahaan setiap hari.",
    href: "/careers",
    label: "Lihat lowongan",
    highlights: ["10 posisi terbuka", "Karir & magang"],
  },
];

/** A short strip of client logos for the Clients row. Reuses the roster. */
export const featuredClients = [
  "C6AuvCyJrYusHm817oXu",
  "oVzugCyhzr8d3TLLI7le",
  "Hp7WnVdZTyqImeARXMwE",
  "DcdRtLXIqivEHv1vIHmN",
  "l2ixXjnuWph50ZyNBOzw",
  "7URAV453czONAobLeMuR",
].map((id) => `https://klola.id/images/March2019/${id}.png`);
