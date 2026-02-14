# ARCHITECTURE

## 1. Vista general
La aplicacion sigue una arquitectura por capas, centrada en contenido estatico:
- Presentacion: `src/app` + `src/components`.
- Dominio de contenido: `src/content`.
- Servicios de lectura/parseo: `src/lib`.
- Automatizacion de build: `scripts`.

## 2. Capas y responsabilidades

### `src/app` (routing y orquestacion)
- Define rutas y layouts App Router.
- Ejecuta fetch de contenido en server components.
- Mapea datos `TopicContent` a componentes de card.
- Implementa metadata por pagina y sitemap.

Rutas clave:
- `src/app/layout.tsx`: layout raiz + header + theme provider.
- `src/app/page.tsx`: landing.
- `src/app/unidad/electricidad/layout.tsx`: layout con sidebar y drawer movil.
- `src/app/unidad/electricidad/page.tsx`: indice de unidad.
- `src/app/unidad/electricidad/[slug]/page.tsx`: pagina principal de tema.
- `src/app/unidad/electricidad-mdx/[slug]/page.tsx`: entorno de prueba MDX.

### `src/components` (UI reusable y bloques de dominio)
- `layout`: Header, Sidebar, ThemeToggle, PrevNext, MobileDrawer.
- `search`: SearchBox/SearchResults (client-side filtering).
- `content`: render de tokens, math y cards tematicas.
- `ui`: primitives (`Button`, `Card`, `Badge`, `Input`, `Collapsible`).

### `src/content` (fuente de verdad de contenido)
- `src/content/nav.ts`: arbol de navegacion con orden y anchors.
- `src/content/electricidad/*.mdx`: contenido nuevo/migrado.
- `src/content/electricidad/*.json`: contenido legado.
- `src/content/search-index.json`: indice para busqueda local.

### `src/lib` (servicios y utilidades)
- `content.ts`: API unificada por slug (prefer MDX, fallback JSON).
- `mdx.ts`: lectura de archivo MDX + parseo frontmatter.
- `mdxSections.ts`: parseo de estructura heading->cards.
- `mathTokens.ts`: tokenizador inline y block math.
- `nav.ts`: consultas de navegacion (topics, prev/next, first per part).
- `search.ts`: acceso al search index y filtro por query.
- `seo.ts`: metadata factory.
- `utils.ts`: helper `cn`.

### `scripts` (build tooling)
- `generate-search-index.mjs`: regenera `search-index.json`.
- `parse-smoke-test.mjs`: test rapido de parser/tokenizador.

## 3. Flujo principal de datos

### 3.1 Render de un tema `/unidad/electricidad/[slug]`
1. App Router resuelve `slug`.
2. `getTopicContentBySlug(slug)` en `src/lib/content.ts`:
   - Intenta `getMdxBySlug`.
   - Si hay MDX valido, parsea secciones con `parseMdxSections`.
   - Si no, lee JSON legado.
3. `page.tsx` mapea `ContentBlock` a cards:
   - `idea` -> `IdeaClaveCard`
   - `explain` -> `ExplicacionCard`
   - `example` -> `EjemploCard`
   - `formulas` -> `FormulaCard`
4. Navegacion lateral y prev/next se resuelven con `src/lib/nav.ts`.

### 3.2 Busqueda local
1. `scripts/generate-search-index.mjs` genera `src/content/search-index.json`.
2. `Header` obtiene indice con `getSearchIndex()`.
3. `SearchBox` filtra en cliente por `title + description + bodyPlain`.
4. Resultado navega directo por `href` (incluye anchors).

### 3.3 SEO y sitemap
1. Cada pagina usa `createPageMetadata`.
2. `BASE_URL` deriva de `NEXT_PUBLIC_SITE_URL` o localhost.
3. `src/app/sitemap.ts` recorre `getTopicNodes()` para construir URLs.

## 4. Patrones de Server/Client Components
- Server components por defecto para paginas/layouts y lectura de datos.
- Client components solo cuando hay estado o APIs browser:
  - `SearchBox`, `Sidebar`, `MobileDrawer`, `ThemeToggle`, `Collapsible`.
- `Header` es server component que inyecta indice inicial a componente client.

## 5. Diseño de navegacion
- Estructura de nav es estatica y tipada.
- `isPage` distingue paginas reales de anchors internos.
- El estado activo en sidebar ignora hash y compara base pathname.
- Anchors deben existir tanto en nav como en contenido renderizado.

## 6. Render de matematica
- Tokenizacion:
  - Inline: `$...$`.
  - Bloque: `$$...$$`.
  - Escape: `\$`.
- Render:
  - `InlineMath` y `BlockMath` intentan KaTeX.
  - Si falla, muestran fallback en texto/`code`.
- Seguridad:
  - `dangerouslySetInnerHTML` acotado solo a componentes math.

## 7. Decision de migracion JSON -> MDX
- Estrategia de convivencia incremental.
- Beneficio: no se bloquea delivery por migracion completa.
- Costo: doble formato temporal y potencial drift.
- Control de riesgo:
  - Resolver contenido por slug con prioridad MDX.
  - Mantener JSON como compatibilidad.
  - Probar parser con smoke test dedicado.

## 8. Pipeline estandar MDX (estado)
- Existe scaffolding para modo estandar (`src/lib/mdxStandard.ts`).
- Se activa con `NEXT_ENABLE_STANDARD_MDX=1`.
- Verifica presencia de deps:
  - `@next/mdx`
  - `remark-math`
  - `rehype-katex`
  - `katex`
- Si no estan, se conserva fallback actual.

## 9. Riesgos arquitectonicos y deuda tecnica
- Parser MDX custom no soporta markdown completo ni anidado complejo.
- Estado de migracion parcial exige disciplina de sincronizacion nav/contenido.
- Search index depende de parsing regex de `nav.ts`; sensible a cambios de formato.
- Encoding de algunos archivos muestra mojibake en terminal; conviene normalizar UTF-8.

## 10. Lineamientos para evolucion
- Corto plazo:
  - consolidar paridad MDX en todas las paginas.
  - fortalecer test de parser/search index.
- Mediano plazo:
  - activar pipeline MDX estandar cuando deps esten disponibles.
  - reducir duplicidad entre `nav.ts` y contenido.
- Largo plazo:
  - retirar JSON legado cuando exista paridad completa.

