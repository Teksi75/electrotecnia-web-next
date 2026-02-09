import { cache } from "react";

import { getDocBySlug } from "@/lib/mdx";
import { getAllIndexableNodes } from "@/lib/nav";
import { stripMarkdown } from "@/lib/text";

export type SearchEntry = {
  title: string;
  href: string;
  description: string;
  bodyPlain: string;
};

export const getSearchIndex = cache(async (): Promise<SearchEntry[]> => {
  const nodes = getAllIndexableNodes();
  const uniqueSlugs = [...new Set(nodes.filter((node) => node.isPage).map((node) => node.slug))];

  const docs = await Promise.all(uniqueSlugs.map((slug) => getDocBySlug(slug)));
  const docMap = new Map(
    docs
      .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc))
      .map((doc) => [doc.slug, doc]),
  );

  return nodes.map((node) => {
    const pageSlug = node.isPage ? node.slug : node.href.split("#")[0].split("/").pop() ?? "";
    const doc = docMap.get(pageSlug);

    return {
      title: node.title,
      href: node.href,
      description: node.description,
      bodyPlain: doc ? stripMarkdown(doc.source) : "",
    };
  });
});

export async function searchContent(query: string, maxResults = 8) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const index = await getSearchIndex();

  return index
    .filter((entry) => {
      return [entry.title, entry.description, entry.bodyPlain]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    })
    .slice(0, maxResults);
}
