import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "src", "content", "electricidad");
const navPath = path.join(root, "src", "content", "nav.ts");
const outputPath = path.join(root, "src", "content", "search-index.json");

const navRaw = await fs.readFile(navPath, "utf8");
const hrefMatches = [...navRaw.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
const uniqueHrefs = [...new Set(hrefMatches)].filter((href) => href.startsWith("/unidad/electricidad/"));

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { frontmatter: {}, content: normalized };

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
    frontmatter[key] = value;
  }

  return { frontmatter, content: normalized.slice(match[0].length) };
}

function parseMdxContent(content) {
  const body = [];
  const sections = [];
  let currentSection = null;

  for (const line of content.split("\n")) {
    const subHeading = line.match(/^###\s+(.+?)\s+\{#([\w-]+)\}\s*$/);
    if (subHeading) {
      currentSection = { id: subHeading[2], title: subHeading[1], text: [] };
      sections.push(currentSection);
      continue;
    }

    if (/^##\s+/.test(line)) continue;

    const plain = line.replace(/^\-\s+/, "").trim();
    if (!plain) continue;

    body.push(plain);
    if (currentSection) currentSection.text.push(plain);
  }

  return { bodyPlain: body.join(" "), sections };
}

async function readTopic(slug) {
  const mdxPath = path.join(contentDir, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(mdxPath, "utf8");
    const { frontmatter, content } = parseFrontmatter(raw);
    const { bodyPlain, sections } = parseMdxContent(content);
    return {
      title: frontmatter.title ?? slug,
      description: frontmatter.description ?? slug,
      bodyPlain,
      sections,
    };
  } catch {
    return null;
  }
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
  let bodyPlain = topic.bodyPlain;

  if (hash) {
    const section = topic.sections.find((item) => item.id === hash);
    if (section) {
      title = section.title;
      description = `${section.title} · ${topic.title}`;
      bodyPlain = `${topic.bodyPlain} ${section.text.join(" ")}`;
    }
  }

  entries.push({ title, href, description, bodyPlain: bodyPlain.trim() });
}

await fs.writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
console.log(`Generated ${entries.length} entries at ${path.relative(root, outputPath)}`);
