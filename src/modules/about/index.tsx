"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { motion, useReducedMotion } from "motion/react";
import {
  about,
  aboutSection,
  mission,
  team,
  vision,
} from "./content";

/**
 * About page. Three devices carry it: a hairline register on every section
 * (number + label), a serif display voice for the two one-line statements
 * (vision, mission), and the etymology block — a real object from the
 * subject's world (the word the company is named after) rather than a stat.
 */
export default function AboutModules() {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  const reveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: dur(0.6), ease: EASE_OUT },
  } as const;

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
            {about.eyebrow}
          </span>
        </div>

        <TextReveal
          as="h1"
          text={about.title}
          split="word"
          stagger={0.06}
          delay={0.18}
          blur={8}
          yOffset="35%"
          className="mt-7 max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,4.8rem)] leading-[1.02] tracking-tight text-foreground"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.7), delay: dur(0.4), ease: EASE_OUT }}
          className="mt-7 max-w-[54ch] text-base leading-relaxed text-muted-foreground lg:text-lg"
        >
          {about.intro}
        </motion.p>
      </header>

      {/* 01 — Tentang Klola */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 lg:px-10 lg:pt-32">
        <motion.div
          {...reveal}
          className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span>{aboutSection.number}</span>
          <span className="flex-1">{aboutSection.label}</span>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {aboutSection.paragraphs.map((paragraph, i) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: dur(0.55),
                  delay: dur(i * 0.08),
                  ease: EASE_OUT,
                }}
                className={
                  i === 0
                    ? "text-lg leading-[1.75] text-foreground lg:text-xl"
                    : "mt-6 text-[15px] leading-[1.8] text-foreground/75 lg:text-base"
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Etymology — the word the company is named after */}
          <motion.aside
            {...reveal}
            className="self-start border-t border-foreground/10 pt-8 lg:col-span-4 lg:col-start-9 lg:mt-2"
          >
            <div className="flex items-end gap-3">
              <span className="font-display text-[clamp(2rem,4vw,2.8rem)] leading-none tracking-tight text-foreground">
                {aboutSection.etymology.from}
              </span>
              <span aria-hidden className="mb-1.5 h-px flex-1 bg-foreground/20" />
              <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {aboutSection.etymology.to}
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {aboutSection.etymology.note}
            </p>
          </motion.aside>
        </div>
      </section>

      {/* 02 — Visi, 03 — Misi */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 lg:px-10 lg:pt-32">
        <div className="grid gap-16 border-t border-foreground/10 pt-12 lg:grid-cols-2 lg:gap-24">
          {[vision, mission].map((item) => (
            <motion.div key={item.number} {...reveal}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground/60">
                  {item.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <p className="mt-6 max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.1] tracking-tight text-foreground">
                {item.statement}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 04 — myKlola Team */}
      <section className="mt-24 border-t border-foreground/10 bg-foreground py-24 text-background lg:mt-32 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div
            {...reveal}
            className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50"
          >
            <span>{team.number}</span>
            <span className="flex-1">{team.label}</span>
          </motion.div>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {team.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: dur(0.55),
                    delay: dur(i * 0.08),
                    ease: EASE_OUT,
                  }}
                  className={
                    i === 0
                      ? "text-lg leading-[1.75] lg:text-xl"
                      : "mt-6 text-[15px] leading-[1.8] text-white/70 lg:text-base"
                  }
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Disciplines as an index, not cards */}
            <div className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-white/15">
                {team.disciplines.map((discipline, i) => (
                  <motion.div
                    key={discipline}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: dur(0.5),
                      delay: dur(0.1 + i * 0.06),
                      ease: EASE_OUT,
                    }}
                    className="flex items-baseline justify-between gap-4 border-b border-white/15 py-4"
                  >
                    <dt className="text-base text-white">{discipline}</dt>
                    <dd className="font-mono text-[10px] tracking-[0.22em] text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
