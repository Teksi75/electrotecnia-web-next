# Electrotecnia Web

Web de consulta tipo wiki/apunte para la unidad de Electricidad, construida con Next.js (App Router), TypeScript, Tailwind CSS y MDX.

## Correr en local
1. `npm install`
2. `npm run dev`
3. Abrir `http://localhost:3000`

## Estructura de contenido
- Navegacion: `src/content/nav.ts`
- Temas MDX: `src/content/electricidad/**.mdx`

## Agregar un tema
1. Crear el archivo `.mdx` dentro de `src/content/electricidad/...` con frontmatter:
   - `title`
   - `part`
   - `order`
   - `description`
2. Agregar el nodo correspondiente en `src/content/nav.ts` con `title`, `slug`, `part`, `order`, `description`, `href` y `children` si aplica.
3. Si el tema tiene subitems internos, agregar headings con id en el mismo MDX (ejemplo: `<h3 id="por-frotamiento">Por frotamiento</h3>`) y enlazarlos desde `nav.ts` con `#anchor`.


## MDX source of truth
- La fuente principal de contenido para la Unidad Electricidad es `src/content/electricidad/*.mdx`.
- La ruta final `/unidad/electricidad/[slug]` prioriza MDX cuando existe y hace fallback automático al JSON legado (`*.json`) si falta el MDX.
- El índice de búsqueda (`src/content/search-index.json`) se genera desde MDX cuando está disponible y conserva fallback JSON.

### Cómo agregar un tema nuevo
1. Crear `src/content/electricidad/<slug>.mdx` con frontmatter mínimo: `title`, `description`, `part`, `order`.
2. Mantener secciones base:
   - `## Idea clave`
   - `## Mini explicación`
   - `## Ejemplo numérico (SI)`
   - `## Fórmulas` (solo si corresponde)
3. Si tiene subtemas, agregar `### <Título> {#anchor}` y usar el mismo `#anchor` en `src/content/nav.ts`.
4. Agregar/ajustar el nodo del tema en `src/content/nav.ts` para sidebar, orden y prev/next.
5. Regenerar índice: `npm run build` (ejecuta `prebuild`) o `npm run predev`.
