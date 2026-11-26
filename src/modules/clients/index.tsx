"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { motion, useReducedMotion } from "motion/react";
import { clients, clientsPage } from "./content";

/**
 * Clients page. The grid is the content, so the design keeps everything else
 * quiet: a register at the top, the stats as a hairline table, and the logos
 * on a plain grid where only the logo in focus loses its greyscale.
 */
export default function ClientsModules() {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);
  const canHover = useHoverCapable();

  return (
    <main className="overflow-hidden">
      {/* Masthead */}
      <header className="mx-auto max-w-[1400px] px-6 pt-32 lg:px-10 lg:pt-44">
        <div className="flex items-center gap-3">
          <motion.span
            aria-hidden
            className="h-px w-12 origin-left bg-foreground/25"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: dur(0.8), ease: EASE_OUT }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {clientsPage.eyebrow}
          </span>
        </div>

        <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <TextReveal
            as="h1"
            text={clientsPage.title}
            split="word"
            stagger={0.06}
            delay={0.18}
            blur={8}
            yOffset="35%"
            className="max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,4.8rem)] leading-[1.02] tracking-tight text-foreground lg:col-span-7"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.7), delay: dur(0.4), ease: EASE_OUT }}
            className="max-w-[44ch] text-base leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9 lg:text-lg"
          >
            {clientsPage.intro}
          </motion.p>
        </div>

        {/* Stats — hairline table, not cards */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.6), delay: dur(0.5), ease: EASE_OUT }}
          className="mt-12 grid grid-cols-3 gap-px border-y border-foreground/10 bg-foreground/10"
        >
          {clientsPage.stats.map(([value, label]) => (
            <div key={label} className="bg-background px-5 py-6 lg:px-6">
              <dt className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none text-foreground">
                {value}
              </dt>
              <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </header>

      {/* Roster */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>01</span>
          <span className="flex-1">Klien</span>
          <span className="tabular-nums text-muted-foreground/60">
            {String(clients.length).padStart(2, "0")}
          </span>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((client, i) => (
            <motion.li
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: dur(0.5),
                delay: dur((i % 4) * 0.05),
                ease: EASE_OUT,
              }}
              className="group relative flex aspect-[4/3] items-center justify-center bg-background p-8 transition-colors duration-500 hover:bg-secondary/40"
            >
              <img
                src={client.src}
                alt="Logo klien Klola"
                loading="lazy"
                decoding="async"
                className="max-h-full w-full object-contain opacity-45 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-focus-within:opacity-100 group-focus-within:grayscale-0"
              />
              <span
                aria-hidden
                className="absolute left-3 top-2.5 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/40"
              >
                {client.number}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: dur(0.6), ease: EASE_OUT }}
          className="mt-8 max-w-[54ch] text-sm leading-relaxed text-muted-foreground"
        >
          {clientsPage.note}
          {canHover && (
            <span className="text-muted-foreground/60">
              {" "}
              Arahkan kursor ke logo untuk melihatnya berwarna.
            </span>
          )}
        </motion.p>
      </section>
    </main>
  );
}
