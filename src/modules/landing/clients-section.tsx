"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const clients = [
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

const src = (id: string) =>
  `https://klola.id/images/March2019/${id}.png`;

export function ClientsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-28 lg:py-32 bg-background relative overflow-hidden">
      {/* Oversized ghost numeral — continuity with 01-02-03-04 */}
      {/* <span
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-8 right-0 font-mono text-[clamp(13rem,30vw,24rem)] leading-none tracking-tight text-foreground/[0.03]"
      >
        Clients
      </span> */}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          {/* Left — stat / lattice */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-foreground/25" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Klien Kami
              </span>
            </div>

            <h2 className="mt-8 font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] tracking-tight text-foreground">
              Dipercaya lebih dari <br className="hidden sm:block" />
              <span className="text-muted-foreground">300 perusahaan.</span>
            </h2>

            <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
              Klola membantu efisiensi dan efektivitas pengelolaan SDM di
              berbagai industri, ukuran, dan kondisi kepegawaian di Indonesia.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px bg-foreground/10 w-fit">
              {[
                ["99%", "Retensi klien"],
                ["12y", "Pengalaman"],
                ["24/7", "Dukungan"],
              ].map(([stat, label]) => (
                <div key={stat} className="bg-background px-6 py-4">
                  <div className="font-display text-3xl text-foreground">{stat}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — logo marquee, two rows, opposing scroll */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
              <div className="grid grid-cols-3 gap-4">
                {clients.slice(0, 9).map((id, i) => (
                  <motion.div
                    key={id}
                    className="group flex aspect-square items-center justify-center rounded-lg border border-foreground/10 p-5 transition-colors duration-300 hover:border-foreground/30"
                    initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  >
                    <img
                      src={src(id)}
                      alt={`Logo klien Klola`}
                      loading="lazy"
                      className="max-h-full w-full object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="mt-10"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="https://klola.id/pages/clients"
                className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-primary hover:gap-4 transition-all"
              >
                Lihat semua klien
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
