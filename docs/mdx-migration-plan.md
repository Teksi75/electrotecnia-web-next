# Plan de migración JSON → MDX (Unidad Electricidad)

## Objetivo
Migrar de forma incremental el contenido de `Unidad Electricidad` desde archivos JSON hacia MDX real, **sin romper** la ruta actual en producción (`/unidad/electricidad/[slug]`) y manteniendo compatibilidad con build/deploy en Vercel.

## ETAPA 0 — Diagnóstico del estado actual

### 1) ¿Dónde vive el contenido actual y quién lo consume?

#### Fuente de contenido (JSON)
- Carpeta de contenido principal: `src/content/electricidad/*.json`
- Loader de contenido JSON: `src/lib/content.ts`
  - `getAllTopicSlugs()` lista slugs desde archivos `.json`.
  - `getTopicContentBySlug(slug)` lee y parsea cada JSON.

#### Páginas/componentes consumidores
- Ruta principal por tema: `src/app/unidad/electricidad/[slug]/page.tsx`
  - Genera `static params` con slugs JSON.
  - Renderiza bloques (`topic.blocks`) y secciones (`topic.sections`) con IDs para hash navigation.
- Índice de unidad: `src/app/unidad/electricidad/page.tsx`
  - Usa la estructura de navegación para links de entrada a Parte 1/2.
- Layout con sidebar: `src/app/unidad/electricidad/layout.tsx`
  - Monta el `Sidebar` para toda la unidad.

#### Dependencias indirectas importantes
- `scripts/generate-search-index.mjs`
  - Lee `src/content/nav.ts` + JSON para construir `src/content/search-index.json`.
  - Actualmente depende de que exista JSON para cada slug de `/unidad/electricidad/...`.

---

### 2) ¿Cómo se construye sidebar/nav y cómo funciona hash navigation?

#### Sidebar/nav
- Árbol base hardcodeado: `src/content/nav.ts` (`electricidadNav`).
  - Define páginas (`isPage: true`) y subtemas internos/anchors (`isPage: false`, `href` con `#hash`).
- Helpers de navegación: `src/lib/nav.ts`
  - `getSectionNodes()`: secciones para sidebar.
  - `getTopicNodes()`: páginas navegables (sin anchors) para prev/next.
  - `getPrevNextBySlug()`: navegación secuencial.
- Render del sidebar: `src/components/layout/Sidebar.tsx`
  - Compara `pathname` con `href` sin hash para estado activo.
  - Los subitems con hash navegan a anchors dentro de la página.

#### Hash navigation de subtemas
- En JSON, cada sección interna se renderiza como:
  - `<section id={section.id} className="scroll-mt-24 ...">` en `src/app/unidad/electricidad/[slug]/page.tsx`.
- El hash funciona porque:
  1. `nav.ts` apunta a `/unidad/electricidad/<slug>#<id>`.
  2. La página tiene elementos con `id=<id>`.
  3. `scroll-mt-24` evita que el header fijo tape el título.

---

### 3) Decisión técnica recomendada

Para priorizar estabilidad y DX en PRs pequeños:

1. **Mantener intacta la ruta JSON actual** durante la migración.
2. **Agregar una ruta temporal MDX paralela** (`/unidad/electricidad-mdx/[slug]`) para validar pipeline.
3. **Crear utilidades MDX dedicadas** (`src/lib/mdx.ts`) para lectura por `unit + slug`.
4. **No mutar todavía `src/content/nav.ts` ni search** en esta etapa.
5. En etapa posterior, unificar datos con un adaptador (JSON/MDX) y recién ahí mover navegación, prev/next, anchors y search al nuevo backend de contenido.

Esta estrategia reduce blast radius: si falla MDX, la experiencia de `/unidad/electricidad/*` sigue operativa.

## ETAPA 1 — MDX mínimo (alcance de este PR)

- Soporte de lectura MDX por slug en `src/lib/mdx.ts`.
- Ruta temporal `app/unidad/electricidad-mdx/[slug]/page.tsx`.
- Archivo demo: `src/content/electricidad/metodos-electrificacion.mdx`.
- Enlace/compatibilidad: no se reemplaza ni rompe la ruta JSON existente.

## Próximos pasos sugeridos (ETAPA 2)

1. Crear árbol de navegación para MDX (o extender `nav.ts` con base única).
2. Agregar prev/next para ruta MDX usando orden/frontmatter.
3. Resolver anchors automáticos desde headings MDX y validar deep-links (`#...`).
4. Adaptar generación de search-index para coexistencia JSON+MDX.
5. Plan de switch controlado de `/unidad/electricidad/[slug]` a backend MDX cuando exista cobertura completa.
