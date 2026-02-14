import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const tmpDir = path.join(root, ".tmp-smoke");
await fs.mkdir(tmpDir, { recursive: true });

const mathTsPath = path.join(root, "src/lib/mathTokens.ts");
const parseTsPath = path.join(root, "src/lib/parseMdxSections.ts");

const mathSource = await fs.readFile(mathTsPath, "utf8");
const mathJs = ts.transpileModule(mathSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
await fs.writeFile(path.join(tmpDir, "mathTokens.mjs"), mathJs);

let parseSource = await fs.readFile(parseTsPath, "utf8");
parseSource = parseSource.replace(/import type[^\n]+\n/, "");
parseSource = parseSource.replace('from "./mathTokens"', 'from "./mathTokens.mjs"');
const parseJs = ts.transpileModule(parseSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
await fs.writeFile(path.join(tmpDir, "parseMdxSections.mjs"), parseJs);

const { parseMdxSections } = await import(path.join(tmpDir, "parseMdxSections.mjs"));
const { tokenizeInlineMath } = await import(path.join(tmpDir, "mathTokens.mjs"));

const mdxSample = `## Mini explicación
Texto principal.

### Caso A {#caso-a}
Primer bloque.
Segundo bloque.

## Fórmulas
$V=IR$`;

const parsed = parseMdxSections(mdxSample);
assert.equal(parsed.sections?.length, 1, "Debe conservar una subsección ### antes de un heading ## posterior");
assert.equal(parsed.sections?.[0].id, "caso-a");
assert.equal(parsed.blocks.length, 2, "Deben existir bloques principales de Mini explicación y Fórmulas");

const tokens = tokenizeInlineMath("El costo es \\$1200 y $E=mc^2$");
const prefixText = tokens.filter((token) => token.kind === "text").map((token) => token.text).join("");
assert.equal(prefixText, "El costo es $1200 y ", "No debe perder texto antes de matemática inline");
const inline = tokens.find((token) => token.kind === "inlineMath");
assert.equal(inline?.latex, "E=mc^2");

console.log("parse-smoke-test: OK");
