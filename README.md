# Electrotecnia Web

Apunte/wiki de la unidad **Electricidad** con Next.js (App Router), TypeScript, Tailwind y MDX.

## Correr
- `npm install`
- `npm run dev`
- Abrir `http://localhost:3000`

## Agregar un tema
1. Crear `src/content/electricidad/<slug>.mdx` con frontmatter:
   - `title`
   - `part`
   - `order`
   - `description`
2. Agregar el nodo en `src/content/nav.ts` (incluyendo `href` y subitems con `#anchor` si aplica).
