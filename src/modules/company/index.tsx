"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { companyPage, companySections, featuredClients } from "./content";

/**
 * Company hub. A contents page, not a card grid: three full-width rows, each
 * a single link, with the facts that justify taking it. The register line
 * (hairline that draws in under a hovered or focused row) is the same motif
 * the products overview uses, so the two hubs read as siblings.
 */
export default function CompanyModules() {
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
            {companyPage.eyebrow}
          </span>
        </div>

        <TextReveal
          as="h1"
          text={companyPage.title}
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
          className="mt-7 max-w-[56ch] text-base leading-relaxed text-muted-foreground lg:text-lg"
        >
          {companyPage.intro}
        </motion.p>
      </header>

      {/* Directory */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>Indeks</span>
          <span className="flex-1" />
          <span className="tabular-nums text-muted-foreground/60">
            {String(companySections.length).padStart(2, "0")}
          </span>
        </div>

        <ul>
          {companySections.map((section, i) => (
            <motion.li
              key={section.number}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: dur(0.55),
                delay: dur(i * 0.07),
                ease: EASE_OUT,
              }}
              className="border-t border-foreground/10 last:border-b"
            >
              <Link
                href={section.href}
                className="group grid gap-5 py-10 sm:grid-cols-[2.5rem_1fr_auto] sm:items-start sm:gap-6 lg:gap-10 lg:py-14"
              >
                <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-muted-foreground/60 sm:pt-2">
                  {section.number}
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {section.title}
                  </span>

                  <span className="mt-3 block max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">
                    {section.summary}
                  </span>

                  <span className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {section.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80"
                      >
                        <span
                          aria-hidden
                          className="h-px w-3 bg-foreground/30"
                        />
                        {highlight}
                      </span>
                    ))}
                  </span>

                  {/* Clients row carries a logo strip — the one piece of
                      evidence a summary line cannot carry. */}
                  {section.href === "/clients" && (
                    <span className="mt-6 flex flex-wrap items-center gap-2">
                      {featuredClients.map((src) => (
                        <span
                          key={src}
                          className="flex h-12 w-20 items-center justify-center border border-foreground/10 bg-background p-2"
                        >
                          <img
                            src={src}
                            alt="Logo klien Klola"
                            loading="lazy"
                            decoding="async"
                            className="max-h-full w-full object-contain opacity-45 grayscale transition-all duration-500 group-hover:opacity-80"
                          />
                        </span>
                      ))}
                    </span>
                  )}

                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {section.label}
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        "size-3.5 transition-transform duration-300",
                        canHover && "group-hover:translate-x-1",
                      )}
                    />
                  </span>

                  {/* Register rule — draws under the row in focus */}
                  <span
                    aria-hidden
                    className="mt-6 block h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>

                <span
                  aria-hidden
                  className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:flex"
                >
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: dur(0.6), ease: EASE_OUT }}
          className="mt-12 max-w-[52ch] text-sm leading-relaxed text-muted-foreground"
        >
          Untuk pertanyaan yang tidak terjawab di halaman mana pun,{" "}
          <Link
            href="/contact"
            className="text-foreground underline offset-4 underline-offset-4 transition-colors hover:text-primary"
          >
            hubungi kami
          </Link>
          .
        </motion.p>
      </section>
    </main>
  );
}
