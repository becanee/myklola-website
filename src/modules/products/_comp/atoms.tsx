"use client";

import { TextReveal } from "@/components/motion/text-reveal";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

/**
 * Shared shells for the product pages. All four products render the same
 * structure — the differences live in copy, crop and index, never in layout —
 * so these live here instead of being copied four times.
 */

/* ------------------------------------------------------------------ */
/* Reduced motion                                                      */
/* ------------------------------------------------------------------ */

/**
 * Branch the *duration*, never `initial`: the server cannot know the user's
 * motion preference, and a differing `initial` is a hydration mismatch.
 */
export function useDur() {
  const reduce = useReducedMotion();
  return (d: number) => (reduce ? 0 : d);
}

/* ------------------------------------------------------------------ */
/* Eyebrow — the register line                                         */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  index,
  label,
  invert = false,
  delay = 0,
  className,
}: {
  index?: string;
  label: string;
  invert?: boolean;
  delay?: number;
  className?: string;
}) {
  const dur = useDur();
  const rule = invert ? "bg-white/30" : "bg-foreground/25";
  const text = invert ? "text-white/55" : "text-muted-foreground";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.span
        aria-hidden
        className={cn("h-px w-12 origin-left", rule)}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: dur(0.8), delay: dur(delay), ease: EASE_IN_OUT }}
      />
      <motion.span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.28em]",
          text,
        )}
        initial={{ y: 6 }}
        animate={{ y: 0 }}
        transition={{ duration: dur(0.5), delay: dur(delay + 0.12), ease: EASE_OUT }}
      >
        {index ? `${index} / ${label}` : label}
      </motion.span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SpecimenPlate — the framed print plate                              */
/* ------------------------------------------------------------------ */

/** Four corner rules — the recurring print motif. */
function CornerRules() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-px -top-px size-3 border-l border-t border-foreground/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-px -top-px size-3 border-r border-t border-foreground/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -left-px size-3 border-b border-l border-foreground/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -right-px size-3 border-b border-r border-foreground/40"
      />
    </>
  );
}

export function SpecimenPlate({
  src,
  alt,
  width,
  height,
  caption,
  index,
  priority = false,
  sizes = "(min-width: 1024px) 44vw, 92vw",
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  index?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const dur = useDur();

  return (
    <figure className={cn("relative", className)}>
      <div className="relative border border-foreground/10 bg-card p-3 lg:p-4">
        <CornerRules />
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: dur(1.2), delay: dur(0.3), ease: EASE_OUT }}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              priority={priority}
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </div>

      {(caption || index) && (
        <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>{index ? `${index} / ${caption}` : caption}</span>
          <span className="tabular-nums text-muted-foreground/60">
            {width}×{height}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* HeroShell                                                           */
/* ------------------------------------------------------------------ */

export function HeroShell({
  eyebrowIndex,
  eyebrowLabel,
  title,
  subtitle,
  actions,
  plate,
}: {
  eyebrowIndex: string;
  eyebrowLabel: string;
  title: string[];
  subtitle: string;
  actions: ReactNode;
  plate: ReactNode;
}) {
  const dur = useDur();

  return (
    <section className="relative overflow-hidden border-b border-foreground/10 pb-14 pt-28 lg:pb-20 lg:pt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="min-w-0 lg:col-span-6 lg:self-end">
          <Eyebrow index={eyebrowIndex} label={eyebrowLabel} />

          <TextReveal
            as="h1"
            text={title}
            split="word"
            stagger={0.055}
            delay={0.2}
            blur={8}
            yOffset="38%"
            className="mt-6 font-display text-[clamp(2.6rem,6.4vw,4.6rem)] leading-[1.02] tracking-tight text-foreground"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.7), delay: dur(0.45), ease: EASE_OUT }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.6), delay: dur(0.55), ease: EASE_OUT }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            {actions}
          </motion.div>
        </div>

        <div className="min-w-0 lg:col-span-6">{plate}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FeaturesShell                                                       */
/* ------------------------------------------------------------------ */

export type FeatureItem = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export function FeaturesShell({
  eyebrowLabel,
  statement,
  intro,
  items,
  children,
}: {
  eyebrowLabel: string;
  statement: string;
  intro: string;
  items: FeatureItem[];
  /** Optional full-bleed band rendered after the feature rows (ESS on HRIS). */
  children?: ReactNode;
}) {
  const dur = useDur();
  const canHover = useHoverCapable();

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Eyebrow label={eyebrowLabel} />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: dur(0.7), delay: dur(0.1), ease: EASE_OUT }}
            className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-tight text-foreground lg:col-span-6"
          >
            {statement}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: dur(0.6), delay: dur(0.2), ease: EASE_OUT }}
            className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8"
          >
            {intro}
          </motion.p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: dur(0.55),
                  delay: dur(0.25 + i * 0.06),
                  ease: EASE_OUT,
                }}
                className={cn(
                  "group relative border-t border-foreground/10 py-8 pr-6",
                  i % 2 === 1 && "sm:border-l sm:pl-8",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tabular-nums tracking-widest text-muted-foreground/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.03] text-foreground transition-colors duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl tracking-tight text-foreground transition-transform duration-500 group-hover:-translate-y-0.5 lg:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>

                {/* hover underline sweep — the register motif at rest */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 left-0 h-px bg-primary transition-all duration-500",
                    canHover ? "w-0 group-hover:w-full" : "w-full opacity-0",
                  )}
                />
              </motion.div>
            );
          })}
        </div>

        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EssBand — Employee Self-Service inside the HRIS page                 */
/* ------------------------------------------------------------------ */

export function EssBand({
  title,
  intro,
  tiles,
  note,
}: {
  title: string;
  intro: string;
  tiles: FeatureItem[];
  note: string;
}) {
  const dur = useDur();

  return (
    <div className="mt-20 border-y border-foreground/10 bg-secondary/50 py-14 lg:mt-24 lg:py-20">
      {/* Negative margins cancel the parent's padding exactly, so the band
          runs edge to edge without introducing horizontal overflow. */}
      <div className="-mx-6 px-6 lg:-mx-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: dur(0.65), delay: dur(0.1), ease: EASE_OUT }}
              className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] tracking-tight text-foreground"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: dur(0.6), delay: dur(0.18), ease: EASE_OUT }}
              className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground"
            >
              {intro}
            </motion.p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-px border border-foreground/10 bg-foreground/10 lg:grid-cols-4">
              {tiles.map((tile, i) => {
                const Icon = tile.icon;
                return (
                  <motion.div
                    key={tile.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: dur(0.5),
                      delay: dur(0.15 + i * 0.04),
                      ease: EASE_OUT,
                    }}
                    className="bg-background p-4 lg:p-5"
                  >
                    <Icon
                      className="size-4 text-primary"
                      aria-hidden
                    />
                    <h3 className="mt-3 font-display text-base leading-tight tracking-tight text-foreground lg:text-lg">
                      {tile.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {tile.body}
                    </p>
                  </motion.div>
                );
              })}

              {/* Eighth cell closes both the 2x4 and 4x2 grids. */}
              <div className="flex items-center bg-primary p-4 text-primary-foreground lg:p-5">
                <p className="text-xs leading-relaxed">{note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CtaBand                                                             */
/* ------------------------------------------------------------------ */

/**
 * The four `-cta.png` assets are byte-identical, so the photo is treated as a
 * tonal backdrop — desaturated, under a navy wash — never as a product claim.
 * Crop and caption change per product; the caption names the real scene.
 */
export function CtaBand({
  index,
  title,
  body,
  imageSrc,
  objectPosition = "object-[42%_28%] lg:object-[54%_32%]",
  caption,
}: {
  index: string;
  title: string;
  body: string;
  imageSrc: string;
  objectPosition?: string;
  caption: string;
}) {
  const dur = useDur();
  const canHover = useHoverCapable();

  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Plain <img>: `images.unoptimized` means next/image adds nothing, and
            the backdrop is absolutely positioned so it costs no layout. */}
        <motion.img
          src={imageSrc}
          alt=""
          width={793}
          height={592}
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: dur(1.4), ease: EASE_OUT }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover opacity-80 grayscale",
            objectPosition,
          )}
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        <div className="noise-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[440px] max-w-[1400px] flex-col justify-end px-6 py-20 lg:min-h-[520px] lg:px-10 lg:py-28">
        <Eyebrow index={index} label="Request a demo" invert />

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: dur(0.8), delay: dur(0.1), ease: EASE_OUT }}
          className="mt-6 max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] tracking-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: dur(0.6), delay: dur(0.2), ease: EASE_OUT }}
          className="mt-5 max-w-lg text-base leading-relaxed text-white/75"
        >
          {body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: dur(0.6), delay: dur(0.28), ease: EASE_OUT }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border border-white/25 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-300 hover:bg-white/90"
          >
            Permintaan Demo
            <ArrowUpRight
              className={cn(
                "size-4 transition-transform duration-300",
                canHover && "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              )}
            />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-white/25 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/10"
          >
            Lihat produk lain
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: dur(0.6), delay: dur(0.4), ease: EASE_OUT }}
          className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45"
        >
          {caption}
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PreviewSwap — used by the overview's sticky specimen                */
/* ------------------------------------------------------------------ */

export function PreviewSwap({
  activeKey,
  children,
}: {
  activeKey: string;
  children: ReactNode;
}) {
  const dur = useDur();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={activeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: dur(0.3), ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* OverviewRow — a contents-page index line                            */
/* ------------------------------------------------------------------ */

export function OverviewRow({
  index,
  title,
  description,
  href,
  active,
  onActivate,
}: {
  index: string;
  title: string;
  description: string;
  href: string;
  active: boolean;
  onActivate: () => void;
}) {
  const dur = useDur();
  const canHover = useHoverCapable();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: dur(0.55), delay: dur(Number(index) * 0.07), ease: EASE_OUT }}
    >
      <Link
        href={href}
        onMouseEnter={() => {
          onActivate();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onFocus={onActivate}
        className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-foreground/10 py-8 lg:py-10"
      >
        <span className="font-mono text-[11px] tabular-nums tracking-widest text-muted-foreground/70">
          {index}
        </span>

        <span className="min-w-0">
          <span
            className={cn(
              "block font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-tight transition-colors duration-300",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {title}
          </span>
          <span className="mt-2 block max-w-md text-sm leading-relaxed text-muted-foreground">
            {description}
          </span>
          {/* register rule — grows under the active row */}
          <span
            aria-hidden
            className={cn(
              "mt-4 block h-px origin-left bg-primary transition-transform duration-500",
              active ? "w-8 scale-x-100" : "w-8 scale-x-0",
            )}
          />
        </span>

        <ArrowUpRight
          aria-hidden
          className={cn(
            "size-5 self-start text-foreground transition-transform duration-300",
            canHover && hovered && "translate-x-0.5 -translate-y-0.5",
          )}
        />
      </Link>
    </motion.div>
  );
}
