import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentDir = path.join(root, 'src', 'content', 'electricidad');
const outputPath = path.join(root, 'src', 'content', 'search-index.json');

const files = await fs.readdir(contentDir);
const entries = [];

for (const file of files) {
  if (!file.endsWith('.json')) continue;
  const slug = file.replace('.json', '');
  const raw = await fs.readFile(path.join(contentDir, file), 'utf8');
  const doc = JSON.parse(raw);
  const body = [
    ...(doc.blocks ?? []).flatMap((b) => [b.body ?? '', ...((b.items ?? []))]),
    ...((doc.sections ?? []).flatMap((s) => (s.blocks ?? []).flatMap((b) => [b.body ?? '', ...((b.items ?? []))]))),
  ].join(' ').replace(/\s+/g, ' ').trim();

  entries.push({
    title: doc.title,
    href: `/unidad/electricidad/${slug}`,
    description: doc.description,
    bodyPlain: body,
  });
}

entries.sort((a, b) => a.title.localeCompare(b.title, 'es'));
await fs.writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Generated ${entries.length} entries at ${path.relative(root, outputPath)}`);
