# Inventario de fórmulas (PR #1: JSON/data)

## Alcance
- Búsqueda ejecutada sobre `src/content/electricidad` para patrones: `\frac`, `\mu`, `\times`, `^{`, `_{`, `\left`, `\right`, `\vec` y magnitudes con barras `|...|`.
- Clasificación por origen (`.mdx` vs `.json`) y por sección de render (`Fórmulas`, `Ejemplo numérico (SI)`, `Explicación`, otros).

## Resultado resumido
- Temas con fórmulas detectadas: **4**.
- Distribución por origen:
  - **MDX:** 4/4 temas (**100%**).
  - **JSON fallback:** 0/4 temas (**0%**).
- Hallazgos por sección:
  - `Fórmulas`: 6 ocurrencias.
  - `Ejemplo numérico (SI)`: 4 ocurrencias.
  - `Explicación`: 0 ocurrencias.
  - `Otros`: 0 ocurrencias.

## Estado de PR #1 (solo JSON/data)
- No se aplicaron cambios de contenido en `.json` porque no hay fórmulas LaTeX en fallback JSON actualmente.
- Se agrega smoke test para evitar regresiones:
  - falla si aparece LaTeX sin delimitadores en `formulas.items` o `example.body` de JSON;
  - falla si hay delimitadores matemáticos dentro de inline code o fenced code en MDX.

## Ejemplos de fórmulas problemáticas (para PR #2 MDX)
1. `$$|F| = k \frac{|q_1 q_2|}{r^2}$$` (usa `|...|` sin `\left|...\right|`).
2. `Conversión útil en notación científica: $1\,\mu C = 10^{-6}\,C$.` (unidad sin `\mathrm{}` para `C`).
3. `Si un cuerpo queda con $q = -2\,\mu C$, en unidades SI se escribe $q = -2 \times 10^{-6}\,C$.` (unidad sin `\mathrm{}` para `C`).
4. `Si una esfera con $+6\,\mu C$ toca una esfera neutra idéntica, al separarlas quedan con $+3\,\mu C$ cada una.` (unidad sin `\mathrm{}`).
5. `- F = k |q1 q2| / r^2` (fórmula cruda sin delimitadores matemáticos).
