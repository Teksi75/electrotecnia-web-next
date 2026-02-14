# CODING_RULES

## 1. Principios generales
- Mantener simplicidad y compatibilidad incremental.
- No romper rutas publicas ni anchors existentes.
- Priorizar cambios pequenos y verificables.
- Evitar introducir dependencias innecesarias.

## 2. TypeScript y tipado
- Mantener `strict` sin excepciones.
- Reusar tipos de `src/types/index.ts` antes de crear nuevos.
- Preferir unions explicitas para estados finitos (`type` de bloques, variantes UI).
- Evitar `any`; usar `unknown` + narrowing cuando no haya alternativa.

## 3. Imports y estructura
- Usar alias `@/*` para imports dentro de `src`.
- Orden sugerido:
  - imports de terceros/next/react.
  - imports absolutos del proyecto.
  - imports de tipos (cuando aplique).
- Mantener modulos pequenos con una responsabilidad clara.

## 4. Convenciones de componentes React
- Server component por defecto.
- Agregar `"use client"` solo cuando se use:
  - estado local.
  - hooks de navegacion cliente.
  - APIs del browser.
- Props tipadas y minimas.
- Mantener componentes de presentacion desacoplados de IO.

## 5. Reglas para UI y estilos
- Usar utilidades Tailwind existentes.
- Reusar primitives en `src/components/ui` antes de crear nuevas.
- Concatenar clases con `cn()` desde `src/lib/utils.ts`.
- Mantener contraste y legibilidad en claro/oscuro.

## 6. Reglas de contenido y navegacion
- `src/content/nav.ts` es obligatorio para orden y estructura de sidebar.
- Cada slug de tema debe existir en nav y en archivo de contenido.
- Para subtemas:
  - Definir anchor en MDX `### Titulo {#anchor}`.
  - Definir `href` con `#anchor` en nav.
- No cambiar anchors publicados sin migracion de enlaces.

## 7. Reglas para MDX y JSON
- Frontmatter MDX obligatorio:
  - `title`
  - `description`
  - `part`
  - `order`
- Mantener headings estandares en MDX:
  - `## Idea clave`
  - `## Mini explicacion` o `## Explicacion`
  - `## Ejemplo numerico (SI)`
  - `## Formulas`
- Durante migracion, no eliminar JSON si no existe paridad funcional confirmada.

## 8. Reglas del parser matematico
- Inline math: `$...$`.
- Block math: `$$...$$`.
- Dollar literal: `\$`.
- Evitar patrones complejos que el parser custom no soporte.
- Si se toca `mathTokens.ts` o `mdxSections.ts`, correr `npm run test:parse-smoke`.

## 9. Reglas de busqueda e indexado
- Todo cambio en:
  - `src/content/nav.ts`
  - `src/content/electricidad/*.mdx`
  - `src/content/electricidad/*.json`
  requiere regenerar indice (`npm run predev` o `npm run build`).
- `search-index.json` debe quedar consistente con slugs y anchors.

## 10. Reglas de SEO y metadata
- Para paginas nuevas usar `createPageMetadata`.
- Respetar `BASE_URL` y canonical por ruta.
- Mantener `sitemap.ts` actualizado cuando se agreguen rutas no derivadas de nav.

## 11. Reglas para scripts
- Scripts en `scripts/*.mjs` deben ser idempotentes.
- Evitar side effects fuera de archivos esperados.
- Log minimo y claro en salida estandar.

## 12. Calidad minima antes de merge
- `npm run lint`
- `npm run test:parse-smoke`
- `npm run build`
- Verificar manualmente:
  - `/unidad/electricidad`
  - un tema con anchors
  - busqueda en header
  - toggle de tema

## 13. Antipatrones a evitar
- Duplicar logica de parseo en multiples archivos.
- Acoplar componentes UI a detalles de filesystem.
- Cambiar nombres de slugs sin actualizar nav/search/sitemap.
- Introducir `dangerouslySetInnerHTML` fuera del dominio de math.
- Editar `next-env.d.ts` manualmente.

