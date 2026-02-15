import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getSearchIndex } from "@/lib/search";

import { SearchBox } from "@/components/search/SearchBox";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export async function Header() {
  const searchIndex = await getSearchIndex();

  return (
    <header className="border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          <Link href="/" className="text-base font-bold tracking-tight sm:text-lg">
            {siteConfig.name}
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <Link href="/unidad/electricidad" className="hover:text-foreground">
              Unidad: Electricidad
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <SearchBox items={searchIndex} />
            <ThemeToggle />
          </div>
        </div>
        <p className="pb-3 text-sm text-muted-foreground sm:text-base">
          Esta web es un servicio de
          <a
            href="https://ingenium-web.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-block font-semibold tracking-[0.28em] text-amber-700/90 transition-colors hover:text-amber-600"
          >
            INGENIUM
          </a>
        </p>
      </div>
    </header>
  );
}
