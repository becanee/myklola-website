"use client";

import { BarChart3, Clock, Headphones, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

const services = [
  {
    icon: Clock,
    title: "Efisiensi Waktu",
    description:
      "Klola membantu meningkatkan efisiensi dan efektifitas pengelolaan administrasi SDM, sehingga perusahaan dapat fokus pada aktivitas-aktivitas yang memiliki nilai tambah lebih.",
  },
  {
    icon: ShieldCheck,
    title: "Kepatuhan Terhadap Peraturan",
    description:
      "Klola membantu pengelolaan SDM di dalam organisasi mematuhi peraturan pemerintah dan selaras dengan best-practices.",
  },
  {
    icon: BarChart3,
    title: "Informasi Komprehensif",
    description:
      "Klola menghasilkan informasi yang komprehensif mengenai pengelolaan SDM di perusahaan. Dengan dukungan teknologi, kami menyediakan informasi berkualitas bernilai-tambah.",
  },
  {
    icon: Headphones,
    title: "Dukungan",
    description:
      "Klola didukung oleh tim yang memiliki pengalaman mendalam dalam membangun, mengimplementasikan dan menangani berbagai kebutuhan organisasi terkait pengelolaan SDM.",
  },
];

export function ServicesSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="how-it-works" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Oversized ghost numeral — subtle depth, not decoration spam */}
      {/* <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 right-0 font-mono text-[clamp(12rem,30vw,26rem)] leading-none tracking-tight text-foreground/[0.035]"
      >
        Services
      </span> */}

      <div ref={ref} className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Editorial eyebrow */}
        <div className="flex items-center gap-4 mb-10">
          <span className="h-px w-12 bg-foreground/25" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Mengapa memilih Klola
          </p>
        </div>

        {/* Display headline — pair of large serif lines */}
        <h2 className="max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.02] tracking-tight">
          <motion.span
            className="block text-foreground"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Bukan sekadar
          </motion.span>
          <motion.span
            className="block text-foreground/50"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            mengelola SDM.
          </motion.span>
        </h2>

        {/* Services grid — hairline divided rows */}
        <div className="mt-20 grid sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            const idx = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={service.title}
                className={`group relative border-t border-foreground/10 py-10 sm:py-12 pr-8 ${
                  i % 2 === 1 ? "sm:pl-12 sm:border-l" : ""
                }`}
                initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* corner arrow — appears on hover */}
                <ArrowUpRight className="absolute top-7 right-0 size-5 text-foreground opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground/70">
                    {idx}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.03] text-foreground transition-colors duration-500 group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-display text-xl tracking-tight text-foreground transition-transform duration-500 group-hover:-translate-y-0.5">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* hover underline sweep */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
