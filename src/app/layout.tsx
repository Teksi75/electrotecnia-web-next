import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { siteConfig } from "@/config/site";
import { BASE_URL } from "@/lib/seo";

import "katex/dist/katex.min.css";
import "./globals.css";

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
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="pb-12">{children}</div>
            <footer className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800">
              Material de consulta (Electrotecnia)
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
