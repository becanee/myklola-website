"use client";

import {
  EssBand,
  FeaturesShell,
} from "@/modules/products/_comp/atoms";
import {
  ESS_CONTENT,
  type ProductContent,
} from "@/modules/products/_comp/content";

/**
 * HRIS owns the ESS story: Employee Self-Service is presented as a capability
 * inside HRIS, never as a separate product or route.
 */
export function Features({ product }: { product: ProductContent }) {
  return (
    <FeaturesShell
      eyebrowLabel={product.features.eyebrow}
      statement={product.features.statement}
      intro={product.features.intro}
      items={product.features.items}
    >
      <EssBand
        title={ESS_CONTENT.title}
        intro={ESS_CONTENT.intro}
        tiles={ESS_CONTENT.tiles}
        note={ESS_CONTENT.note}
      />
    </FeaturesShell>
  );
}
