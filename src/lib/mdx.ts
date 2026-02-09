import path from "node:path";
import fs from "node:fs/promises";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache, createElement } from "react";
import remarkGfm from "remark-gfm";

import { getTopicNodes } from "@/lib/nav";

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

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const getAllDocSlugs = cache(async () => {
  return getTopicNodes()
    .filter((node) => node.isPage)
    .map((node) => node.slug);
});

export const getDocBySlug = cache(async (slug: string): Promise<DocRecord | null> => {
  const filePath = path.join(CONTENT_ROOT, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);

    return {
      slug,
      filePath,
      frontmatter: parsed.data as DocFrontmatter,
      source: parsed.content,
    };
  } catch {
    return null;
  }
});

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: {
      h3: ({ children }) => {
        const text = String(children);
        return createElement("h3", { id: slugifyHeading(text) }, children);
      },
    },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
