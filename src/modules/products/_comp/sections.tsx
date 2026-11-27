"use client";

import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import {
  CtaBand,
  Eyebrow,
  HeroShell,
  SpecimenPlate,
  SpecimenVideo,
  useDur,
} from "./atoms";
import type { ProductContent } from "./content";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";

/**
 * Hero, video and CTA are structurally identical across all four products —
 * the differences are data. These wrappers keep each product's `_comp/*` files
 * in the requested layout while the markup lives once.
 */

export function ProductHero({ product }: { product: ProductContent }) {
  return (
    <HeroShell
      eyebrowIndex={product.index}
      eyebrowLabel={product.hero.eyebrow}
      title={product.hero.title}
      subtitle={product.hero.subtitle}
      actions={
        <>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-foreground/15 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors duration-300 hover:border-foreground/40"
          >
            produk lainnya
            <ArrowUpLeft className="size-4" aria-hidden />
          </Link>
        </>
      }
      plate={
        <SpecimenPlate
          src={product.hero.image}
          alt={`Tangkapan layar ${product.longName} Klola — ${product.hero.caption}`}
          width={774}
          height={678}
          caption={product.hero.caption}
          index={product.index}
          priority
        />
      }
    />
  );
}

/**
 * The product clip, as its own band under the hero. Kept out of the hero so
 * the first viewport stays fast and text-led, and so the video gets the full
 * measure instead of half a column.
 */
export function ProductVideo({ product }: { product: ProductContent }) {
  const dur = useDur();

  return (
    <section className="relative overflow-hidden border-b border-foreground/10 py-16 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Eyebrow label="Demo produk" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: dur(0.7), delay: dur(0.1), ease: EASE_OUT }}
          className="mt-8"
        >
          <SpecimenVideo
            src={product.hero.video}
            poster={product.hero.image}
            title={`${product.longName} Klola`}
            caption={product.hero.caption}
            index={product.index}
          />
        </motion.div>
      </div>
    </section>
  );
}

export function ProductCta({ product }: { product: ProductContent }) {
  return (
    <CtaBand
      index={product.index}
      title={product.cta.title}
      body={product.cta.body}
      imageSrc={product.cta.image}
      objectPosition={product.cta.objectPosition}
      caption={product.cta.caption}
    />
  );
}
