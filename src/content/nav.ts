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
    title: "Parte 1: Electricidad básica (cargas y campos)",
    slug: "parte-1-electricidad-basica",
    part: 1,
    order: 1,
    description: "Conceptos base de carga, fuerza, campo y potencial.",
    href: "/unidad/electricidad-mdx/metodos-electrificacion",
    isPage: false,
    children: [
      {
        title: "Métodos de electrificación de un cuerpo",
        slug: "metodos-electrificacion",
        part: 1,
        order: 1,
        description: "Formas de electrizar un cuerpo por interacción.",
        href: "/unidad/electricidad-mdx/metodos-electrificacion",
        isPage: true,
        children: [
          {
            title: "Por frotamiento",
            slug: "por-frotamiento",
            part: 1,
            order: 1.1,
            description: "(Subtema interno del tema principal)",
            href: "/unidad/electricidad-mdx/metodos-electrificacion#por-frotamiento",
            isPage: false,
          },
          {
            title: "Por contacto",
            slug: "por-contacto",
            part: 1,
            order: 1.2,
            description: "(Subtema interno del tema principal)",
            href: "/unidad/electricidad-mdx/metodos-electrificacion#por-contacto",
            isPage: false,
          },
          {
            title: "Por inducción",
            slug: "por-induccion",
            part: 1,
            order: 1.3,
            description: "(Subtema interno del tema principal)",
            href: "/unidad/electricidad-mdx/metodos-electrificacion#por-induccion",
            isPage: false,
          },
        ],
      },
      { title: "Ley de Coulomb", slug: "ley-de-coulomb", part: 1, order: 2, description: "Relación entre cargas y fuerza eléctrica.", href: "/unidad/electricidad-mdx/ley-de-coulomb", isPage: true },
      { title: "Fuerza eléctrica", slug: "fuerza-electrica", part: 1, order: 3, description: "Interacción eléctrica entre cuerpos cargados.", href: "/unidad/electricidad-mdx/fuerza-electrica", isPage: true },
      { title: "Campo eléctrico", slug: "campo-electrico", part: 1, order: 4, description: "Representación espacial de la acción eléctrica.", href: "/unidad/electricidad-mdx/campo-electrico", isPage: true },
      { title: "Energía potencial eléctrica", slug: "energia-potencial-electrica", part: 1, order: 5, description: "Energía asociada a la posición en un campo eléctrico.", href: "/unidad/electricidad-mdx/energia-potencial-electrica", isPage: true },
      { title: "Potencial eléctrico", slug: "potencial-electrico", part: 1, order: 6, description: "Trabajo por unidad de carga entre dos puntos.", href: "/unidad/electricidad-mdx/potencial-electrico", isPage: true },
    ],
  },
  {
    title: "Parte 2: Electricidad en circuitos",
    slug: "parte-2-electricidad-circuitos",
    part: 2,
    order: 2,
    description: "Magnitudes y leyes principales de circuitos.",
    href: "/unidad/electricidad-mdx/corriente-electrica",
    isPage: false,
    children: [
      { title: "Corriente eléctrica", slug: "corriente-electrica", part: 2, order: 1, description: "Flujo de carga eléctrica en un conductor.", href: "/unidad/electricidad-mdx/corriente-electrica", isPage: true },
      { title: "Tensión eléctrica (diferencia de potencial)", slug: "tension-electrica", part: 2, order: 2, description: "Diferencia de energía por unidad de carga.", href: "/unidad/electricidad-mdx/tension-electrica", isPage: true },
      { title: "Resistencia eléctrica", slug: "resistencia-electrica", part: 2, order: 3, description: "Oposición al paso de la corriente.", href: "/unidad/electricidad-mdx/resistencia-electrica", isPage: true },
      {
        title: "Variación de la resistencia",
        slug: "variacion-de-la-resistencia",
        part: 2,
        order: 4,
        description: "Factores geométricos y físicos de la resistencia.",
        href: "/unidad/electricidad-mdx/variacion-de-la-resistencia",
        isPage: true,
        children: [
          { title: "Con la longitud", slug: "con-la-longitud", part: 2, order: 4.1, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/variacion-de-la-resistencia#con-la-longitud", isPage: false },
          { title: "Con el área de la sección", slug: "con-el-area-de-la-seccion", part: 2, order: 4.2, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/variacion-de-la-resistencia#con-el-area-de-la-seccion", isPage: false },
          { title: "Con el material", slug: "con-el-material", part: 2, order: 4.3, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/variacion-de-la-resistencia#con-el-material", isPage: false },
          { title: "Con la temperatura", slug: "con-la-temperatura", part: 2, order: 4.4, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/variacion-de-la-resistencia#con-la-temperatura", isPage: false },
        ],
      },
      { title: "Ley de Ohm", slug: "ley-de-ohm", part: 2, order: 5, description: "Relación entre tensión, corriente y resistencia.", href: "/unidad/electricidad-mdx/ley-de-ohm", isPage: true },
      {
        title: "Circuitos eléctricos",
        slug: "circuitos-electricos",
        part: 2,
        order: 6,
        description: "Configuraciones de conexión en circuitos.",
        href: "/unidad/electricidad-mdx/circuitos-electricos",
        isPage: true,
        children: [
          { title: "Circuitos en serie", slug: "circuitos-en-serie", part: 2, order: 6.1, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/circuitos-electricos#circuitos-en-serie", isPage: false },
          { title: "Circuitos en paralelo", slug: "circuitos-en-paralelo", part: 2, order: 6.2, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/circuitos-electricos#circuitos-en-paralelo", isPage: false },
          { title: "Circuitos mixtos", slug: "circuitos-mixtos", part: 2, order: 6.3, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/circuitos-electricos#circuitos-mixtos", isPage: false },
        ],
      },
      {
        title: "Leyes de Kirchhoff",
        slug: "leyes-de-kirchhoff",
        part: 2,
        order: 7,
        description: "Leyes de conservación aplicadas a circuitos.",
        href: "/unidad/electricidad-mdx/leyes-de-kirchhoff",
        isPage: true,
        children: [
          { title: "Primera ley (corrientes o nodos)", slug: "primera-ley-corrientes-o-nodos", part: 2, order: 7.1, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/leyes-de-kirchhoff#primera-ley-corrientes-o-nodos", isPage: false },
          { title: "Segunda ley (tensiones o mallas)", slug: "segunda-ley-tensiones-o-mallas", part: 2, order: 7.2, description: "(Subtema interno del tema principal)", href: "/unidad/electricidad-mdx/leyes-de-kirchhoff#segunda-ley-tensiones-o-mallas", isPage: false },
        ],
      },
      { title: "Potencia eléctrica", slug: "potencia-electrica", part: 2, order: 8, description: "Ritmo de transferencia de energía eléctrica.", href: "/unidad/electricidad-mdx/potencia-electrica", isPage: true },
      { title: "Energía eléctrica", slug: "energia-electrica", part: 2, order: 9, description: "Energía consumida o entregada en circuitos.", href: "/unidad/electricidad-mdx/energia-electrica", isPage: true },
      { title: "Ley de Joule", slug: "ley-de-joule", part: 2, order: 10, description: "Efecto térmico asociado al paso de corriente.", href: "/unidad/electricidad-mdx/ley-de-joule", isPage: true },
    ],
  },
];

