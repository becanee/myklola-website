"use client";

import { productBySlug } from "@/modules/products/_comp/content";
import { Cta } from "./_comp/cta";
import { Features } from "./_comp/features";
import { Hero } from "./_comp/hero";

const product = productBySlug("pm");

export default function PmModules() {
  return (
    <main>
      <Hero product={product} />
      <Features product={product} />
      <Cta product={product} />
    </main>
  );
}
