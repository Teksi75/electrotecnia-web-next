import { cache } from "react";

import searchIndexData from "@/content/search-index.json";

export type SearchEntry = {
  title: string;
  href: string;
  description: string;
  bodyPlain: string;
};

export const getSearchIndex = cache(async (): Promise<SearchEntry[]> => {
  return searchIndexData as SearchEntry[];
});

export async function searchContent(query: string, maxResults = 8) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const index = await getSearchIndex();

  return index
    .filter((entry) => [entry.title, entry.description, entry.bodyPlain].join(" ").toLowerCase().includes(normalized))
    .slice(0, maxResults);
}
