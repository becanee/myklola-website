"use client";

import { ProductVideo } from "@/modules/products/_comp/sections";
import type { ProductContent } from "@/modules/products/_comp/content";

export function Video({ product }: { product: ProductContent }) {
  return <ProductVideo product={product} />;
}