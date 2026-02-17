import Link from "next/link";

import type { ContentNode } from "@/content/nav";

import { Button } from "@/components/ui/Button";

type PrevNextProps = {
  prev: ContentNode | null;
  next: ContentNode | null;
};

export function PrevNext({ prev, next }: PrevNextProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="mt-12 grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-2">
      <div>
        {prev ? (
          <Button asChild variant="outline" className="h-11 w-full justify-start rounded-2xl">
            <Link href={prev.href}>← {prev.title}</Link>
          </Button>
        ) : null}
      </div>
      <div>
        {next ? (
          <Button asChild variant="outline" className="h-11 w-full justify-end rounded-2xl">
            <Link href={next.href}>{next.title} →</Link>
          </Button>
        ) : null}
      </div>
    </nav>
  );
}
