"use client";

import { FeaturesShell } from "@/modules/products/_comp/atoms";
import type { ProductContent } from "@/modules/products/_comp/content";

export function Features({ product }: { product: ProductContent }) {
  return (
    <FeaturesShell
      eyebrowLabel={product.features.eyebrow}
      statement={product.features.statement}
      intro={product.features.intro}
      items={product.features.items}
    />
  );
}
