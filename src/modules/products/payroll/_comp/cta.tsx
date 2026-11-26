"use client";

import { ProductCta } from "@/modules/products/_comp/sections";
import type { ProductContent } from "@/modules/products/_comp/content";

export function Cta({ product }: { product: ProductContent }) {
  return <ProductCta product={product} />;
}
