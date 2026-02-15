# Inventario de fórmulas — PR #1 (JSON/data)

Fecha: 2026-02-14

## Alcance
- Se revisaron temas en `src/content/electricidad` para detectar patrones LaTeX típicos:
  - `\frac`, `\mu`, `\times`, `^{`, `_{`, `\left`, `\right`, `\vec`.
  - magnitudes con barras tipo `|...|`.
- El inventario se hizo separando:
  - A) `.mdx`
  - B) `.json` (fallback legado)
- Se ignoró contenido dentro de fenced code e inline code para evitar falsos positivos.

## Resultado global
- **Temas totales con fórmulas detectadas:** **3**
- **MDX:** **3 temas (100%)**
- **JSON fallback:** **0 temas (0%)**

## Distribución por sección de render
- **MDX / Fórmulas:** 5 ocurrencias
- **MDX / Ejemplo numérico (SI):** 4 ocurrencias
- **MDX / Explicación:** 0 ocurrencias
- **MDX / otros:** 0 ocurrencias
- **JSON / todas las secciones:** 0 ocurrencias

## Ejemplos de fórmulas problemáticas (3–5)
1. `$$|F| = k \frac{|q_1 q_2|}{r^2}$$`  
   - Problema: magnitud con `|...|` sin `\left|...\right|`.
2. `Conversión útil en notación científica: $1\,\mu C = 10^{-6}\,C$.`  
   - Problema: unidades sin `\mathrm{}` en algunos casos.
3. `Si un cuerpo queda con $q = -2\,\mu C$, en unidades SI se escribe $q = -2 \times 10^{-6}\,C$.`  
   - Problema: mezcla de notación con y sin `\mathrm{}`.
4. `- F = k |q1 q2| / r^2`  
   - Problema: fórmula cruda no delimitada en sección de Fórmulas.
5. `$F = k\,\frac{\left|q_1 q_2\right|}{r^2} = (9 \times 10^9)\,\frac{(2 \times 10^{-6})(3 \times 10^{-6})}{(0{,}50)^2} = 0{,}216\,\mathrm{N}$.`  
   - Estado: ya está bien delimitada y con `\mathrm{}` (referencia positiva).

## Implementación PR #1 (solo JSON/data)
- Se revisaron todos los `.json` de fallback en `src/content/electricidad`.
- **Archivos JSON modificados:** **0**
- **Campos JSON modificados:** **0**
- Motivo: actualmente los JSON están en estado plantilla (`PENDIENTE`) y no contienen fórmulas para estandarizar todavía.

## Nota operativa para PR #2 (MDX)
La migración real de delimitadores y normalización (display vs inline, `\left|\right|`, `\mathrm{}`) se realizará sobre MDX en PR separado, para mantener cambios pequeños y trazables.
