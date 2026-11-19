"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function LoginBanner() {
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
        <Link href="/" aria-label="Klola Indonesia — home" className="shrink-0">
          <img src="/logo-white.png" alt="Klola" className="w-14" />
        </Link>
      </div>

      {/* Middle block grows to hold the vertical rhythm, so the facts row
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
          text={["Managing people.", "Anywhere. Anytime."]}
          split="word"
          stagger={0.07}
          delay={0.2}
          yOffset="35%"
          blur={8}
          className="mt-5 max-w-[15ch] font-display text-[clamp(1.9rem,3vw,3.25rem)] leading-[1.1] tracking-tight"
        />

        <p className="mt-5 hidden max-w-[34ch] text-sm leading-relaxed text-white/60 sm:block">
          One place for HR administration, payroll, attendance and performance —
          from wherever your team happens to be.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.9), delay: dur(0.4), ease: EASE_OUT }}
          className="mt-10 hidden lg:block"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative w-[min(100%,300px)] rounded-sm bg-background p-4 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/loginbg.png"
              alt="Two colleagues reviewing people data in the Klola workspace"
              width={500}
              height={403}
              priority
              className="h-auto w-full"
            />
            <span className="absolute -top-2 left-4 bg-primary px-1.5 font-mono text-[10px] tracking-[0.2em] text-white/60">
              / 01
            </span>
          </motion.div>
        </motion.div>
      </div>
    </aside>
  );
}