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

async function readTopic(slug) {
  if (cache.has(slug)) return cache.get(slug);
  const filePath = path.join(contentDir, `${slug}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    cache.set(slug, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function collectText(topic) {
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
  return chunk.join(" ");
}

const entries = [];
for (const href of uniqueHrefs) {
  const slug = href.split("#")[0].split("/").pop();
  if (!slug) continue;
  const topic = await readTopic(slug);
  if (!topic) continue;
  const hash = href.includes("#") ? href.split("#")[1] : null;
  let title = topic.title;
  let description = topic.description;
  let bodyPlain = collectText(topic);

  if (hash && topic.sections) {
    const section = topic.sections.find((item) => item.id === hash);
    if (section) {
      title = section.title;
      description = `${section.title} · ${topic.title}`;
      bodyPlain = `${collectText(topic)} ${section.blocks.map((b) => b.body ?? "").join(" ")}`;
    }
  }

  entries.push({ title, href, description, bodyPlain });
}

await fs.writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
console.log(`Generated ${entries.length} entries at ${path.relative(root, outputPath)}`);
