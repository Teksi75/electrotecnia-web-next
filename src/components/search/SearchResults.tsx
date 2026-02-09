import Link from "next/link";

import type { SearchEntry } from "@/lib/search";

type SearchResultsProps = {
  items: SearchEntry[];
  emptyText: string;
  onSelect: () => void;
};

export function SearchResults({ items, emptyText, onSelect }: SearchResultsProps) {
  return (
    <div className="absolute right-0 z-20 mt-2 w-full rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {items.length ? (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onSelect}
                className="block rounded-md px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="line-clamp-1 text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-2 py-1 text-sm text-slate-500 dark:text-slate-400">{emptyText}</p>
      )}
    </div>
  );
}
