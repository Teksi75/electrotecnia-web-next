import assert from "node:assert/strict";

import { tokenizeInlineMath } from "../src/lib/mathTokens.ts";
import { parseMdxSections } from "../src/lib/parseMdxSections.ts";

const parsed = parseMdxSections(`## Fórmulas\n\n- V = I R\n\n### Sección de prueba {#seccion-prueba}\n\nTexto de subsección.\n\n## Fórmulas\n\n- P = V I\n`);

assert.equal(parsed.sections?.length, 1, "Debe conservar una sección al encontrar un nuevo heading ##.");
assert.equal(parsed.sections?.[0].blocks?.length, 1, "La subsección ### previa no debe perder su contenido.");
assert.match(parsed.sections?.[0].blocks?.[0].body ?? "", /Texto de subsección\./, "Debe mantener el texto de la subsección.");

const tokens = tokenizeInlineMath("El costo es \\$1200 y $E=mc^2$");

assert.equal(tokens[0]?.kind, "text", "El primer token debe ser texto.");
assert.equal(tokens[0]?.text, "El costo es \\$1200 y ", "Debe conservar texto previo con dólar escapado.");
assert.deepEqual(tokens[1], { kind: "inlineMath", latex: "E=mc^2" }, "Debe tokenizar la matemática inline.");

console.log("parse-smoke-test: OK");
