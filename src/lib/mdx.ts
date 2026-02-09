import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import remarkGfm from "remark-gfm";

export type DocFrontmatter = {
  title: string;
  part: 1 | 2;
  order: number;
  description: string;
};

type DocRecord = {
  slug: string;
  filePath: string;
  frontmatter: DocFrontmatter;
  source: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "electricidad");

async function walkDir(dir: string): Promise<string[]> {
  const entries = await import("node:fs/promises").then((fs) =>
    fs.readdir(dir, { withFileTypes: true }),
  );

  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkDir(resolved);
      }
      if (entry.isFile() && resolved.endsWith(".mdx")) {
        return [resolved];
      }
      return [] as string[];
    }),
  );

  return files.flat();
}

const getSlugMap = cache(async () => {
  const filePaths = await walkDir(CONTENT_ROOT);
  return new Map(filePaths.map((filePath) => [path.basename(filePath, ".mdx"), filePath]));
});

export const getAllDocSlugs = cache(async () => {
  const slugMap = await getSlugMap();
  return [...slugMap.keys()].sort();
});

export const getDocBySlug = cache(async (slug: string): Promise<DocRecord | null> => {
  const slugMap = await getSlugMap();
  const filePath = slugMap.get(slug);

  if (!filePath) {
    return null;
  }

  const fs = await import("node:fs/promises");
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);

  return {
    slug,
    filePath,
    frontmatter: parsed.data as DocFrontmatter,
    source: parsed.content,
  };
});

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
