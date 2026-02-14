import path from "node:path";
import { cache } from "react";

type UnitName = "electricidad";

type MdxFrontmatter = {
  title: string;
  description: string;
  part: 1 | 2;
  order: number;
};

type MdxRecord = {
  frontmatter: MdxFrontmatter;
  source: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function getUnitPath(unit: UnitName) {
  return path.join(CONTENT_ROOT, unit);
}

function parseFrontmatterFallback(raw: string): MdxRecord {
  if (!raw.startsWith("---")) {
    return {
      frontmatter: {
        title: "Sin título",
        description: "",
        part: 1,
        order: 0,
      },
      source: raw,
    };
  }

  const [, fmChunk = "", ...contentParts] = raw.split("---");
  const source = contentParts.join("---").trimStart();

  const values = Object.fromEntries(
    fmChunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [key, ...rest] = line.split(":");
        return [key.trim(), rest.join(":").trim().replace(/^"|"$/g, "")];
      }),
  );

  return {
    frontmatter: {
      title: values.title ?? "Sin título",
      description: values.description ?? "",
      part: Number(values.part) === 2 ? 2 : 1,
      order: Number(values.order ?? 0),
    },
    source,
  };
}

async function parseMdxSource(raw: string): Promise<MdxRecord> {
  try {
    const runtimeImport = new Function("moduleName", "return import(moduleName)") as (moduleName: string) => Promise<unknown>;
    const matterModule = (await runtimeImport("gray-matter")) as {
      default: (input: string) => { data: Partial<MdxFrontmatter>; content: string };
    };

    const parsed = matterModule.default(raw);

    return {
      frontmatter: {
        title: parsed.data.title ?? "Sin título",
        description: parsed.data.description ?? "",
        part: parsed.data.part === 2 ? 2 : 1,
        order: Number(parsed.data.order ?? 0),
      },
      source: parsed.content,
    };
  } catch {
    return parseFrontmatterFallback(raw);
  }
}

export const getAllMdxSlugs = cache(async (unit: UnitName) => {
  const fs = await import("node:fs/promises");
  const files = await fs.readdir(getUnitPath(unit));

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
});

export const getMdxBySlug = cache(async (unit: UnitName, slug: string): Promise<MdxRecord | null> => {
  const fs = await import("node:fs/promises");
  const filePath = path.join(getUnitPath(unit), `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return parseMdxSource(raw);
  } catch {
    return null;
  }
});
