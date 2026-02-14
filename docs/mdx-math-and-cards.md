# MDX custom: matemática con KaTeX y cards por sección

## Sintaxis soportada

- **Math inline**: usar `$...$` dentro de una línea de texto.
  - Ejemplo: `$1\\,\\mu C = 10^{-6}\\,C$`
- **Math de bloque**: usar `$$...$$` para fórmulas destacadas (multilínea permitida).
  - Ejemplo: `$$|F| = k \\frac{|q_1 q_2|}{r^2}$$`

## Escapar símbolo `$` literal

- Para escribir un dólar literal, usar `\$`.
- El parser lo mantiene como texto normal (no se interpreta como matemática).

## Headings que generan cards

Los headings `##` se mapean a cards consistentes:

- `## Idea clave` → `idea`
- `## Mini explicación` o `## Explicación` → `explain`
- `## Ejemplo numérico (SI)` → `example`
- `## Fórmulas` (o `## Formulas`) → `formulas`

Además, en subsecciones `### Título {#ancla}`:

- El primer bloque se renderiza como card de **Explicación**.
- Los bloques siguientes se renderizan como cards de **Ejemplo numérico (SI)**.

## Limitaciones del tokenizador

- No soporta anidado de delimitadores matemáticos.
- Inline math usa detección conservadora de `$...$` (sin parseo completo de Markdown).
- Si falta cerrar `$` o `$$`, el contenido se conserva como texto.
- El parser evita insertar HTML crudo; solo genera tokens/nodos tipados.
- `dangerouslySetInnerHTML` se usa exclusivamente dentro de los componentes de matemática (`InlineMath` y `BlockMath`).
