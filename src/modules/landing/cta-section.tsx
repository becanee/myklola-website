"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function CtaSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-foreground/10">
      {/* Ghost numeral — continuity 01..05 */}
      {/* <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 right-6 font-mono text-[clamp(11rem,26vw,22rem)] leading-none tracking-tight text-foreground/[0.025]"
      >
        CTA
      </span> */}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 items-end gap-12">
          {/* Left — statement */}
          <div className="lg:col-span-7">
            <motion.h2
              className="font-display text-[clamp(2.6rem,6.5vw,6rem)] leading-[1.02] tracking-tight text-foreground"
              initial={prefersReduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Uji coba produk, <span className="text-foreground/35">g</span>
              <span className="text-foreground/35">r</span>
              <span className="text-foreground/35">a</span>
              <span className="text-foreground/35">t</span>
              <span className="text-foreground/35">i</span>
              <span className="text-foreground/35">s</span>
            </motion.h2>
            <motion.p
              className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Tertarik dengan produk kami? Mulai uji coba gratis sekarang, atau
              undang kami untuk demo langsung ke tim Anda.
            </motion.p>
          </div>

          {/* Right — primary trigger */}
          <motion.div
            className="lg:col-span-5 lg:flex lg:justify-end"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 px-8 py-6 bg-foreground text-background transition-colors duration-300 hover:bg-primary"
            >
              <span className="border border-current p-2 rounded-full transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-widest">
                Permintaan Demo
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
