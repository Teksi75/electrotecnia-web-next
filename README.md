# Electrotecnia Web (Unidad Electricidad)

## Correr
- `npm install`
- `npm run dev`
- Abrir `http://localhost:3000`

## Agregar un tema
1. Crear un `.mdx` en `src/content/electricidad/<slug>.mdx` con frontmatter:
   - `title`
   - `part`
   - `order`
   - `description`
2. Agregar el ítem en `src/content/nav.ts` con su `href` (`/unidad/electricidad/<slug>`).
3. Si tiene subitems internos, usar headings `###` en el MDX y enlazar en `nav.ts` con `#anchor`.
