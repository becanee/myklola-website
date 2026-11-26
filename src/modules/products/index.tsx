"use client";

import {
  Eyebrow,
  OverviewRow,
  PreviewSwap,
  SpecimenPlate,
  useDur,
} from "@/modules/products/_comp/atoms";
import {
  CONNECTIONS,
  PRODUCTS,
  type ProductContent,
} from "@/modules/products/_comp/content";
import { ProductCta } from "@/modules/products/_comp/sections";
import { EASE_OUT } from "@/lib/ease";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type Slug = ProductContent["slug"];

/** The overview has no single product to close with, so it gets its own copy. */
const OVERVIEW_CTA = {
  ...PRODUCTS[0],
  index: "00",
  cta: {
    title: "Empat modul, satu demo.",
    body: "Kami tunjukkan alurnya dengan data contoh — bukan slide. Pilih modul yang paling mendesak, sisanya menyusul.",
    image: PRODUCTS[0].cta.image,
    objectPosition: "object-[44%_30%] lg:object-[56%_34%]",
    caption: "Karyawan membuka myKlola di ponsel",
  },
} satisfies ProductContent;

export default function ProductsOverview() {
  const dur = useDur();
  const [active, setActive] = useState<Slug>("hris");
  const current = PRODUCTS.find((p) => p.slug === active) ?? PRODUCTS[0];

  return (
    <main className="overflow-hidden">
      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-32 lg:px-10 lg:pb-14 lg:pt-44">
        <Eyebrow label="Index / Products" />

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.8), delay: dur(0.15), ease: EASE_OUT }}
          className="mt-7 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] tracking-tight text-foreground"
        >
          Empat modul.
          <br />
          <span className="text-muted-foreground">Satu catatan kepegawaian.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.7), delay: dur(0.28), ease: EASE_OUT }}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
        >
          Klola disusun seperti meja kerja HR: satu tempat untuk mencatat orang,
          menghitung gaji, menilai kinerja, dan mendatangkan orang baru. Setiap
          modul bisa dipakai sendiri; bersama, datanya mengalir.
        </motion.p>
      </section>

      {/* Contents list + sticky specimen */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {PRODUCTS.map((product) => (
              <OverviewRow
                key={product.slug}
                index={product.index}
                title={product.name}
                description={product.summary}
                href={`/products/${product.slug}`}
                active={product.slug === active}
                onActivate={() => setActive(product.slug)}
              />
            ))}
            <div className="border-t border-foreground/10" />
          </div>

          {/* Sticky preview — no transform/overflow on ancestors, or sticky dies. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <PreviewSwap activeKey={active}>
                <SpecimenPlate
                  src={current.hero.image}
                  alt={`Tangkapan layar ${current.longName} Klola`}
                  width={774}
                  height={678}
                  caption={current.hero.caption}
                  index={current.index}
                  sizes="(min-width: 1024px) 34vw, 0px"
                />
              </PreviewSwap>

              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Arahkan kursor atau fokuskan baris di sebelah kiri untuk melihat
                tampilan modul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the modules connect */}
      <section className="border-y border-foreground/10 bg-secondary/40 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Eyebrow label="Cara modul terhubung" />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: dur(0.65), delay: dur(0.1), ease: EASE_OUT }}
            className="mt-8 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.8rem)] leading-[1.15] tracking-tight text-foreground"
          >
            Recruitment+ mendatangkan kandidat. HRIS menyimpan profil dan
            kehadirannya. Payroll menghitung dari data yang sama. Performance
            membaca hasilnya.{" "}
            <span className="text-muted-foreground">
              ESS membuka pintu bagi karyawan.
            </span>
          </motion.p>

          <div className="mt-12 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {CONNECTIONS.map((row, i) => {
              const Icon = row.icon;
              return (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: dur(0.55),
                    delay: dur(0.1 + i * 0.06),
                    ease: EASE_OUT,
                  }}
                  className="bg-background p-6"
                >
                  <Icon className="size-4 text-primary" aria-hidden />
                  <h3 className="mt-4 font-display text-lg tracking-tight text-foreground">
                    {row.name}
                  </h3>
                  <dl className="mt-4 space-y-3 text-xs leading-relaxed">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                        Menerima
                      </dt>
                      <dd className="mt-1 text-muted-foreground">{row.receives}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                        Mengirim
                      </dt>
                      <dd className="mt-1 text-muted-foreground">{row.emits}</dd>
                    </div>
                  </dl>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-primary transition-all hover:gap-4"
            >
              Bicarakan kebutuhan tim Anda
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <ProductCta product={OVERVIEW_CTA} />
    </main>
  );
}
