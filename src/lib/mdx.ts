import path from "node:path";
import { cache } from "react";

import type { TopicContent } from "@/types";

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

function isFormulaHeading(label: string) {
  return label.trim().toLowerCase() === "fórmulas";
}

export function parseMdxTopicContent(topic: MdxTopic): TopicContent {
  const lines = topic.content.split("\n");

  const blocks: TopicContent["blocks"] = [];
  const sections: NonNullable<TopicContent["sections"]> = [];

  let currentMain: "idea" | "explain" | "example" | "formulas" | null = null;
  let currentSection: { id: string; title: string; blocks: TopicContent["blocks"] } | null = null;
  let currentSectionBlock: "explain" | "example" | null = null;

  const mainBuffers: Record<"idea" | "explain" | "example", string[]> = {
    idea: [],
    explain: [],
    example: [],
  };
  const formulasBuffer: string[] = [];
  const sectionBuffers = new Map<string, { explain: string[]; example: string[] }>();

  const flushMain = () => {
    for (const [key, title] of [
      ["idea", "Idea clave"],
      ["explain", "Explicación"],
      ["example", "Ejemplo"],
    ] as const) {
      const body = mainBuffers[key].join("\n").trim();
      if (!body) continue;
      blocks.push({ type: key, title, body, ...(key === "example" ? { mono: true } : {}) });
    }

    const formulas = formulasBuffer.map((item) => item.replace(/^-\s*/, "").trim()).filter(Boolean);
    if (formulas.length) {
      blocks.push({ type: "formulas", title: "Fórmulas", items: formulas });
    }
  };

  const flushCurrentSection = () => {
    if (!currentSection) return;
    const buffer = sectionBuffers.get(currentSection.id);
    if (!buffer) return;

    if (buffer.explain.join("\n").trim()) {
      currentSection.blocks.push({ type: "explain", title: "Explicación", body: buffer.explain.join("\n").trim() });
    }
    if (buffer.example.join("\n").trim()) {
      currentSection.blocks.push({ type: "example", title: "Ejemplo", body: buffer.example.join("\n").trim(), mono: true });
    }

    sections.push(currentSection);
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*?)\s*\{#([\w-]+)\}\s*$/);

    if (h3) {
      flushCurrentSection();
      currentSection = { id: h3[2], title: h3[1], blocks: [] };
      sectionBuffers.set(h3[2], { explain: [], example: [] });
      currentSectionBlock = "explain";
      currentMain = null;
      continue;
    }

    if (h2) {
      currentSectionBlock = null;
      currentSection = null;
      const label = h2[1].trim().toLowerCase();
      if (label === "idea clave") currentMain = "idea";
      else if (label === "mini explicación") currentMain = "explain";
      else if (label === "ejemplo numérico (si)") currentMain = "example";
      else if (isFormulaHeading(h2[1])) currentMain = "formulas";
      else currentMain = null;
      continue;
    }

    if (!line.trim()) continue;

    if (currentSection) {
      const buffer = sectionBuffers.get(currentSection.id);
      if (!buffer) continue;
      if (currentSectionBlock === "explain") {
        if (/^PENDIENTE:/.test(line) || /^`/.test(line) || line.includes("=") || line.includes("→")) {
          buffer.example.push(line);
          currentSectionBlock = "example";
        } else {
          buffer.explain.push(line);
        }
      } else {
        buffer.example.push(line);
      }
      continue;
    }

    if (currentMain && currentMain !== "formulas") {
      mainBuffers[currentMain].push(line);
    } else if (currentMain === "formulas") {
      formulasBuffer.push(line);
    }
  }

  flushCurrentSection();
  flushMain();

  return {
    title: topic.frontmatter.title,
    description: topic.frontmatter.description,
    part: topic.frontmatter.part,
    order: topic.frontmatter.order,
    blocks,
    ...(sections.length ? { sections } : {}),
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
