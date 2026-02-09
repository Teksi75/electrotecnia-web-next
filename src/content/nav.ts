export type ContentNode = {
  title: string;
  slug: string;
  part: 1 | 2;
  order: number;
  description: string;
  href: string;
  children?: ContentNode[];
  isPage: boolean;
};

export type ContentSection = {
  title: string;
  slug: string;
  part: 1 | 2;
  order: number;
  description: string;
  href: string;
  isPage: false;
  children: ContentNode[];
};

export const electricidadNav: ContentSection[] = [
  {
    title: "Parte 1 – Electricidad básica (cargas y campos)",
    slug: "parte-1-electricidad-basica",
    part: 1,
    order: 1,
    description: "Cargas eléctricas, fuerzas y campos.",
    href: "/unidad/electricidad/metodos-electrificacion",
    isPage: false,
    children: [
      {
        title: "Métodos de electrificación de un cuerpo",
        slug: "metodos-electrificacion",
        part: 1,
        order: 1,
        description: "Transferencia de electrones y conservación de la carga.",
        href: "/unidad/electricidad/metodos-electrificacion",
        isPage: true,
        children: [
          { title: "Por frotamiento", slug: "por-frotamiento", part: 1, order: 1.1, description: "Subtema", href: "/unidad/electricidad/metodos-electrificacion#por-frotamiento", isPage: false },
          { title: "Por contacto", slug: "por-contacto", part: 1, order: 1.2, description: "Subtema", href: "/unidad/electricidad/metodos-electrificacion#por-contacto", isPage: false },
          { title: "Por inducción", slug: "por-induccion", part: 1, order: 1.3, description: "Subtema", href: "/unidad/electricidad/metodos-electrificacion#por-induccion", isPage: false },
        ],
      },
      { title: "Ley de Coulomb", slug: "ley-de-coulomb", part: 1, order: 2, description: "Fuerza entre cargas puntuales.", href: "/unidad/electricidad/ley-de-coulomb", isPage: true },
      { title: "Fuerza eléctrica", slug: "fuerza-electrica", part: 1, order: 3, description: "Acción eléctrica sobre una carga.", href: "/unidad/electricidad/fuerza-electrica", isPage: true },
      { title: "Campo eléctrico", slug: "campo-electrico", part: 1, order: 4, description: "Relación E=F/q.", href: "/unidad/electricidad/campo-electrico", isPage: true },
      { title: "Energía potencial eléctrica", slug: "energia-potencial-electrica", part: 1, order: 5, description: "Energía por posición en un campo.", href: "/unidad/electricidad/energia-potencial-electrica", isPage: true },
      { title: "Potencial eléctrico", slug: "potencial-electrico", part: 1, order: 6, description: "Energía por unidad de carga.", href: "/unidad/electricidad/potencial-electrico", isPage: true },
    ],
  },
  {
    title: "Parte 2 – Electricidad en circuitos",
    slug: "parte-2-electricidad-circuitos",
    part: 2,
    order: 2,
    description: "Magnitudes y leyes de circuitos.",
    href: "/unidad/electricidad/corriente-electrica",
    isPage: false,
    children: [
      { title: "Corriente eléctrica", slug: "corriente-electrica", part: 2, order: 1, description: "I=ΔQ/Δt.", href: "/unidad/electricidad/corriente-electrica", isPage: true },
      { title: "Tensión eléctrica (diferencia de potencial)", slug: "tension-electrica", part: 2, order: 2, description: "Empuje eléctrico entre dos puntos.", href: "/unidad/electricidad/tension-electrica", isPage: true },
      { title: "Resistencia eléctrica", slug: "resistencia-electrica", part: 2, order: 3, description: "Oposición al paso de corriente.", href: "/unidad/electricidad/resistencia-electrica", isPage: true },
      {
        title: "Variación de la resistencia",
        slug: "variacion-resistencia",
        part: 2,
        order: 4,
        description: "Cómo cambia R con L, A, material y temperatura.",
        href: "/unidad/electricidad/variacion-resistencia",
        isPage: true,
        children: [
          { title: "Con la longitud", slug: "con-la-longitud", part: 2, order: 4.1, description: "Subtema", href: "/unidad/electricidad/variacion-resistencia#con-la-longitud", isPage: false },
          { title: "Con el área de la sección", slug: "con-el-area-de-la-seccion", part: 2, order: 4.2, description: "Subtema", href: "/unidad/electricidad/variacion-resistencia#con-el-area-de-la-seccion", isPage: false },
          { title: "Con el material", slug: "con-el-material", part: 2, order: 4.3, description: "Subtema", href: "/unidad/electricidad/variacion-resistencia#con-el-material", isPage: false },
          { title: "Con la temperatura", slug: "con-la-temperatura", part: 2, order: 4.4, description: "Subtema", href: "/unidad/electricidad/variacion-resistencia#con-la-temperatura", isPage: false },
        ],
      },
      { title: "Ley de Ohm", slug: "ley-de-ohm", part: 2, order: 5, description: "V=I⋅R.", href: "/unidad/electricidad/ley-de-ohm", isPage: true },
      {
        title: "Circuitos eléctricos",
        slug: "circuitos-electricos",
        part: 2,
        order: 6,
        description: "Serie, paralelo y mixtos.",
        href: "/unidad/electricidad/circuitos-electricos",
        isPage: true,
        children: [
          { title: "Circuitos en serie", slug: "circuitos-en-serie", part: 2, order: 6.1, description: "Subtema", href: "/unidad/electricidad/circuitos-electricos#circuitos-en-serie", isPage: false },
          { title: "Circuitos en paralelo", slug: "circuitos-en-paralelo", part: 2, order: 6.2, description: "Subtema", href: "/unidad/electricidad/circuitos-electricos#circuitos-en-paralelo", isPage: false },
          { title: "Circuitos mixtos", slug: "circuitos-mixtos", part: 2, order: 6.3, description: "Subtema", href: "/unidad/electricidad/circuitos-electricos#circuitos-mixtos", isPage: false },
        ],
      },
      {
        title: "Leyes de Kirchhoff",
        slug: "leyes-de-kirchhoff",
        part: 2,
        order: 7,
        description: "KCL y KVL.",
        href: "/unidad/electricidad/leyes-de-kirchhoff",
        isPage: true,
        children: [
          { title: "Primera ley (corrientes o nodos) — KCL", slug: "primera-ley-corrientes-o-nodos-kcl", part: 2, order: 7.1, description: "Subtema", href: "/unidad/electricidad/leyes-de-kirchhoff#primera-ley-corrientes-o-nodos-kcl", isPage: false },
          { title: "Segunda ley (tensiones o mallas) — KVL", slug: "segunda-ley-tensiones-o-mallas-kvl", part: 2, order: 7.2, description: "Subtema", href: "/unidad/electricidad/leyes-de-kirchhoff#segunda-ley-tensiones-o-mallas-kvl", isPage: false },
        ],
      },
      { title: "Potencia eléctrica", slug: "potencia-electrica", part: 2, order: 8, description: "P=VI.", href: "/unidad/electricidad/potencia-electrica", isPage: true },
      { title: "Energía eléctrica", slug: "energia-electrica", part: 2, order: 9, description: "E=P⋅t.", href: "/unidad/electricidad/energia-electrica", isPage: true },
      { title: "Ley de Joule", slug: "ley-de-joule", part: 2, order: 10, description: "Calor por efecto resistivo.", href: "/unidad/electricidad/ley-de-joule", isPage: true },
      { title: "Glosario de unidades", slug: "glosario-unidades", part: 2, order: 11, description: "Unidades de la unidad.", href: "/unidad/electricidad/glosario-unidades", isPage: true },
    ],
  },
];
