import path from "node:path";
import { cache } from "react";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export type MdxFrontmatter = {
  title: string;
  description: string;
  part: 1 | 2;
  order: number;
};

export type MdxTopic = {
  slug: string;
  frontmatter: MdxFrontmatter;
  content: string;
};

function parseScalar(value: string): string | number {
  const trimmed = value.trim();
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  return trimmed.replace(/^['\"]|['\"]$/g, "");
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { frontmatter: null, content: raw };
  }

  const frontmatterLines = match[1].split("\n").filter(Boolean);
  const frontmatter: Record<string, string | number> = {};

  for (const line of frontmatterLines) {
    const splitIndex = line.indexOf(":");
    if (splitIndex === -1) continue;

    const key = line.slice(0, splitIndex).trim();
    const value = line.slice(splitIndex + 1);
    frontmatter[key] = parseScalar(value);
  }

  return {
    frontmatter: frontmatter as Partial<MdxFrontmatter>,
    content: raw.slice(match[0].length),
  };
}

export const getAllMdxSlugs = cache(async (unit: string) => {
  const fs = await import("node:fs/promises");
  const unitPath = path.join(CONTENT_ROOT, unit);
  const files = await fs.readdir(unitPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
});

export const getMdxBySlug = cache(async (unit: string, slug: string): Promise<MdxTopic | null> => {
  const fs = await import("node:fs/promises");
  const filePath = path.join(CONTENT_ROOT, unit, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { frontmatter, content } = parseFrontmatter(raw);

    if (!frontmatter?.title || !frontmatter.description || !frontmatter.part || frontmatter.order === undefined) {
      return null;
    }

    return {
      slug,
      frontmatter: {
        title: frontmatter.title,
        description: frontmatter.description,
        part: Number(frontmatter.part) as 1 | 2,
        order: Number(frontmatter.order),
      },
      content,
    };
  } catch {
    return null;
  }
});
