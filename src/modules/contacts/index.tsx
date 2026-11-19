"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./comp-form";
const channels = [
  {
    number: "01",
    label: "General Email",
    value: "helpdesk@klola.id | sales@klola.id",
    desc: "For questions & business partnerships",
  },
  {
    number: "02",
    label: "Address",
    value:
      "Pondok Indah Office Tower 2, 17th Fl. Jl. Sultan Iskandar Muda Kav. V-TA Pondok Indah Jakarta Selatan 12310",
    desc: "For official correspondence & document delivery",
  },
  {
    number: "03",
    label: "Office Hours",
    value: "Monday – Friday",
    desc: "09:00 – 18:00 WIB (UTC+7)",
  },
];

function ScrollReveal({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {children}
    </div>
  );
}

function ChannelCard({
  channel,
  index,
}: {
  channel: (typeof channels)[0];
  index: number;
}) {
  return (
    <ScrollReveal index={index}>
      <div className="group relative flex gap-6 py-8 border-b border-foreground/10 last:border-b-0">
        {/* Number */}
        <span className="shrink-0 font-mono text-sm text-muted-foreground pt-1 group-hover:text-foreground/80 transition-colors duration-500">
          {channel.number}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl lg:text-2xl font-display mb-1 group-hover:-translate-x-2 transition-transform duration-500">
            {channel.label}
          </h3>
          <p className="text-sm text-foreground/80 font-mono mb-1">
            {channel.value}
          </p>
          <p className="text-sm text-muted-foreground">{channel.desc}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ContactModules() {
  return (
    <main>
      {/* Hero block */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <ScrollReveal>
          <div className="flex items-start gap-8">
            <span className="font-mono text-sm text-muted-foreground shrink-0 hidden sm:block mt-0.5">
              04
            </span>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-instrument tracking-tight text-foreground">
                Contact us
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-lg">
                Fill in the form to send us a message directly, or reach us
                through any of the channels below.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Channel cards — sama pola dengan features-section.tsx */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
        {channels.map((ch, i) => (
          <ChannelCard key={ch.number} channel={ch} index={i} />
        ))}
      </section>

      {/* Form section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-start gap-8">
            <span className="font-mono text-sm text-muted-foreground shrink-0 hidden sm:block mt-0.5">
              05
            </span>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-instrument tracking-tight text-foreground mb-8">
                Send a message
              </h2>
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}