# Plan de migración JSON -> MDX (Unidad Electricidad)

## Etapa 0: diagnóstico actual

### 1) ¿Dónde vive el contenido actual (JSON)?

- Directorio fuente: `src/content/electricidad/*.json`.
- Loader principal de contenido JSON: `src/lib/content.ts`.
  - `getAllTopicSlugs()` lista archivos `.json`.
  - `getTopicContentBySlug(slug)` lee y parsea un JSON por slug.
- Tipos que modelan ese contenido: `src/types/index.ts` (`TopicContent`, `ContentSectionData`, `ContentBlock`).

### 2) ¿Qué páginas/componentes consumen ese JSON?

- Página de tema: `src/app/unidad/electricidad/[slug]/page.tsx`.
  - Consume `getTopicContentBySlug` y renderiza `blocks` + `sections`.
  - Usa `id` de `sections` para anchors hash en el DOM (`id={section.id}` + `scroll-mt-24`).
- SSG de rutas de temas: misma página vía `generateStaticParams` con `getAllTopicSlugs`.
- Metadata SEO por tema: misma página vía `generateMetadata`.

### 3) ¿Cómo se construye sidebar/nav y hash navigation?

- Fuente de navegación: `src/content/nav.ts` (estructura estática `electricidadNav`).
  - Define páginas (`isPage: true`) y subtemas hash (`isPage: false`, `href` con `#anchor`).
- Helpers de navegación: `src/lib/nav.ts`.
  - `getSectionNodes`, `getTopicNodes`, `getTopicBySlug`, `getPrevNextBySlug`, etc.
- Sidebar: `src/components/layout/Sidebar.tsx`.
  - Render recursivo de nodos de `electricidadNav`.
  - Activo por pathname base (ignora hash para activo actual).
- Layout de unidad: `src/app/unidad/electricidad/layout.tsx` + `src/components/layout/MobileDrawer.tsx`.
- Hash navigation actual:
  - El nav enlaza a `href` con hash (ej. `.../metodos-electrificacion#por-contacto`).
  - El scroll a subtema lo resuelve el navegador porque la página imprime `id` compatibles.

### 4) Dependencias relevantes detectadas

- `scripts/generate-search-index.mjs` depende de:
  - `src/content/nav.ts` para extraer `href`.
  - JSON en `src/content/electricidad` para texto indexable.
- `src/content/search-index.json` se regenera en `prebuild` y `predev`.

## Decisión técnica recomendada

1. **Convivencia temporal JSON + MDX (sin ruptura)**
   - Mantener `src/app/unidad/electricidad/[slug]/page.tsx` intacta durante la transición.
   - Introducir ruta paralela temporal MDX: `/unidad/electricidad-mdx/[slug]`.

2. **Capa de acceso MDX dedicada**
   - Crear `src/lib/mdx.ts` con API mínima:
     - `getMdxBySlug(unit, slug)`
     - `getAllMdxSlugs(unit)`
   - Usar filesystem sobre `src/content/<unit>/*.mdx` para mantener paridad con el esquema actual por slugs.

3. **Migración por lotes pequeños y deployables**
   - PRs atómicos por etapa (1 tema primero, luego navegación, luego corte final).
   - Validar siempre `npm run build` antes de merge.

4. **Anclas/hash en MDX**
   - Conservar IDs de subtemas existentes (`por-frotamiento`, `por-contacto`, etc.) para no romper enlaces internos ni índice.

5. **Búsqueda e índice (siguiente etapa)**
   - Extender `scripts/generate-search-index.mjs` para leer MDX además de JSON.
   - Mantener fallback JSON mientras convivan ambos formatos.

## Etapa 1 (MVP MDX)

Implementado en este PR:

- Nueva utilidad `src/lib/mdx.ts` para lectura de `.mdx` y frontmatter.
- Nueva ruta temporal `src/app/unidad/electricidad-mdx/[slug]/page.tsx`.
- Primer archivo demo: `src/content/electricidad/metodos-electrificacion.mdx` con placeholders y anchors.

> Nota: por restricciones de red del entorno de ejecución, no se pudieron instalar paquetes externos en esta corrida (`gray-matter`, `next-mdx-remote`, `remark-gfm`, etc.). Se dejó un parser de frontmatter mínimo y render básico de headings/párrafos para no bloquear el flujo y mantener build estable. La recomendación se mantiene: reemplazar esta capa por `next-mdx-remote` (RSC) + plugins en la siguiente iteración con acceso al registry.

## Próximos pasos (Etapa 2)

- Integrar nav/sidebar para modo MDX (secciones + prev/next).
- Paridad completa de anchors hash en MDX (TOC/subtemas).
- Definir fuente única de verdad para nav (frontmatter/manifest) para evitar duplicidad `nav.ts` vs contenido.
- Extender indexado de búsqueda a MDX y validar cobertura de hashes.

## Etapa 4 (incremental, sin romper flujo actual)

Implementado en este PR:

- Se reforzó el parser de secciones MDX en `src/lib/mdxSections.ts` para hacer flush de la subsección actual antes de cambiar a un nuevo heading `##`.
- Se corrigió tokenización inline para `\$` en `src/lib/mathTokens.ts`, preservando texto literal antes de expresiones matemáticas.
- Se agregó smoke test ejecutable con Node (`scripts/parse-smoke-test.mjs`) para cubrir ambos casos de robustez.
- Se dejó scaffolding para pipeline estándar MDX:
  - `src/mdx-components.tsx` con `<Formula>`, `<Ejemplo>` y `<Nota>`.
  - `src/lib/mdxStandard.ts` para activar por flag (`NEXT_ENABLE_STANDARD_MDX=1`) y validar dependencias.
  - Ruta paralela de prueba `/unidad/electricidad-mdx/[slug]` con fallback explícito al renderer actual.
  - Demo MDX: `src/content/electricidad/demo-matematicas-mdx.mdx`.

### Estado de dependencias estándar

No fue posible instalar en este entorno: `@next/mdx`, `remark-math`, `rehype-katex` (error 403 al registry). Por eso:

- Se mantiene el flujo actual como camino principal.
- La ruta de prueba y el flag permiten completar la migración apenas estén disponibles los paquetes.

### Siguientes pasos (tema por tema)

1. Instalar dependencias bloqueadas y habilitar `NEXT_ENABLE_STANDARD_MDX=1`.
2. Activar `@next/mdx` en `next.config.ts` con `remark-math` + `rehype-katex`.
3. En la ruta `/unidad/electricidad-mdx/[slug]`, reemplazar el fallback por render estándar real para un tema piloto.
4. Validar paridad visual/anchors con el renderer actual y migrar tema por tema.
5. Cuando haya paridad total, retirar fallback progresivamente.
