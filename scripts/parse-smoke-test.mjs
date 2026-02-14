import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

async function transpileToTemp(modulePath, outName, rewrite = (code) => code) {
  const source = await fs.readFile(modulePath, "utf8");
  const rewritten = rewrite(source);
  const transpiled = ts.transpileModule(rewritten, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "parse-smoke-"));
  const outFile = path.join(tempDir, outName);
  await fs.writeFile(outFile, transpiled, "utf8");
  return { tempDir, outFile };
}

const math = await transpileToTemp("src/lib/mathTokens.ts", "mathTokens.mjs");
const sections = await transpileToTemp(
  "src/lib/mdxSections.ts",
  "mdxSections.mjs",
  (code) =>
    code
      .replace('from "./mathTokens"', 'from "./mathTokens.mjs"')
      .replace(/^import type .*from "@\/types";\n/m, ""),
);

await fs.copyFile(math.outFile, path.join(sections.tempDir, "mathTokens.mjs"));

const { parseMdxSections } = await import(pathToFileURL(sections.outFile).href);
const { tokenizeInlineMath } = await import(pathToFileURL(path.join(sections.tempDir, "mathTokens.mjs")).href);

const mdxSample = `## Mini explicación
### Sección inicial {#seccion-inicial}
Texto de la sección inicial.
## Fórmulas
$E=mc^2$`;

const parsed = parseMdxSections(mdxSample);

assert.equal(parsed.sections?.length, 1, "Debe mantener la subsección antes de un nuevo heading ##");
assert.equal(parsed.sections?.[0]?.id, "seccion-inicial", "El id de la subsección no debe perderse");
assert.equal(parsed.blocks[0]?.title, "Fórmulas", "El heading ## posterior debe seguir generando bloque principal");

const textWithEscapedDollar = "El costo es \\$1200 y $E=mc^2$";
const tokens = tokenizeInlineMath(textWithEscapedDollar);

assert.equal(tokens[0]?.kind, "text");
assert.equal(tokens[0]?.text, "El costo es $1200 y ", "El texto previo con dólar escapado debe preservarse");
assert.equal(tokens[1]?.kind, "inlineMath");
assert.equal(tokens[1]?.latex, "E=mc^2", "La matemática inline debe tokenizarse");

const bracketBlockSample = "Texto previo\n\\[P = VI\\]\nTexto posterior";
const bracketParsed = parseMdxSections(`## Fórmulas\n${bracketBlockSample}`);
const bracketNodes = bracketParsed.blocks[0]?.nodes ?? [];
assert.equal(bracketNodes.some((node) => node.kind === "blockMath" && node.latex === "P = VI"), true, "Debe soportar matemática de bloque con delimitadores \\[...\\]");

const inlineCodeText = "Usar `precio $100` como texto y $E=mc^2$ como matemática";
const inlineCodeTokens = tokenizeInlineMath(inlineCodeText);
assert.equal(inlineCodeTokens[0]?.kind, "text");
assert.equal(inlineCodeTokens[0]?.text.includes("`precio $100`"), true, "No debe parsear matemática dentro de código inline");
assert.equal(inlineCodeTokens[1]?.kind, "inlineMath");
assert.equal(inlineCodeTokens[1]?.latex, "E=mc^2");

console.log("parse-smoke-test: OK");
