import Link from "next/link";

import type { ContentNode } from "@/types";

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
    <nav className="mt-12 grid gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:grid-cols-2">
      <div>
        {prev ? (
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href={prev.href}>← {prev.title}</Link>
          </Button>
        ) : null}
      </div>
      <div>
        {next ? (
          <Button asChild variant="outline" className="w-full justify-end">
            <Link href={next.href}>{next.title} →</Link>
          </Button>
        ) : null}
      </div>
    </nav>
  );
}
