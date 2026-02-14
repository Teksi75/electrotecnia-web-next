# Electrotecnia Web

Web de consulta tipo wiki/apunte para la unidad de Electricidad, construida con Next.js (App Router), TypeScript, Tailwind CSS y MDX.

## Correr en local
1. `npm install`
2. `npm run dev`
3. Abrir `http://localhost:3000`

## Estructura de contenido
- Navegacion: `src/content/nav.ts`
- Temas MDX: `src/content/electricidad/**.mdx`

## MDX source of truth
- Para la unidad de Electricidad, el contenido se resuelve primero desde MDX (`src/content/electricidad/<slug>.mdx`).
- Si no existe MDX para un slug, la app usa fallback automático al JSON legado (`src/content/electricidad/<slug>.json`).
- El índice de búsqueda también prioriza MDX y conserva fallback al JSON.

## Agregar un tema
1. Crear el archivo `.mdx` dentro de `src/content/electricidad/...` con frontmatter:
   - `title`
   - `part`
   - `order`
   - `description`
2. Agregar el nodo correspondiente en `src/content/nav.ts` con `title`, `slug`, `part`, `order`, `description`, `href` y `children` si aplica.
3. Si el tema tiene subitems internos, agregar headings con id en el mismo MDX (ejemplo: `<h3 id="por-frotamiento">Por frotamiento</h3>`) y enlazarlos desde `nav.ts` con `#anchor`.
4. Mantener los slugs y anchors sincronizados con `src/content/nav.ts` para que Sidebar, búsqueda y navegación de hash funcionen correctamente.
