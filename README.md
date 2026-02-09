# Electrotecnia Web Next

Web de consulta tipo wiki/apunte para la unidad de Electricidad, construida con Next.js (App Router), TypeScript, Tailwind CSS y contenido estructurado en JSON.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

> `prebuild` genera automáticamente `src/content/search-index.json` a partir de `src/content/electricidad/*.json`.

## Estructura de contenido

- Navegación: `src/content/nav.ts`
- Temas: `src/content/electricidad/<slug>.json`
- Índice de búsqueda generado: `src/content/search-index.json`

Cada tema usa bloques estructurados (`idea`, `explain`, `example`, `formulas`) y opcionalmente `sections` para subitems.
