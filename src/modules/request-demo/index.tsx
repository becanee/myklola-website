"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { RequestDemoBanner, type DemoStep } from "./_comp/banner";
import { RequestDemoForm } from "./_comp/comp-form";

const steps: DemoStep[] = [
  {
    number: "01",
    label: "Core HRIS",
    value: "Profil karyawan, struktur organisasi, kehadiran, dan laporan HR. Termasuk Employee Self-Service.",
    desc: "",
  },
  {
    number: "02",
    label: "Payroll",
    value: "Perhitungan gaji, PPh 21, dan berkas bulanan yang bisa ditelusuri.",
    desc: "",
  },
  {
    number: "03",
    label: "Performance Management",
    value: "9 Grid Matrix, siklus penilaian, dan data kinerja per departemen.",
    desc: "",
  },
  {
    number: "04",
    label: "Recruitment+",
    value: "Portal lowongan, filter kandidat, dan alur pendaftaran.",
    desc: "",
  },
    {
    number: "05",
    label: "Custom Integrated",
    value: "Deskripsikan kebutuhan Anda, dan kami akan menyiapkan demo yang sesuai.",
    desc: "",
  },
];

/**
 * Mirrors `modules/contacts/index.tsx` exactly: brand panel on the left, a
 * quiet header + form column on the right, and the step list repeated inline
 * on mobile where the banner's list is hidden.
 */
export default function RequestDemoModules() {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  return (
    <div className="relative grid min-h-svh grid-cols-1 bg-background lg:grid-cols-2">
      {/* Left — brand banner. Collapses to a short strip on mobile. */}
      <div className="relative flex min-h-[300px] min-w-0 lg:min-h-svh">
        <RequestDemoBanner steps={steps} />
      </div>

      {/* Right — form. `min-w-0` keeps the grid track from sizing to the
          form's max-content width on narrow screens. */}
      <div className="relative flex min-w-0 flex-col">
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
          <Link
            href="/"
            className="text-sm text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← Kembali ke beranda
          </Link>
        </header>

        <main className="flex flex-1 flex-col justify-center px-6 pb-14 pt-4 sm:px-10 lg:px-14">
          <div className="w-full max-w-[460px]">
            {/* Eyebrow — mirrors the contact form's numbered kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.6), ease: EASE_OUT }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-foreground/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Permintaan demo
              </span>
            </motion.div>

            <TextReveal
              as="h1"
              text={["Jadwalkan demo."]}
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
              Ceritakan tentang tim Anda dan kami akan menyiapkan sesi sesuai
              modul yang benar-benar Anda butuhkan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: dur(0.3), ease: EASE_OUT }}
              className="mt-9"
            >
              <RequestDemoForm />
            </motion.div>

            {/* Steps again, inline — the banner's list is desktop-only */}
            <div className="mt-10 border-t border-foreground/10 pt-6 lg:hidden">
              <dl className="space-y-4">
                {steps.map((step) => (
                  <div key={step.number}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                      {step.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-foreground/80">
                      {step.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </main>

        <footer className="hidden px-6 pb-8 text-xs text-muted-foreground lg:block lg:px-14">
          © 2026 PT. Klola Indonesia. Seluruh hak cipta dilindungi.
        </footer>
      </div>
    </div>
  );
}
