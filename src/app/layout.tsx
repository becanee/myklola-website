import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import React from "react"
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const SITE_NAME = 'Klola Indonesia';
const APP_DESCRIPTION = 'Managing People. Anywhere. Anytime';
const APP_URL = 'https://myklola.cloud';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'Klola',
    'Klola Indonesia',
    'HRIS',
    'payroll',
    'manajemen SDM',
    'outsourcing',
    'HR software Indonesia',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    countryName: 'Indonesia',
    title: `${SITE_NAME}`,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/logo-blue.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME}`,
    description: APP_DESCRIPTION,
    images: ['/logo-blue.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.ico', type: 'image/png', sizes: '512x512' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Entrance animations start from opacity 0. Without JS they never
            run, so every animated line would stay invisible. */}
        <noscript>
          <style>{`main *{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
