# AGENTS

## 1. Proposito de este archivo
Guia operativa para cualquier agente o colaborador tecnico que trabaje en este repositorio.

## 2. Contexto del proyecto
- Proyecto: sitio educativo de Electrotecnia con Next.js App Router.
- Fuente de contenido actual: convivencia de MDX + JSON legado en `src/content/electricidad`.
- Navegacion central: `src/content/nav.ts`.
- Render principal de temas: `src/app/unidad/electricidad/[slug]/page.tsx`.

## 3. Mapa rapido para empezar
- Config principal: `package.json`, `next.config.ts`, `tsconfig.json`.
- Rutas: `src/app`.
- Dominio de contenido: `src/content`.
- Servicios: `src/lib`.
- Componentes UI: `src/components`.
- Scripts de soporte: `scripts`.

## 4. Flujo recomendado al recibir una tarea
1. Revisar impacto en rutas/contenido/nav.
2. Identificar si afecta parser MDX o busqueda.
3. Implementar cambio minimo viable.
4. Regenerar indice si hubo cambios de contenido/nav.
5. Ejecutar validaciones locales.
6. Entregar resumen de cambios + riesgos.

## 5. Checklist obligatorio antes de cerrar tarea
- `npm run lint`
- `npm run test:parse-smoke` (si se toco parser/math)
- `npm run build` (siempre recomendado para cambios estructurales)
- Verificar que `git status` no incluya artefactos inesperados.

## 6. Reglas criticas de compatibilidad
- No romper `href` existentes en `src/content/nav.ts`.
- No eliminar anchors usados por nav.
- No remover fallback JSON sin migracion completa validada.
- Mantener el contrato `TopicContent` estable.
- Mantener orden y `part/order` coherentes entre nav y contenido.

## 7. Procedimiento para agregar o actualizar un tema
1. Crear o editar `src/content/electricidad/<slug>.mdx`.
2. Confirmar frontmatter valido.
3. Agregar/ajustar nodo en `src/content/nav.ts`.
4. Si hay subsecciones:
   - agregar `### ... {#anchor}` en MDX.
   - agregar `href` con hash en nav.
5. Regenerar search index.
6. Probar navegacion, anchors y busqueda.

## 8. Procedimiento para cambios de parser
Archivos sensibles:
- `src/lib/mdx.ts`
- `src/lib/mdxSections.ts`
- `src/lib/mathTokens.ts`
- `src/components/content/renderTokens.tsx`

Acciones obligatorias:
- Ejecutar `npm run test:parse-smoke`.
- Probar un tema con formulas inline y de bloque.
- Validar texto con `\$` literal.

## 9. Convenciones de codigo en este repo
- TypeScript estricto, sin `any`.
- Alias `@/*` para imports internos.
- Server components por defecto.
- `"use client"` solo cuando sea necesario.
- Reusar primitives de `src/components/ui`.

## 10. Observaciones tecnicas utiles
- `Header` es server component y pasa indice a `SearchBox` (client).
- `Sidebar` marca activo por pathname base (sin hash).
- `generate-search-index.mjs` parsea `href` via regex sobre `nav.ts`.
- La ruta `electricidad-mdx` es entorno de prueba con fallback.

## 11. Riesgos comunes y mitigacion
- Riesgo: desalineacion nav vs contenido.
  - Mitigacion: revisar slug/anchor en ambos lados.
- Riesgo: cambios de parser rompen render silenciosamente.
  - Mitigacion: smoke tests + prueba manual de temas clave.
- Riesgo: search index desactualizado.
  - Mitigacion: ejecutar predev/prebuild tras cambios de contenido.

## 12. No hacer
- No editar `next-env.d.ts`.
- No introducir nuevas rutas sin metadata/SEO coherente.
- No cambiar slugs existentes salvo migracion explicita.
- No usar `dangerouslySetInnerHTML` fuera de componentes de math.

