"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

/**
 * Mirrors `modules/auth/login/_comp/banner.tsx`: same navy panel, hairline
 * column grid, logo, eyebrow, display statement. The detail block at the
 * bottom is the channel list instead of a floating photo — on a contact page
 * the ways to reach a person *are* the content.
 */
export function ContactBanner({ channels }: { channels: Channel[] }) {
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

      {/* Middle block grows to hold the vertical rhythm, so the channel list
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
          text={["We reply within", "one business day."]}
          split="word"
          stagger={0.07}
          delay={0.2}
          yOffset="35%"
          blur={8}
          className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,3vw,3.25rem)] leading-[1.1] tracking-tight"
        />

        <p className="mt-5 hidden max-w-[38ch] text-sm leading-relaxed text-white/60 sm:block">
          Tell us what your team is running into — payroll cycles, attendance,
          hiring — and we will route you to the person who knows it.
        </p>

        {/* Channels — the banner's detail block in the login banner's slot */}
        <motion.dl
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.9), delay: dur(0.4), ease: EASE_OUT }}
          className="mt-10 hidden lg:block"
        >
          {channels.map((channel, i) => (
            <div
              key={channel.number}
              className="grid grid-cols-[1.5rem_1fr] gap-x-4 gap-y-1 border-t border-white/15 py-4 first:border-t-0 first:pt-0"
            >
              <dt className="font-mono text-[10px] tracking-[0.2em] text-white/45">
                {channel.number}
              </dt>
              <dd>
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {channel.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-white/85">
                  {channel.value}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </aside>
  );
}

export type Channel = {
  number: string;
  label: string;
  value: string;
  desc: string;
};
