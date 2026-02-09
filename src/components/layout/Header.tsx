import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getSearchIndex } from "@/lib/search";

import { SearchBox } from "@/components/search/SearchBox";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export async function Header() {
  const searchIndex = await getSearchIndex();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-bold tracking-tight sm:text-lg">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <Link href="/unidad/electricidad" className="hover:text-slate-900 dark:hover:text-white">
            Unidad: Electricidad
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchBox items={searchIndex} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
