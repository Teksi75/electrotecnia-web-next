# MDX custom: matemática y cards por sección

## Matemática inline

Usá `$...$` dentro de una línea o párrafo.

Ejemplo:

```md
En SI, $1\,\mu C = 10^{-6}\,C$.
```

## Matemática en bloque

Usá `$$...$$` para fórmulas en bloque.

Ejemplo:

```md
$$|F| = k \frac{|q_1 q_2|}{r^2}$$
```

También funciona en multilinea:

```md
$$
|F| = k \frac{|q_1 q_2|}{r^2}
$$
```

## Escapar `$` literal

Si necesitás el símbolo dólar como texto, escapalo como `\$`.

Ejemplo:

```md
El costo es \$1200.
```

## Headings que generan cards consistentes

En `##` de nivel principal:

- `## Idea clave` → card `ideaClave`
- `## Mini explicación` o `## Explicación` → card `explicacion`
- `## Ejemplo numérico (SI)` → card `ejemplo`
- `## Fórmulas` (u otro heading no mapeado) → card `formulas`

## Limitaciones del tokenizador

- No soporta matemática inline anidada.
- Detecta inline solo con `$...$` no escapado.
- Detecta bloques solo con `$$...$$` no escapado.
- Si falta un cierre (`$` o `$$`), conserva el texto sin romper el render.
