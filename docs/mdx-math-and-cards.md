# MDX: matemática con KaTeX y cards por sección

## Escritura de matemática

- **Inline math**: usar `$...$` dentro del texto.
  - Ejemplo: `$1\,\mu C = 10^{-6}\,C$`
- **Display math**: usar `$$...$$` en bloque.
  - Ejemplo:

```md
$$|F| = k \frac{|q_1 q_2|}{r^2}$$
```

## Escapar `$` literal

Si necesitas mostrar el símbolo `$` como texto, escapalo con `\$`.

## Headings que generan cards consistentes

El parser interpreta estos `##` como tipos de bloque:

- `## Idea clave` → `ideaClave`
- `## Mini explicación` o `## Explicación` → `explicacion`
- `## Ejemplo numérico (SI)` → `ejemplo`
- `## Fórmulas` (o cualquier otro heading no reconocido) → `formulas`

## Limitaciones del tokenizador actual

- Inline: detecta pares simples `$...$`, no soporta anidado.
- Inline: ignora delimitadores escapados (`\$`).
- Block: detecta `$$...$$` en modo conservador, permite contenido multilínea.
- Si no hay delimitadores matemáticos, el contenido mantiene el comportamiento previo.
