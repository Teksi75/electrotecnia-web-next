# Electrotecnia Web

Web de consulta tipo wiki/apunte para la unidad de Electricidad, construida con Next.js (App Router), TypeScript, Tailwind CSS y MDX.

## Contexto rapido para Codex/IA
Para que Codex entienda el proyecto en pocos segundos, leer estos archivos primero:

1. `PROJECT_SPEC.md`
   - Objetivo del producto, alcance, stack, scripts, entorno y criterios tecnicos.
2. `ARCHITECTURE.md`
   - Arquitectura real del codigo, flujo de datos y responsabilidades por modulo.
3. `CODING_RULES.md`
   - Convenciones y reglas de implementacion para mantener consistencia.
4. `AGENTS.md`
   - Guia operativa para ejecutar tareas y validarlas antes de cerrar cambios.

Orden recomendado:
- `PROJECT_SPEC.md` -> `ARCHITECTURE.md` -> `CODING_RULES.md` -> `AGENTS.md`

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
3. Si el tema tiene subitems internos, usar este formato en MDX: `### <Titulo> {#anchor}` y enlazarlos desde `nav.ts` con `#anchor`.

## MDX source of truth
- La fuente principal de contenido para la Unidad Electricidad es `src/content/electricidad/*.mdx`.
- La ruta final `/unidad/electricidad/[slug]` prioriza MDX cuando el archivo es valido (frontmatter completo) y hace fallback automatico al JSON legado (`*.json`) si falta o no es valido.
- El indice de busqueda (`src/content/search-index.json`) se genera desde MDX cuando esta disponible y conserva fallback JSON.

### Como agregar un tema nuevo
1. Crear `src/content/electricidad/<slug>.mdx` con frontmatter minimo: `title`, `description`, `part`, `order`.
2. Mantener secciones base:
   - `## Idea clave`
   - `## Mini explicacion`
   - `## Ejemplo numerico (SI)`
   - `## Formulas` (solo si corresponde)
3. Si tiene subtemas, agregar `### <Titulo> {#anchor}` y usar el mismo `#anchor` en `src/content/nav.ts`.
4. Agregar/ajustar el nodo del tema en `src/content/nav.ts` para sidebar, orden y prev/next.
5. Regenerar indice: `npm run build` (ejecuta `prebuild`) o `npm run predev`.
