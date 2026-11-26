"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { ArrowUp, ChevronDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Shared shell for the legal documents. Both pages render through this so the
 * two cannot drift apart: one reading measure, one contents rail, one motion
 * grammar.
 *
 * Read mode — the job is comprehension. The contents rail and the scroll
 * progress are the design; nothing here should compete with the text.
 */

export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "clause"; number: string; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "definitions"; items: { term: string; text: string }[] };

export type LegalSection = {
  number: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  brand: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

const BODY = "text-[15px] leading-[1.8] text-foreground/75 lg:text-base";

function Block({ block, index }: { block: LegalBlock; index: number }) {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  const reveal = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: dur(0.5), delay: dur(index * 0.04), ease: EASE_OUT },
  } as const;

  if (block.kind === "paragraph") {
    return (
      <motion.p {...reveal} className={BODY}>
        {block.text}
      </motion.p>
    );
  }

  if (block.kind === "clause") {
    return (
      <motion.div
        {...reveal}
        className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-3"
      >
        <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
          {block.number}.
        </span>
        <p className={BODY}>{block.text}</p>
      </motion.div>
    );
  }

  if (block.kind === "list") {
    return (
      <motion.ul {...reveal} className="space-y-3">
        {block.items.map((item) => (
          <li key={item} className={cn(BODY, "flex gap-3")}>
            <span
              aria-hidden
              className="mt-[0.72em] h-px w-4 shrink-0 bg-foreground/30"
            />
            <span>{item}</span>
          </li>
        ))}
      </motion.ul>
    );
  }

  return (
    <motion.dl {...reveal} className="space-y-4">
      {block.items.map((item) => (
        <div
          key={item.term}
          className="grid gap-1 sm:grid-cols-[10.5rem_1fr] sm:gap-x-6"
        >
          <dt className="font-display text-base leading-snug text-foreground">
            {item.term}
          </dt>
          <dd className={BODY}>{item.text}</dd>
        </div>
      ))}
    </motion.dl>
  );
}

export function LegalPage({ document }: { document: LegalDocument }) {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
  });

  const [active, setActive] = useState(document.sections[0]?.number ?? "");
  const [tocOpen, setTocOpen] = useState(false);

  // Highlight the section currently under the masthead. Root margin keeps the
  // "current" band in the upper third rather than the exact viewport top.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(topmost.target.id.replace("legal-", ""));
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    document.sections.forEach((section) => {
      const el = window.document.getElementById(`legal-${section.number}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [document.sections]);

  return (
    <main id="top" className="relative">
      {/* Reading progress — the one persistent indicator on a long document */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />

      {/* Masthead */}
      <header className="mx-auto max-w-[1400px] px-6 pt-32 lg:px-10 lg:pt-44">
        <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>{document.brand}</span>
          <span>Legal</span>
        </div>

        <TextReveal
          as="h1"
          text={document.title}
          split="word"
          stagger={0.06}
          delay={0.15}
          blur={8}
          yOffset="35%"
          className="mt-8 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-tight text-foreground"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.7), delay: dur(0.35), ease: EASE_OUT }}
          className="mt-7 max-w-[62ch] text-base leading-relaxed text-muted-foreground lg:text-lg"
        >
          {document.intro}
        </motion.p>
      </header>

      {/* Contents + document body */}
      <div className="mx-auto mt-16 max-w-[1400px] px-6 pb-24 lg:mt-24 lg:px-10 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <button
                type="button"
                onClick={() => setTocOpen((open) => !open)}
                aria-expanded={tocOpen}
                aria-controls="legal-contents"
                className="flex w-full items-center justify-between border-y border-foreground/10 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground lg:hidden"
              >
                Contents
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-4 transition-transform duration-300",
                    tocOpen && "rotate-180",
                  )}
                />
              </button>

              <nav
                id="legal-contents"
                aria-label="Contents"
                className={cn("lg:block", tocOpen ? "block" : "hidden")}
              >
                <ol className="mt-4 space-y-px lg:mt-0">
                  {document.sections.map((section) => {
                    const isActive = active === section.number;
                    return (
                      <li key={section.number}>
                        <a
                          href={`#legal-${section.number}`}
                          onClick={() => setTocOpen(false)}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "flex gap-3 border-l py-2 pl-4 text-sm leading-snug transition-colors duration-300",
                            isActive
                              ? "border-primary text-foreground"
                              : "border-foreground/10 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                          )}
                        >
                          <span className="font-mono text-[10px] tabular-nums leading-[1.6] text-muted-foreground/60">
                            {section.number}
                          </span>
                          <span>{section.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="max-w-[68ch] space-y-16 lg:space-y-20">
              {document.sections.map((section) => (
                <section
                  key={section.number}
                  id={`legal-${section.number}`}
                  className="scroll-mt-32"
                >
                  <TextReveal
                    as="h2"
                    text={`${section.number}. ${section.title}`}
                    split="word"
                    stagger={0.04}
                    blur={6}
                    whileInView
                    className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight tracking-tight text-foreground"
                  />

                  <div className="mt-6 space-y-5">
                    {section.blocks.map((block, index) => (
                      <Block key={index} block={block} index={index} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-20 border-t border-foreground/10 pt-8">
              <a
                href="#top"
                className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowUp
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
