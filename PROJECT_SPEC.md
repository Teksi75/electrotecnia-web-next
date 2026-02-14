# PROJECT_SPEC

## 1. Resumen del producto
- Nombre: `Electrotecnia Web` (configurado como `Electrotecnia` en `src/config/site.ts`).
- Tipo: sitio educativo tipo wiki/apunte para la unidad de Electricidad.
- Dominio funcional actual: temas teoricos de electricidad basica y circuitos.
- Idioma principal de UI y contenido: espanol.
- Framework: Next.js App Router con React 19 y TypeScript estricto.

## 2. Objetivos funcionales
- Navegacion jerarquica por partes, temas y subtemas (anchors).
- Visualizacion de contenido por cards semanticas:
  - `Idea clave`
  - `Explicacion`
  - `Ejemplo numerico (SI)`
  - `Formulas`
- Soporte de matematica inline y bloque con KaTeX (con fallback seguro a texto si KaTeX no esta disponible).
- Busqueda local sin backend sobre indice estatico generado en build/dev.
- SEO base por pagina y sitemap dinamico de temas.
- Soporte de tema claro/oscuro.

## 3. Stack tecnico
- Runtime: Node.js (scripts) + Next.js SSR/SSG.
- UI: React Server Components + Client Components donde aplica.
- Estilos: Tailwind CSS v4 (`@tailwindcss/postcss`).
- Tipado: TypeScript `strict: true`.
- Lint: ESLint 9 + `eslint-config-next`.
- Utilidades UI: `clsx` + `tailwind-merge`.
- Theming: `next-themes`.
- Math render: `katex`.

## 4. Estructura principal del repositorio
- `src/app`: rutas App Router, layouts globales y paginas.
- `src/components`: componentes por dominio (`layout`, `search`, `content`, `ui`).
- `src/lib`: acceso a contenido, parseo MDX, nav, search, SEO y utilidades.
- `src/content`: fuente de contenido (MDX + JSON legado + nav + search index).
- `scripts`: generacion de indice y smoke tests de parser.
- `docs`: documentacion de migracion y notas de sintaxis MDX.

## 5. Modelo de contenido (actual)
- Carpeta de temas: `src/content/electricidad`.
- Estado actual detectado:
  - `17` archivos `.mdx`.
  - `16` archivos `.json`.
- Regla de lectura:
  - `src/lib/content.ts` prioriza `MDX` por slug.
  - Si no existe MDX valido, fallback a JSON legado.
- Tipos base en `src/types/index.ts`:
  - `TopicContent`
  - `ContentSectionData`
  - `ContentBlock`
  - `ContentNode` (nodo de render de texto/math)

## 6. Navegacion y rutas
- Home: `/`
- Unidad indice: `/unidad/electricidad`
- Tema principal: `/unidad/electricidad/[slug]`
- Ruta de prueba MDX: `/unidad/electricidad-mdx/[slug]`
- Healthcheck API: `/api/health`
- Sitemap: generado en `src/app/sitemap.ts`.
- Nav declarativa: `src/content/nav.ts`.
- Orden prev/next: `src/lib/nav.ts` usando orden lineal de temas `isPage`.

## 7. Busqueda
- Fuente de indice: `src/content/search-index.json`.
- Entradas actuales en indice: `28`.
- Generacion:
  - Script: `scripts/generate-search-index.mjs`.
  - Hooks npm: `prebuild` y `predev`.
- Cobertura:
  - Extrae `href` desde `src/content/nav.ts`.
  - Lee contenido desde MDX si existe; fallback JSON.
  - Incluye resultados de anchors `#id` cuando estan definidos en nav.

## 8. Render de contenido
- Pagina tema (`/unidad/electricidad/[slug]`) renderiza cards segun `block.type`.
- Parser MDX custom:
  - `src/lib/mdx.ts`: frontmatter minimal.
  - `src/lib/mdxSections.ts`: convierte headings a bloques y secciones.
  - `src/lib/mathTokens.ts`: tokeniza `$...$` y `$$...$$` con soporte de `\$`.
- Render de tokens:
  - `src/components/content/renderTokens.tsx`.
  - `InlineMath` y `BlockMath` usan KaTeX con fallback visual.

## 9. Convenciones de contenido MDX
- Frontmatter requerido:
  - `title`
  - `description`
  - `part` (`1` o `2`)
  - `order` (numero)
- Headings `##` mapeados a tipo de card.
- Subtemas internos:
  - Formato: `### Titulo {#anchor}`.
  - Deben coincidir con anchors definidos en `src/content/nav.ts`.

## 10. Variables de entorno
- `NEXT_PUBLIC_SITE_URL`: base canonical para SEO/sitemap.
- `NEXT_ENABLE_STANDARD_MDX`:
  - `0` (default): renderer actual/fallback.
  - `1`: intenta pipeline estandar si deps estan instaladas.

## 11. Scripts npm oficiales
- `npm run dev`: desarrollo local.
- `npm run build`: build produccion.
- `npm run start`: servidor de produccion.
- `npm run lint`: linting.
- `npm run predev`: genera indice antes de dev.
- `npm run prebuild`: genera indice antes de build.
- `npm run test:parse-smoke`: smoke test parser MDX/math.

## 12. Requisitos no funcionales implicitos
- El sitio debe funcionar sin backend para busqueda.
- La navegacion hash no debe romperse entre JSON y MDX.
- El build no debe depender de red externa para parseo custom actual.
- Debe mantenerse accesibilidad minima:
  - `aria-label` en acciones clave.
  - elementos de dialogo para drawer movil.

## 13. Riesgos tecnicos actuales
- Coexistencia JSON/MDX puede generar divergencias de contenido por slug.
- Parser MDX custom es intencionalmente limitado (no markdown completo).
- `katex` se carga via `require` dinamico encapsulado en `Function`, requiere cuidado en entornos restringidos.
- La ruta `/unidad/electricidad-mdx/[slug]` aun actua como vista de prueba con fallback.

## 14. Criterios de aceptacion para cambios futuros
- No romper rutas existentes ni anchors declarados en nav.
- Mantener paridad visual/funcional entre temas migrados y no migrados.
- Regenerar `search-index.json` en cambios de contenido/nav.
- Ejecutar al menos:
  - `npm run lint`
  - `npm run test:parse-smoke`
  - `npm run build`

