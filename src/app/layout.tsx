import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { headline, profile, site } from "@/content";
import { PixelField } from "@/components/pixel-field";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Both faces are self-hosted at build time by next/font: no request to Google
// at runtime, and size-adjusted fallbacks so the swap does not shift layout.
// Mono is the voice of the interface; the sans is kept for running prose.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${profile.name}, backend and platform engineer`,
    template: `%s, ${profile.name}`,
  },
  description: headline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    title: profile.name,
    description: headline,
  },
};

export const viewport: Viewport = {
  themeColor: [{ color: "#fafafa" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrains.variable}`}>
      <body className="text-ink">
        <a
          href="#main"
          className="control bg-ground sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-14 focus-visible:left-3 focus-visible:z-30 print:hidden"
        >
          Skip to content
        </a>
        <PixelField />
        <SiteHeader />
        <div className="mx-auto max-w-[78rem] p-2.5">
          <main
            id="main"
            className="grid grid-cols-1 gap-2.5 md:grid-cols-12 print:grid-cols-12"
          >
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
