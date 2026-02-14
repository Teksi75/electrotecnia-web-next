import path from "node:path";
import { cache } from "react";

import { getMdxBySlug } from "@/lib/mdx";
import type { TopicContent } from "@/types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "electricidad");

export const getAllTopicSlugs = cache(async () => {
  const fs = await import("node:fs/promises");
  const files = await fs.readdir(CONTENT_ROOT);
  return [...new Set(files.filter((file) => /\.(json|mdx)$/.test(file)).map((file) => file.replace(/\.(json|mdx)$/, "")))].sort();
});

export const getTopicContentBySlug = cache(async (slug: string): Promise<TopicContent | null> => {
  const mdxTopic = await getMdxBySlug("electricidad", slug);

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
});

function parseMdxSections(content: string): Pick<TopicContent, "blocks" | "sections"> {
  const lines = content.split("\n");
  const blocks: TopicContent["blocks"] = [];
  const sections: NonNullable<TopicContent["sections"]> = [];
  let currentMain: string | null = null;
  let currentSection: { id: string; title: string; lines: string[] } | null = null;
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join("\n").trim();
    if (!text) {
      buffer = [];
      return;
    }

    if (currentSection) {
      currentSection.lines.push(text);
    } else if (currentMain) {
      const type = currentMain === "Idea clave" ? "idea" : currentMain === "Mini explicación" ? "explain" : currentMain === "Ejemplo numérico (SI)" ? "example" : "formulas";
      blocks.push({ type, title: currentMain, body: text, mono: type === "example" });
    }

    buffer = [];
  };

  for (const line of lines) {
    const mainHeading = line.match(/^##\s+(.+)$/);
    if (mainHeading) {
      flush();
      currentSection = null;
      currentMain = mainHeading[1].trim();
      continue;
    }

    const subHeading = line.match(/^###\s+(.+?)\s+\{#([\w-]+)\}\s*$/);
    if (subHeading) {
      flush();
      if (currentSection) {
        sections.push({
          id: currentSection.id,
          title: currentSection.title,
          blocks: currentSection.lines.map((body, index) => ({ type: index === 0 ? "explain" : "example", title: index === 0 ? "Explicación" : "Ejemplo", body, mono: index > 0 })),
        });
      }
      currentSection = { id: subHeading[2], title: subHeading[1], lines: [] };
      continue;
    }

    if (!line.trim()) {
      buffer.push("");
      continue;
    }

    buffer.push(line.replace(/^\-\s+/, ""));
  }

  flush();
  if (currentSection) {
    sections.push({
      id: currentSection.id,
      title: currentSection.title,
      blocks: currentSection.lines.map((body, index) => ({ type: index === 0 ? "explain" : "example", title: index === 0 ? "Explicación" : "Ejemplo", body, mono: index > 0 })),
    });
  }

  return { blocks, sections: sections.length ? sections : undefined };
}
