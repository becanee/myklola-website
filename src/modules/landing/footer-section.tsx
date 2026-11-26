"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Core HRIS", href: "/products/hris" },
    {
      name: "Payroll",
      href: "/products/payroll",
    },
    {
      name: "Performance",
      href: "/products/pm",
    },
    {
      name: "Recruitment+",
      href: "/products/recplus",
    },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Clients", href: "/clients" },
    {
      name: "Careers",
      href: "/careers",
      badge: "Hiring",
    },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ],
};


export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="block">
                  <img src="/logo-blue.png" alt="Klola Logo" className="w-40 -mt-8" />
                  <p className="text-bolder leading-relaxed  max-w-xs">
                    Managing people Anywhere, Anytime
                  </p>
                </div>
              </a>

              <p className="text-bolder  max-w-xs">
                Jakarta Indonesia,  (021) 75922910
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Pondok Indah Office Tower 2, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310
              </p>

              {/* Social Links */}
              {/* <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div> */}
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PT. Klola Indonesia. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              Proudly made in Indonesia.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
