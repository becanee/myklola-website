"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      {/* Overlay primary untuk keterbacaan teks */}
      <div className="absolute inset-0 pointer-events-none bg-primary/90" />
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-foreground/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28 w-full mt-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <h1
              className={`text-4xl sm:text-5xl lg:text-[3.4rem] font-display leading-[1.1] tracking-tight transition-all duration-1000 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
            >
              Tingkatkan Efisiensi HR Perusahaan Anda{" "}
              <span className="text-warning">dengan Klola Indonesia</span>
            </h1>
            <p
              className={`mt-6 text-lg leading-relaxed text-white/90 transition-all duration-1000 delay-150 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            >
              <strong>Managing people Anywhere, Anytime.</strong>
              <br />
              <br />
              myklola adalah sistem manajemen HR terintegrasi yang dapat mengotomasikan proses administrasi karyawan melalui solusi modular, sehingga sistem internal perusahaan dapat terhubung secara fleksibel dan mudah disesuaikan dengan kebutuhan bisnis.
            </p>
            <Link
              href="/request-demo"
              className="mt-8 mr-4 inline-flex items-center gap-2 rounded-md bg-white text-primary px-6 py-3 font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Permintaan Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image — transparent cut-out, so it sits straight on the navy
              field with no card behind it. Shown at every breakpoint: on
              mobile it stacks under the copy rather than disappearing. */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Image
              src="/hero-image.png"
              alt="Karyawan membuka aplikasi myKlola di ponsel didampingi dasbor HR di komputer"
              width={1512}
              height={1232}
              sizes="(min-width: 1024px) 46vw, 92vw"
              priority
              className="mx-auto h-auto w-full max-w-[420px] lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
