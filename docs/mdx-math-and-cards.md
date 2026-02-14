# MDX custom: matemática con KaTeX y cards por sección

## Sintaxis soportada

- **Math inline**: usar `$...$` dentro de una línea de texto.
  - Ejemplo: `$1\\,\\mu C = 10^{-6}\\,C$`
- **Math de bloque**: usar `$$...$$` para fórmulas destacadas (multilínea permitida).
  - Ejemplo: `$$|F| = k \\frac{|q_1 q_2|}{r^2}$$`
- **Math de bloque alternativa**: también se acepta `\\[ ... \\]`.
  - Ejemplo: `\\[ F = (9 \\times 10^9)\\frac{(2 \\times 10^{-6})(3 \\times 10^{-6})}{(0{,}50)^2} = 0{,}216\\,N \\]`

## Cómo escribir fórmulas (guía corta para autores)

- Inline en texto normal: `La carga es $q=2\\,\\mu C$`.
- Bloque centrado: usar `$$...$$` o `\\[...\\]` en una línea separada.
- No escribir LaTeX “suelto” sin delimitadores (por ejemplo `|F| = k \\frac{|q_1 q_2|}{r^2}`), porque se verá como texto crudo.
- Si querés mostrar código literal de LaTeX, usá backticks: `` `\\frac{a}{b}` `` para evitar render matemático.
- Ejemplos correctos:
  - `$|F| = k \\frac{|q_1 q_2|}{r^2}$`
  - `$1\\,\\mu C = 10^{-6}\\,C$`

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
