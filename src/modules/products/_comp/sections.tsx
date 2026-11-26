"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, HeroShell, SpecimenPlate } from "./atoms";
import type { ProductContent } from "./content";

/**
 * Hero and CTA are structurally identical across all four products — the
 * differences are data. These wrappers keep each product's `_comp/hero.tsx`
 * and `_comp/cta.tsx` in the requested layout while the markup lives once.
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
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
          >
            Permintaan Demo
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-foreground/15 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors duration-300 hover:border-foreground/40"
          >
            Semua produk
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
