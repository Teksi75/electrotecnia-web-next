import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getSearchIndex } from "@/lib/search";

import { SearchBox } from "@/components/search/SearchBox";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export async function Header() {
  const searchIndex = await getSearchIndex();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center gap-3 py-2">
          <Link href="/" className="group inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-card text-xs font-bold tracking-[0.2em] text-[var(--highlight)] transition group-hover:rotate-6"
            >
              E
            </span>
            <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
          </Link>
          <nav className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <Link
              href="/unidad/electricidad"
              className="rounded-full border border-border/70 px-3 py-1.5 transition hover:border-[var(--highlight)] hover:text-foreground"
            >
              Unidad: Electricidad
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <SearchBox items={searchIndex} />
            <ThemeToggle />
          </div>
        </div>
        <p className="pb-4 text-xs uppercase tracking-[0.11em] text-muted-foreground sm:text-sm">
          Esta web es un servicio de
          <a
            href="https://ingenium-web.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-block font-semibold tracking-[0.24em] text-[var(--highlight)] transition-colors hover:brightness-110"
          >
            INGENIUM
          </a>
        </p>
      </div>
    </header>
  );
}
