"use client";

import { ProductHero } from "@/modules/products/_comp/sections";
import type { ProductContent } from "@/modules/products/_comp/content";

export function Hero({ product }: { product: ProductContent }) {
  return <ProductHero product={product} />;
}
