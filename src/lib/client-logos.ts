/**
 * Client roster and logo paths.
 *
 * Logos are served from `public/clients/` — they were previously fetched from
 * klola.id, which cost an external round trip on every page that showed them.
 * To add a client, drop `<id>.png` into `public/clients/` and append the id.
 */

const IDS = [
  "zP7DlfVIM7gQ5Kd3HKbB",
  "C6AuvCyJrYusHm817oXu",
  "AGQHcWdflzoYdqReaCdf",
  "xM65ocMrsir7y2Qizv3Y",
  "MJiGqvmeZNZwHf5xjKY8",
  "I3whxO1ySJAW7EIeEpeu",
  "vkKkxLj9gNajuFbkkHt8",
  "Jfn7JI7e7s0g5SsfejRr",
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
  "Jfn7JI7e7s0g5SsfejRr",
] as const;

export type ClientId = (typeof IDS)[number];

/** Local path for a client logo. */
export const logoSrc = (id: ClientId | string) => `/clients/${id}.png`;

export const CLIENT_IDS: readonly string[] = IDS;

/** Ready-to-render roster: id, display index and local src. */
export const CLIENT_LOGOS = IDS.map((id, i) => ({
  id,
  number: String(i + 1).padStart(2, "0"),
  src: logoSrc(id),
}));
