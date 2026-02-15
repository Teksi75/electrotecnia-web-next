# Guía de edición MDX — Unidad Electricidad

> Estado actual del repositorio: en `src/content/electricidad/` no existen archivos `.mdx`; el contenido actual está en `.json` con placeholders `PENDIENTE`.

## 1) Inventario actual en `src/content/electricidad/`

### 1.1 Archivos `.mdx` existentes

No hay archivos `.mdx` actualmente en `src/content/electricidad/`.

### 1.2 Orden de temas según `src/content/nav.ts` (Partes 1 y 2)

1. `metodos-electrificacion`
2. `ley-de-coulomb`
3. `fuerza-electrica`
4. `campo-electrico`
5. `energia-potencial-electrica`
6. `potencial-electrico`
7. `corriente-electrica`
8. `tension-electrica`
9. `resistencia-electrica`
10. `variacion-de-la-resistencia`
11. `ley-de-ohm`
12. `circuitos-electricos`
13. `leyes-de-kirchhoff`
14. `potencia-electrica`
15. `energia-electrica`
16. `ley-de-joule`

---

## 2) Guía de edición por archivo MDX (ruta, título, URL, headings e inserción)

> Convención propuesta de ruta MDX por slug: `src/content/electricidad/<slug>.mdx`

## Archivo MDX
`src/content/electricidad/metodos-electrificacion.mdx`

- **Título:** Métodos de electrificación de un cuerpo  
- **URL:** `/unidad/electricidad/metodos-electrificacion`  
- **Headings/IDs esperados:**
  - `## Idea clave`
  - `## Mini explicación`
  - `## Ejemplo numérico (SI)`
  - `### Por frotamiento {#por-frotamiento}`
  - `### Por contacto {#por-contacto}`
  - `### Por inducción {#por-induccion}`

- **Dónde pegar cada bloque base:**

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Subtema: por-frotamiento | Debajo de `### Por frotamiento {#por-frotamiento}` |
| Subtema: por-contacto | Debajo de `### Por contacto {#por-contacto}` |
| Subtema: por-induccion | Debajo de `### Por inducción {#por-induccion}` |

Plantilla interna de subtema:

```mdx
### Por frotamiento {#por-frotamiento}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Por contacto {#por-contacto}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Por inducción {#por-induccion}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

---

## Archivo MDX
`src/content/electricidad/ley-de-coulomb.mdx`

- **Título:** Ley de Coulomb
- **URL:** `/unidad/electricidad/ley-de-coulomb`
- **Headings/IDs esperados:**
  - `## Idea clave`
  - `## Mini explicación`
  - `## Ejemplo numérico (SI)`
  - `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/fuerza-electrica.mdx`

- **Título:** Fuerza eléctrica
- **URL:** `/unidad/electricidad/fuerza-electrica`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/campo-electrico.mdx`

- **Título:** Campo eléctrico
- **URL:** `/unidad/electricidad/campo-electrico`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/energia-potencial-electrica.mdx`

- **Título:** Energía potencial eléctrica
- **URL:** `/unidad/electricidad/energia-potencial-electrica`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/potencial-electrico.mdx`

- **Título:** Potencial eléctrico
- **URL:** `/unidad/electricidad/potencial-electrico`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/corriente-electrica.mdx`

- **Título:** Corriente eléctrica
- **URL:** `/unidad/electricidad/corriente-electrica`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/tension-electrica.mdx`

- **Título:** Tensión eléctrica (diferencia de potencial)
- **URL:** `/unidad/electricidad/tension-electrica`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/resistencia-electrica.mdx`

- **Título:** Resistencia eléctrica
- **URL:** `/unidad/electricidad/resistencia-electrica`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/variacion-de-la-resistencia.mdx`

- **Título:** Variación de la resistencia
- **URL:** `/unidad/electricidad/variacion-de-la-resistencia`
- **Headings/IDs esperados:**
  - `## Idea clave`
  - `## Mini explicación`
  - `## Ejemplo numérico (SI)`
  - `## Fórmulas`
  - `### Con la longitud {#con-la-longitud}`
  - `### Con el área de la sección {#con-el-area-de-la-seccion}`
  - `### Con el material {#con-el-material}`
  - `### Con la temperatura {#con-la-temperatura}`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |
| Subtema: con-la-longitud | Debajo de `### Con la longitud {#con-la-longitud}` |
| Subtema: con-el-area-de-la-seccion | Debajo de `### Con el área de la sección {#con-el-area-de-la-seccion}` |
| Subtema: con-el-material | Debajo de `### Con el material {#con-el-material}` |
| Subtema: con-la-temperatura | Debajo de `### Con la temperatura {#con-la-temperatura}` |

Plantillas internas:

```mdx
### Con la longitud {#con-la-longitud}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Con el área de la sección {#con-el-area-de-la-seccion}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Con el material {#con-el-material}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Con la temperatura {#con-la-temperatura}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

---

## Archivo MDX
`src/content/electricidad/ley-de-ohm.mdx`

- **Título:** Ley de Ohm
- **URL:** `/unidad/electricidad/ley-de-ohm`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/circuitos-electricos.mdx`

- **Título:** Circuitos eléctricos
- **URL:** `/unidad/electricidad/circuitos-electricos`
- **Headings/IDs esperados:**
  - `## Idea clave`
  - `## Mini explicación`
  - `## Ejemplo numérico (SI)`
  - `## Fórmulas`
  - `### Circuitos en serie {#circuitos-en-serie}`
  - `### Circuitos en paralelo {#circuitos-en-paralelo}`
  - `### Circuitos mixtos {#circuitos-mixtos}`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |
| Subtema: circuitos-en-serie | Debajo de `### Circuitos en serie {#circuitos-en-serie}` |
| Subtema: circuitos-en-paralelo | Debajo de `### Circuitos en paralelo {#circuitos-en-paralelo}` |
| Subtema: circuitos-mixtos | Debajo de `### Circuitos mixtos {#circuitos-mixtos}` |

Plantillas internas:

```mdx
### Circuitos en serie {#circuitos-en-serie}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Circuitos en paralelo {#circuitos-en-paralelo}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Circuitos mixtos {#circuitos-mixtos}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

---

## Archivo MDX
`src/content/electricidad/leyes-de-kirchhoff.mdx`

- **Título:** Leyes de Kirchhoff
- **URL:** `/unidad/electricidad/leyes-de-kirchhoff`
- **Headings/IDs esperados:**
  - `## Idea clave`
  - `## Mini explicación`
  - `## Ejemplo numérico (SI)`
  - `## Fórmulas`
  - `### Primera ley (corrientes o nodos) {#primera-ley-corrientes-o-nodos}`
  - `### Segunda ley (tensiones o mallas) {#segunda-ley-tensiones-o-mallas}`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |
| Subtema: primera-ley-corrientes-o-nodos | Debajo de `### Primera ley (corrientes o nodos) {#primera-ley-corrientes-o-nodos}` |
| Subtema: segunda-ley-tensiones-o-mallas | Debajo de `### Segunda ley (tensiones o mallas) {#segunda-ley-tensiones-o-mallas}` |

Plantillas internas:

```mdx
### Primera ley (corrientes o nodos) {#primera-ley-corrientes-o-nodos}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

```mdx
### Segunda ley (tensiones o mallas) {#segunda-ley-tensiones-o-mallas}
(Pegar aquí idea clave)
(Pegar aquí mini explicación)
(Pegar aquí ejemplo)
```

---

## Archivo MDX
`src/content/electricidad/potencia-electrica.mdx`

- **Título:** Potencia eléctrica
- **URL:** `/unidad/electricidad/potencia-electrica`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/energia-electrica.mdx`

- **Título:** Energía eléctrica
- **URL:** `/unidad/electricidad/energia-electrica`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## Archivo MDX
`src/content/electricidad/ley-de-joule.mdx`

- **Título:** Ley de Joule
- **URL:** `/unidad/electricidad/ley-de-joule`
- **Headings/IDs esperados:** `## Idea clave`, `## Mini explicación`, `## Ejemplo numérico (SI)`, `## Fórmulas`

| Sección | Dónde pegar |
|---|---|
| Idea clave | Debajo de `## Idea clave` |
| Mini explicación | Debajo de `## Mini explicación` |
| Ejemplo numérico con unidades SI | Debajo de `## Ejemplo numérico (SI)` |
| Fórmulas (si aplica) | Debajo de `## Fórmulas` |

---

## 3) Asignación completa mapa de navegación (Partes 1 y 2) → archivo MDX

### Parte 1: Electricidad básica (cargas y campos)
- Métodos de electrificación de un cuerpo → `src/content/electricidad/metodos-electrificacion.mdx`
- Ley de Coulomb → `src/content/electricidad/ley-de-coulomb.mdx`
- Fuerza eléctrica → `src/content/electricidad/fuerza-electrica.mdx`
- Campo eléctrico → `src/content/electricidad/campo-electrico.mdx`
- Energía potencial eléctrica → `src/content/electricidad/energia-potencial-electrica.mdx`
- Potencial eléctrico → `src/content/electricidad/potencial-electrico.mdx`

### Parte 2: Electricidad en circuitos
- Corriente eléctrica → `src/content/electricidad/corriente-electrica.mdx`
- Tensión eléctrica (diferencia de potencial) → `src/content/electricidad/tension-electrica.mdx`
- Resistencia eléctrica → `src/content/electricidad/resistencia-electrica.mdx`
- Variación de la resistencia → `src/content/electricidad/variacion-de-la-resistencia.mdx`
- Ley de Ohm → `src/content/electricidad/ley-de-ohm.mdx`
- Circuitos eléctricos → `src/content/electricidad/circuitos-electricos.mdx`
- Leyes de Kirchhoff → `src/content/electricidad/leyes-de-kirchhoff.mdx`
- Potencia eléctrica → `src/content/electricidad/potencia-electrica.mdx`
- Energía eléctrica → `src/content/electricidad/energia-electrica.mdx`
- Ley de Joule → `src/content/electricidad/ley-de-joule.mdx`

---

## 4) Listado de MDX vacíos/placeholders faltantes y ubicación jerárquica

### Faltantes (no existen aún)
- `src/content/electricidad/metodos-electrificacion.mdx`
- `src/content/electricidad/ley-de-coulomb.mdx`
- `src/content/electricidad/fuerza-electrica.mdx`
- `src/content/electricidad/campo-electrico.mdx`
- `src/content/electricidad/energia-potencial-electrica.mdx`
- `src/content/electricidad/potencial-electrico.mdx`
- `src/content/electricidad/corriente-electrica.mdx`
- `src/content/electricidad/tension-electrica.mdx`
- `src/content/electricidad/resistencia-electrica.mdx`
- `src/content/electricidad/variacion-de-la-resistencia.mdx`
- `src/content/electricidad/ley-de-ohm.mdx`
- `src/content/electricidad/circuitos-electricos.mdx`
- `src/content/electricidad/leyes-de-kirchhoff.mdx`
- `src/content/electricidad/potencia-electrica.mdx`
- `src/content/electricidad/energia-electrica.mdx`
- `src/content/electricidad/ley-de-joule.mdx`

### Ubicación en jerarquía de contenido
- Carpeta raíz de unidad: `src/content/electricidad/`
- Jerarquía lógica de navegación:
  - Parte 1 → temas 1 a 6
  - Parte 2 → temas 1 a 10 (en la parte 2)
- Subtemas internos se pegan dentro de cada MDX en headings `### ... {#id}` (no como archivos separados).

---

## 5) Estado de headings existentes en contenido actual (referencia para migración)

Como no hay MDX, no hay headings MDX existentes. En los JSON actuales:
- Bloques base por tema: `Idea clave`, `Explicación`, `Ejemplo` y (en casi todos) `Fórmulas`.
- IDs internos presentes solo en:
  - `metodos-electrificacion`: `por-frotamiento`, `por-contacto`, `por-induccion`
  - `variacion-de-la-resistencia`: `con-la-longitud`, `con-el-area-de-la-seccion`, `con-el-material`, `con-la-temperatura`
  - `circuitos-electricos`: `circuitos-en-serie`, `circuitos-en-paralelo`, `circuitos-mixtos`
  - `leyes-de-kirchhoff`: `primera-ley-corrientes-o-nodos`, `segunda-ley-tensiones-o-mallas`

