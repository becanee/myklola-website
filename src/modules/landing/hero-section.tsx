"use client";

import { ArrowRight } from "lucide-react";
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <h1
              className={`text-4xl sm:text-5xl lg:text-[3.4rem] font-display leading-[1.1] tracking-tight transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              HR Management System &{" "}
              <span className="text-warning">Payroll Software</span>
            </h1>
            <p
              className={`mt-6 text-lg leading-relaxed text-white/90 transition-all duration-1000 delay-150 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <strong>Manajemen SDM. Dari mana saja. Kapan saja.</strong>
              <br />
              <br />
              Klola membantu pengelolaan SDM di dalam organisasi menjadi mudah,
              cepat dan akurat.
            </p>
            <Link
              href="/contact"
              className="mt-8 mr-4 inline-flex items-center gap-2 rounded-md bg-white text-primary px-6 py-3 font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Hubungi Kami
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Video */}
          <div
            className={`hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <video
                width="640"
                height="360"
                controls
                poster="/hero-bg.jpg"
                className="w-full aspect-video bg-primary/70"
              >
                <source src="/klola.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
