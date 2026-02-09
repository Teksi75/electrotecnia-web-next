"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { SearchEntry } from "@/lib/search";

import { SearchResults } from "@/components/search/SearchResults";
import { Input } from "@/components/ui/Input";

type SearchBoxProps = {
  items: SearchEntry[];
};

export function SearchBox({ items }: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    return items
      .filter((item) =>
        [item.title, item.description, item.bodyPlain].join(" ").toLowerCase().includes(normalized),
      )
      .slice(0, 8);
  }, [items, query]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (results[0]) {
      router.push(results[0].href);
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative z-30 w-64 max-w-[65vw]">
      <form onSubmit={onSubmit}>
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar en la unidad..."
          className="h-9"
          aria-label="Buscar contenido"
        />
      </form>

      {open && query.trim() ? (
        <SearchResults onSelect={() => setOpen(false)} items={results} emptyText="Sin coincidencias" />
      ) : null}

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-10 cursor-default"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
