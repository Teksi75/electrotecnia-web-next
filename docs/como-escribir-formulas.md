# Cómo escribir fórmulas en contenido MD/MDX

## Matemática inline (dentro del texto)
Usa cualquiera de estos delimitadores:

- `$ ... $`
- `\( ... \)`

Ejemplo recomendado:

- `$1\,\mu\mathrm{C} = 10^{-6}\,\mathrm{C}$`

## Matemática display (en bloque, centrada)
Usa cualquiera de estos delimitadores:

- `$$ ... $$`
- `\[ ... \]`

Ejemplo recomendado:

- `$$\vec{F} = k \frac{\left|q_1 q_2\right|}{r^2}$$`

## Cómo dejar LaTeX literal sin render

- Inline code: `` `\frac{a}{b}` ``
- Bloque de código fenced:

```md
```tex
\frac{a}{b}
```
```

Dentro de `inline code` y fenced code no se interpreta matemática.

## Recomendaciones de estilo

- Magnitud con barras: `\left| ... \right|`
- Unidades con texto recto: `\mathrm{C}`, `\mathrm{V}`, etc.
- Usa display math para expresiones largas o ecuaciones principales.
