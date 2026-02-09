import path from "node:path";
import { cache } from "react";

import type { TopicDocument } from "@/types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "electricidad");

export const getAllTopicSlugs = cache(async () => {
  const fs = await import("node:fs/promises");
  const entries = await fs.readdir(CONTENT_ROOT, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name.replace(/\.json$/, ""))
    .sort();
});

export const getTopicBySlug = cache(async (slug: string): Promise<TopicDocument | null> => {
  const fs = await import("node:fs/promises");
  const filePath = path.join(CONTENT_ROOT, `${slug}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as TopicDocument;
  } catch {
    return null;
  }
});

export function blocksToPlainText(doc: TopicDocument): string {
  const base = doc.blocks.flatMap((block) => [block.body ?? "", ...(block.items ?? [])]);
  const sectionText = (doc.sections ?? []).flatMap((section) =>
    section.blocks.flatMap((block) => [block.body ?? "", ...(block.items ?? [])]),
  );

  return [...base, ...sectionText].join(" ").replace(/\s+/g, " ").trim();
}
