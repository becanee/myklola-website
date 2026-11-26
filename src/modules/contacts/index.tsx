"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ContactBanner, type Channel } from "./_comp/banner";
import { ContactForm } from "./_comp/comp-form";

const channels: Channel[] = [
  {
    number: "01",
    label: "General Email",
    value: "helpdesk@klola.id | sales@klola.id",
    desc: "For questions & business partnerships",
  },
  {
    number: "02",
    label: "Address",
    value:
      "Pondok Indah Office Tower 2, 17th Fl. Jl. Sultan Iskandar Muda Kav. V-TA Pondok Indah Jakarta Selatan 12310",
    desc: "For official correspondence & document delivery",
  },
  {
    number: "03",
    label: "Office Hours",
    value: "Monday – Friday | 09:00 – 18:00 WIB (UTC+7)",
    desc: "09:00 – 18:00 WIB (UTC+7)",
  },
];

/**
 * Same two-column chrome as `modules/auth/login/index.tsx`: brand panel on the
 * left, a quiet header + scrolling form column on the right. The mobile order
 * flips the banner below the form, so the reason to fill it in comes first.
 */
export default function ContactModules() {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  return (
    <div className="relative grid min-h-svh grid-cols-1 bg-background lg:grid-cols-2">
      {/* Left — brand banner. Collapses to a short strip on mobile. */}
      <div className="relative flex min-h-[300px] min-w-0 lg:min-h-svh">
        <ContactBanner channels={channels} />
      </div>

      {/* Right — form. `min-w-0` keeps the grid track from sizing to the
          form's max-content width on narrow screens. */}
      <div className="relative flex min-w-0 flex-col">
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
          <Link
            href="/"
            className="text-sm text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← Back to home
          </Link>

          <Link
            href="/products"
            className="hidden text-sm text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline sm:block"
          >
            Products
          </Link>
        </header>

        <main className="flex flex-1 flex-col justify-center px-6 pb-14 pt-4 sm:px-10 lg:px-14">
          <div className="w-full max-w-[460px]">
            {/* Eyebrow — mirrors the login form's numbered kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.6), ease: EASE_OUT }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-foreground/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Contact
              </span>
            </motion.div>

            <TextReveal
              as="h1"
              text={["Talk to us."]}
              split="word"
              stagger={0.06}
              delay={0.12}
              yOffset="35%"
              blur={8}
              className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-tight text-foreground"
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: dur(0.22), ease: EASE_OUT }}
              className="mt-3 text-sm leading-relaxed text-muted-foreground"
            >
              Send a message and our team will respond within one business day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: dur(0.3), ease: EASE_OUT }}
              className="mt-9"
            >
              <ContactForm />
            </motion.div>

            {/* Channels again, inline — the banner's list is desktop-only */}
            <div className="mt-10 border-t border-foreground/10 pt-6 lg:hidden">
              <dl className="space-y-4">
                {channels.map((channel) => (
                  <div key={channel.number}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                      {channel.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-foreground/80">
                      {channel.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </main>

        <footer className="hidden px-6 pb-8 text-xs text-muted-foreground lg:block lg:px-14">
          © 2026 PT. Klola Indonesia. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
