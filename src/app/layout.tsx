import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Syne } from "next/font/google";

import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { siteConfig } from "@/config/site";
import { BASE_URL } from "@/lib/seo";

import "katex/dist/katex.min.css";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${siteConfig.name} | Unidad Electricidad`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Unidad Electricidad`,
    description: siteConfig.description,
    type: "website",
    url: BASE_URL,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${sourceSans.variable} ${syne.variable} ${plexMono.variable} antialiased`}>
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen text-foreground">
            <Header />
            <div id="contenido-principal" tabIndex={-1} className="relative z-10 pb-14">
              {children}
            </div>
            <footer className="border-t border-border/70 bg-card/70 py-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Material de consulta
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Electrotecnia · enfoque práctico y navegable</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
