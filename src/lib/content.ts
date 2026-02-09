import path from "node:path";
import { cache } from "react";

import type { TopicContent } from "@/types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "electricidad");

async function readTopicFiles() {
  const fs = await import("node:fs/promises");
  const files = await fs.readdir(CONTENT_ROOT);
  return files.filter((file) => file.endsWith(".json") && !file.startsWith("search-index"));
}

export const getAllTopicSlugs = cache(async () => {
  const files = await readTopicFiles();
  return files.map((file) => file.replace(/\.json$/, "")).sort();
});

export const getTopicContentBySlug = cache(async (slug: string): Promise<TopicContent | null> => {
  const fs = await import("node:fs/promises");
  const filePath = path.join(CONTENT_ROOT, `${slug}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as TopicContent;
  } catch {
    return null;
  }
});
