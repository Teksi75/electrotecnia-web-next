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

const getBlockTypeByHeading = (heading: string): ContentBlock["type"] => {
  const normalized = heading.trim().toLowerCase();

  if (normalized === "idea clave") return "idea";
  if (normalized === "mini explicación" || normalized === "explicación") return "explain";
  if (normalized === "ejemplo numérico (si)") return "example";
  if (normalized === "fórmulas" || normalized === "formulas") return "formulas";

  return "formulas";
};

const createNodesFromText = (text: string, mono?: boolean): { bodyTokens?: ContentBlock["bodyTokens"]; nodes?: ContentNode[] } => {
  const hasMath = text.includes("$");

  if (!hasMath) {
    return {
      bodyTokens: tokenizeInlineMath(text),
      nodes: [{ kind: "paragraph", tokens: tokenizeInlineMath(text), mono }],
    };
  }

  const blocks = splitBlockMath(text);
  const nodes: ContentNode[] = [];

  for (const block of blocks) {
    if (block.kind === "blockMath") {
      nodes.push(block);
      continue;
    }

    if (!block.text.trim()) continue;

    nodes.push({ kind: "paragraph", tokens: tokenizeInlineMath(block.text), mono });
  }

  const firstParagraph = nodes.find((node): node is Extract<ContentNode, { kind: "paragraph" }> => node.kind === "paragraph");

  return {
    bodyTokens: firstParagraph?.tokens,
    nodes,
  };
};

function parseMdxSections(content: string): Pick<TopicContent, "blocks" | "sections"> {
  const lines = content.split("\n");
  const blocks: TopicContent["blocks"] = [];
  const sections: NonNullable<TopicContent["sections"]> = [];
  let currentMain: string | null = null;
  let currentSection: { id: string; title: string; lines: string[] } | null = null;
  let buffer: string[] = [];

  const toContentBlock = (title: string, body: string, mono?: boolean): ContentBlock => {
    const type = getBlockTypeByHeading(title);
    return {
      type,
      title,
      body,
      mono: mono ?? type === "example",
      ...createNodesFromText(body, mono ?? type === "example"),
    };
  };

  const flush = () => {
    const text = buffer.join("\n").trim();
    if (!text) {
      buffer = [];
      return;
    }

    if (currentSection) {
      currentSection.lines.push(text);
    } else if (currentMain) {
      blocks.push(toContentBlock(currentMain, text));
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
          blocks: currentSection.lines.map((body, index) => toContentBlock(index === 0 ? "Explicación" : "Ejemplo numérico (SI)", body, index > 0)),
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
      blocks: currentSection.lines.map((body, index) => toContentBlock(index === 0 ? "Explicación" : "Ejemplo numérico (SI)", body, index > 0)),
    });
  }

  return { blocks, sections: sections.length ? sections : undefined };
}
