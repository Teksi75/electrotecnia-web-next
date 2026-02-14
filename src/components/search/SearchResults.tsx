import Link from "next/link";

import type { SearchEntry } from "@/lib/search";

type SearchResultsProps = {
  items: SearchEntry[];
  emptyText: string;
  onSelect: () => void;
};

export function SearchResults({ items, emptyText, onSelect }: SearchResultsProps) {
  return (
    <div className="absolute right-0 z-20 mt-2 w-full rounded-lg border border-border bg-card p-2 text-card-foreground shadow-lg">
      {items.length ? (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onSelect}
                className="block rounded-md px-2 py-1.5 hover:bg-accent/70"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-2 py-1 text-sm text-muted-foreground">{emptyText}</p>
      )}
    </div>
  );
}
