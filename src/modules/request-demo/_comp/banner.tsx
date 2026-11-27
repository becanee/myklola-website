"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export type DemoStep = {
  number: string;
  label: string;
  value: string;
  desc: string;
};

/**
 * Same shell as `modules/contacts/_comp/banner.tsx` — navy panel, hairline
 * column grid, logo, eyebrow, display statement — so the two form pages read
 * as one pair. The detail block lists what happens after you submit instead of
 * the contact channels.
 */
export function RequestDemoBanner({ steps }: { steps: DemoStep[] }) {
  const reduce = useReducedMotion();
  // Never branch `initial` on useReducedMotion(): the server can't know it, so
  // the two renders disagree and React reports a hydration mismatch. Collapse
  // the duration instead — same start state, no motion.
  const dur = (d: number) => (reduce ? 0 : d);

  return (
    <aside className="relative flex w-full min-h-full flex-col overflow-hidden bg-primary px-6 py-8 text-primary-foreground sm:px-10 lg:px-14 lg:py-12">
      {/* Hairline column grid — print rule, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 120px)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <Link href="/" aria-label="Klola Indonesia — beranda" className="shrink-0">
          <img src="/logo-white.png" alt="Klola" className="w-14" />
        </Link>
      </div>

      {/* Middle block grows to hold the vertical rhythm, so the step list
          can never be pushed past the bottom edge. */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-10 lg:py-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 shrink-0 bg-white/30" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
            myKlola
          </span>
        </div>

        <TextReveal
          as="p"
          text={["Lihat langsung", "dengan data Anda."]}
          split="word"
          stagger={0.07}
          delay={0.2}
          yOffset="35%"
          blur={8}
          className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,3vw,3.25rem)] leading-[1.1] tracking-tight"
        />

        <p className="mt-5 hidden max-w-[38ch] text-sm leading-relaxed text-white/60 sm:block">
          Bukan presentasi slide. Kami menelusuri modul yang Anda butuhkan
          menggunakan ruang kerja yang menyerupai tim Anda.
        </p>

        {/* Steps — the banner's detail block in the contact banner's slot */}
        <motion.dl
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.9), delay: dur(0.4), ease: EASE_OUT }}
          className="mt-10 hidden lg:block"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-[1.5rem_1fr] gap-x-4 gap-y-1 border-t border-white/15 py-4 first:border-t-0 first:pt-0"
            >
              <dt className="font-mono text-[10px] tracking-[0.2em] text-white/45">
                {step.number}
              </dt>
              <dd>
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {step.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-white/85">
                  {step.value}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </aside>
  );
}
