/**
 * The client roster. Same set the landing section draws from
 * (`modules/landing/clients-section.tsx`), which renders only the first nine —
 * this page shows the full list.
 */

const IDS = [
  "C6AuvCyJrYusHm817oXu",
  "oVzugCyhzr8d3TLLI7le",
  "Hp7WnVdZTyqImeARXMwE",
  "DcdRtLXIqivEHv1vIHmN",
  "l2ixXjnuWph50ZyNBOzw",
  "7URAV453czONAobLeMuR",
  "mmZ0MIQfcfdn4QOW7tcK",
  "tvcQS68i0or7LcYHyYlP",
  "lXL0UAyPvzmGHn9gWJmI",
  "hztYAcWox5Yzgxo2NNMW",
  "X0rCfHiFYzG9kzH7bAUY",
  "d3ZCAQsFgjw6Ehv8pQgX",
];

/** Client logos are served from the existing Klola image host. */
export const logoSrc = (id: string) =>
  `https://klola.id/images/March2019/${id}.png`;

export const clients = IDS.map((id, i) => ({
  id,
  number: String(i + 1).padStart(2, "0"),
  src: logoSrc(id),
}));

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
