"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const disciplines = [
  {
    label: "SDM",
    note: "Manajemen manusia",
  },
  {
    label: "Teknologi Informasi",
    note: "Produk & engineering",
  },
  {
    label: "Akuntansi",
    note: "Payroll & PPh",
  },
  {
    label: "Bisnis",
    note: "Strategi & operasi",
  },
];

export function TeamSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-foreground text-background py-28 lg:py-40">
      {/* Madelary ghost numeral — corner depth */}
      {/* <span
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-16 right-0 font-mono text-[clamp(14rem,34vw,30rem)] leading-none tracking-tight text-white/[0.05]"
      >
        Team
      </span> */}

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left sticky label */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-32 flex flex-col items-start gap-4">
              <span className="h-px w-12 bg-white/30" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50 [writing-mode:vertical-rl] rotate-180">
                Tim Kami
              </span>
            </div>
          </div>

          {/* Right copy */}
          <div className="lg:col-span-10">
            <h2 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.05] tracking-tight">
              <motion.span
                className="block"
                initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Dibalik setiap
              </motion.span>
              <motion.span
                className="block text-white/30"
                initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                produk, ada tim.
              </motion.span>
            </h2>

            <p className="mt-10 max-w-2xl text-lg text-white/70 leading-relaxed">
              Klola didukung oleh tim dengan pengalaman mendalam di bidang SDM,
              teknologi informasi, akuntansi, maupun bisnis. Semua saling berbagi
              pengetahuan untuk satu tujuan: membantu setiap organisasi mengelola
              SDM dengan mudah dan efektif — dari mana saja dan kapan saja.
            </p>

            {/* Disciplines — hairline grid, reveal per row */}
            <dl className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15">
              {disciplines.map((d, i) => (
                <motion.div
                  key={d.label}
                  className="group bg-foreground p-6 transition-colors duration-300 hover:bg-white/[0.03]"
                  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                    / 0{i + 1}
                  </dt>
                  <dd className="mt-3">
                    <span className="block font-semibold text-white">{d.label}</span>
                    <span className="mt-1 block text-sm text-white/50">{d.note}</span>
                  </dd>
                </motion.div>
              ))}
            </dl>

            <motion.div
              className="mt-14"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://klola.id/pages/about"
                className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-white hover:bg-white hover:text-foreground"
              >
                Kenali tim kami
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
