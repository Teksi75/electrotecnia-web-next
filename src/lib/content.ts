import path from "node:path";
import { cache } from "react";

import { splitBlockMath, tokenizeInlineMath } from "@/lib/mathTokens";
import { getMdxBySlug } from "@/lib/mdx";
import type { ContentBlock, ContentNode, TopicContent } from "@/types";

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

function getBlockType(heading: string): ContentBlock["type"] {
  if (heading === "Idea clave") return "ideaClave";
  if (heading === "Mini explicación" || heading === "Explicación") return "explicacion";
  if (heading === "Ejemplo numérico (SI)") return "ejemplo";
  return "formulas";
}

function createNodes(text: string, mono = false): ContentNode[] {
  return splitBlockMath(text)
    .map((segment) => {
      if (segment.kind === "blockMath") {
        return { kind: "mathBlock", latex: segment.latex } as ContentNode;
      }

      if (!segment.text.trim()) {
        return null;
      }

      return {
        kind: "paragraph",
        mono,
        tokens: tokenizeInlineMath(segment.text.trim()),
      } as ContentNode;
    })
    .filter((node): node is ContentNode => node !== null);
}

function makeBlock(title: string, body: string, mono = false): ContentBlock {
  return {
    type: getBlockType(title),
    title,
    body,
    bodyTokens: tokenizeInlineMath(body),
    nodes: createNodes(body, mono),
    mono,
  };
}

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
      const type = getBlockType(currentMain);
      blocks.push(makeBlock(currentMain, text, type === "ejemplo"));
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
          blocks: currentSection.lines.map((body, index) => makeBlock(index === 0 ? "Explicación" : "Ejemplo numérico (SI)", body, index > 0)),
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
      blocks: currentSection.lines.map((body, index) => makeBlock(index === 0 ? "Explicación" : "Ejemplo numérico (SI)", body, index > 0)),
    });
  }

  return { blocks, sections: sections.length ? sections : undefined };
}
