"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  image: string;
  highlight?: string;
}

const products: Product[] = [
  {
    id: "klola-cloud",
    title: "Klola Cloud",
    description:
      "Nikmati kemerdekaan dan fleksibilitas lebih untuk bekerja dan mengelola organisasi dari mana saja dan kapan saja. Cukup dengan koneksi internet, pengelolaan SDM dengan mudah dilakukan dimanapun dan kapanpun.",
    features: [
      "Informasi SDM",
      "Payroll Administration",
      "Kompensasi & Fasilitas (Benefits)",
      "Time Attendance",
      "Organization Structure & Job Description",
    ],
    href: "https://klola.id/product/klola-cloud",
    image: "/klola-cloud.jpeg",
  },
  {
    id: "payroll-outsourcing",
    title: "Payroll Outsourcing",
    description:
      "Payroll Outsourcing adalah layanan Klola untuk membantu kebutuhan khusus organisasi dalam mengadministrasikan perhitungan dan pelaporan payroll (PPh21). Dengan dukungan konsultan berpengalaman, kami menyediakan jasa administrasi payroll yang cepat dan dapat diandalkan.",
    features: [
      "Data Security & Protection",
      "Handal",
      "Proses perhitungan payroll yang akurat",
    ],
    href: "https://klola.id/product/payroll-outsourcing",
    image: "/payroll-outsourcing.jpeg",
  },
  {
    id: "klola-pm",
    title: "Sistem Manajemen Kinerja",
    description:
      "Alat untuk mengelola kinerja karyawan perusahaan dengan Klola. Berdayakan karyawan dengan tujuan jelas, umpan balik berkelanjutan, dan data kinerja yang informatif.",
    features: [
      "Penetapan & Penyelarasan Tujuan",
      "Tinjauan Kinerja",
      "Umpan Balik Berkelanjutan",
      "Pelacakan Kinerja",
      "Pelaporan & Analisis",
    ],
    href: "https://klola.id/product/klola-pm",
    image: "/klola-pm.png",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductSections() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="products" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Oversized ghost numeral */}
      {/* <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-8 left-0 font-mono text-[clamp(12rem,30vw,26rem)] leading-none tracking-tight text-foreground/[0.03]"
      >
        Products
      </span> */}

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex items-center justify-between gap-6 mb-16 lg:mb-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-foreground/25" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Produk Kami
            </span>
          </div>
          <span className="font-mono text-xs text-muted-foreground/70 hidden sm:block">
            {String(products.length).padStart(2, "0")} / produk
          </span>
        </div>

        {/* Product rows */}
        <div className="space-y-28 lg:space-y-36">
          {products.map((p, i) => {
            const isOdd = i % 2 === 0; // first/third left, second right
            const ArrowIcon = isOdd ? ArrowUpRight : ArrowDownRight;
            return (
              <motion.article
                key={p.id}
                initial={prefersReduced ? false : { opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className={`group grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isOdd ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                {/* Image — larger, framed, hover zoom */}
                <div className="lg:col-span-7 relative">
                  <motion.div
                    className="relative overflow-hidden rounded-xl"
                    whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={1200}
                      height={800}
                      sizes="(min-width: 1024px) 50vw, 90vw"
                      className="w-full h-auto object-cover"
                      priority={i === 0}
                    />
                    {/* clipping frame line */}
                    <div className="pointer-events-none absolute inset-0 border border-foreground/10" />
                  </motion.div>
                  {/* index badge — pinned corner of image */}
                  <span className="absolute top-4 left-4 font-mono text-xs text-white/90 mix-blend-difference tracking-widest">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Copy — numbered anchor, left/right alternating */}
                <div className="lg:col-span-5">
                  <span className="font-mono text-xs tracking-widest text-primary mb-4 block">
                    {p.id}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-px w-4 bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                                    <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary transition-all hover:gap-3"
                  >
                    Lihat produk
                    <ArrowIcon className="size-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
