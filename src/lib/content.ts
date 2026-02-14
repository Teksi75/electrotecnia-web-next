import path from "node:path";
import { cache } from "react";

import { getMdxBySlug, getMdxBySlugUncached } from "@/lib/mdx";
import { parseMdxSections } from "@/lib/mdxSections";
import type { TopicContent } from "@/types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "electricidad");

export const getAllTopicSlugs = cache(async () => {
  const fs = await import("node:fs/promises");
  const files = await fs.readdir(CONTENT_ROOT);
  return [...new Set(files.filter((file) => /\.(json|mdx)$/.test(file)).map((file) => file.replace(/\.(json|mdx)$/, "")))].sort();
});

async function readTopicContentBySlug(slug: string, useUncachedMdx = false): Promise<TopicContent | null> {
  const mdxTopic = useUncachedMdx ? await getMdxBySlugUncached("electricidad", slug) : await getMdxBySlug("electricidad", slug);

  if (mdxTopic) {
    return {
      title: mdxTopic.frontmatter.title,
      description: mdxTopic.frontmatter.description,
      part: mdxTopic.frontmatter.part,
      order: mdxTopic.frontmatter.order,
      ...parseMdxSections(mdxTopic.content),
    };
  }

  const fs = await import("node:fs/promises");
  const filePath = path.join(CONTENT_ROOT, `${slug}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as TopicContent;
  } catch {
    return null;
  }
}

export const getTopicContentBySlug = cache(async (slug: string): Promise<TopicContent | null> => readTopicContentBySlug(slug));

export const getTopicContentBySlugUncached = (slug: string): Promise<TopicContent | null> => readTopicContentBySlug(slug, true);

