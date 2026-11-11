import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { headline, profile, site } from "@/content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Both faces are self-hosted at build time by next/font: no request to Google
// at runtime, and size-adjusted fallbacks so the swap does not shift layout.
// The width axis is what lets one family carry display, text and labels.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
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
  themeColor: [{ color: "#0e1113" }],
};

// Runs before first paint. Dark is the default; a stored choice overrides it.
// Key must match STORAGE_KEY in theme-toggle.tsx.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${archivo.variable} ${martian.variable}`}
      // The inline script may change data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-ground text-ink">
        <a
          href="#main"
          className="control bg-ground sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-10 print:hidden"
        >
          Skip to content
        </a>
        <div className="mx-auto max-w-[72rem] px-5 sm:px-8">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
