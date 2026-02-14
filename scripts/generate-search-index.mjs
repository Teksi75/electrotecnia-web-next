import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "src", "content", "electricidad");
const navPath = path.join(root, "src", "content", "nav.ts");
const outputPath = path.join(root, "src", "content", "search-index.json");

const navRaw = await fs.readFile(navPath, "utf8");
const hrefMatches = [...navRaw.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
const uniqueHrefs = [...new Set(hrefMatches)].filter((href) => href.startsWith("/unidad/electricidad/"));

const cache = new Map();

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { frontmatter: null, content: raw };

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^['\"]|['\"]$/g, "");
  }

  return { frontmatter, content: raw.slice(match[0].length) };
}

function stripMdx(content) {
  return content
    .replace(/^#{2,3}\s+/gm, "")
    .replace(/\s*\{#[\w-]+\}\s*$/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

async function readTopic(slug) {
  if (cache.has(slug)) return cache.get(slug);

  const mdxPath = path.join(contentDir, `${slug}.mdx`);
  try {
    const rawMdx = await fs.readFile(mdxPath, "utf8");
    const { frontmatter, content } = parseFrontmatter(rawMdx);
    const parsed = {
      source: "mdx",
      title: frontmatter?.title,
      description: frontmatter?.description,
      bodyPlain: stripMdx(content),
      content,
    };
    cache.set(slug, parsed);
    return parsed;
  } catch {}

  const jsonPath = path.join(contentDir, `${slug}.json`);
  try {
    const raw = await fs.readFile(jsonPath, "utf8");
    const topic = JSON.parse(raw);
    const chunk = [];
    for (const block of topic.blocks ?? []) {
      if (block.body) chunk.push(block.body);
      if (Array.isArray(block.items)) chunk.push(block.items.join(" "));
    }
    for (const section of topic.sections ?? []) {
      chunk.push(section.title);
      for (const block of section.blocks ?? []) {
        if (block.body) chunk.push(block.body);
        if (Array.isArray(block.items)) chunk.push(block.items.join(" "));
      }
    }
    const parsed = {
      source: "json",
      title: topic.title,
      description: topic.description,
      bodyPlain: chunk.join(" "),
      topic,
    };
    cache.set(slug, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function extractMdxSection(content, hash) {
  if (!hash) return null;
  const escaped = hash.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^###\\s+(.+?)\\s+\\{#${escaped}\\}\\s*$`, "m");
  const match = content.match(re);
  if (!match) return null;

  const start = match.index + match[0].length;
  const rest = content.slice(start);
  const next = rest.search(/^###\s+/m);
  const sectionBody = (next === -1 ? rest : rest.slice(0, next)).trim();
  return { title: match[1], body: stripMdx(sectionBody) };
}

const entries = [];
for (const href of uniqueHrefs) {
  const [base, hash] = href.split("#");
  const slug = base.split("/").pop();
  if (!slug) continue;

  const topic = await readTopic(slug);
  if (!topic) continue;

  let title = topic.title;
  let description = topic.description;
  let bodyPlain = topic.bodyPlain;

  if (hash) {
    if (topic.source === "mdx") {
      const section = extractMdxSection(topic.content, hash);
      if (section) {
        title = section.title;
        description = `${section.title} · ${topic.title}`;
        bodyPlain = `${topic.bodyPlain} ${section.body}`.trim();
      }
    } else if (topic.topic?.sections) {
      const section = topic.topic.sections.find((item) => item.id === hash);
      if (section) {
        title = section.title;
        description = `${section.title} · ${topic.topic.title}`;
        bodyPlain = `${topic.bodyPlain} ${section.blocks.map((b) => b.body ?? "").join(" ")}`;
      }
    }
  }

  entries.push({ title, href, description, bodyPlain });
}

await fs.writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
console.log(`Generated ${entries.length} entries at ${path.relative(root, outputPath)}`);
