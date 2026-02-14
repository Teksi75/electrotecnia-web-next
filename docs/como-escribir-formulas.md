# Cómo escribir fórmulas en contenido MD/MDX

## Inline vs display

- **Inline** (dentro de un párrafo):
  - `$1\,\mu\mathrm{C} = 10^{-6}\,\mathrm{C}$`
  - `\( E = \frac{F}{q} \)`
- **Display** (bloque centrado):
  - `$$\vec{F} = k \frac{\left|q_1 q_2\right|}{r^2}$$`
  - `\[ V = R I \]`

## Cómo dejar LaTeX literal (sin render)

Si querés mostrar LaTeX como texto, usá formato de código:

- Código inline: `` `$\frac{a}{b}$` ``
- Código bloque:

````md
```text
$$\frac{a}{b}$$
```
````

Dentro de `inline code` y de bloques ```fenced code``` no se interpreta matemática.

## Recomendaciones de escritura

- Para magnitudes absolutas, usar `\left| ... \right|`.
- Para unidades, usar `\mathrm{...}` (ejemplo: `\mathrm{C}`, `\mathrm{V}`).
- Para micro, usar `\mu` (ejemplo: `\mu\mathrm{C}`).
