import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getTopicBySlug } from "@/lib/nav";

type FeaturedTopic = {
  title: string;
  description: string;
  fallbackHref: string;
  slug: string;
};

const featuredTopics: FeaturedTopic[] = [
  {
    title: "Electricidad básica",
    description: "Empezá por las bases: cargas, campos y potencial para entender todo lo demás.",
    slug: "metodos-electrificacion",
    fallbackHref: "/unidad/electricidad/metodos-electrificacion",
  },
  {
    title: "Ley de Ohm",
    description: "La relación clave entre tensión, corriente y resistencia en circuitos simples.",
    slug: "ley-de-ohm",
    fallbackHref: "/unidad/electricidad/ley-de-ohm",
  },
  {
    title: "Circuitos eléctricos",
    description: "Serie, paralelo y mixtos para analizar cómo circula la corriente.",
    slug: "circuitos-electricos",
    fallbackHref: "/unidad/electricidad/circuitos-electricos",
  },
  {
    title: "Leyes de Kirchhoff",
    description: "Conservación de corrientes y tensiones para resolver mallas y nodos.",
    slug: "leyes-de-kirchhoff",
    fallbackHref: "/unidad/electricidad/leyes-de-kirchhoff",
  },
  {
    title: "Ejercicios guiados",
    description: "Practicá con ejemplos numéricos y seguí el razonamiento paso a paso.",
    slug: "potencia-electrica",
    fallbackHref: "/unidad/electricidad/potencia-electrica",
  },
];

const studyTips = [
  "Seguí el orden sugerido de la unidad para construir bases antes de resolver ejercicios más largos.",
  "Usá la búsqueda para saltar a conceptos puntuales y volver rápido al tema principal.",
  "Tomá cada fórmula como una herramienta: identificá magnitudes, unidades y condiciones de uso.",
  "Cerrá cada tema con un ejemplo numérico para verificar comprensión aplicada.",
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <Badge>Unidad activa</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Consulta de Electrotecnia</h1>
        <p className="max-w-3xl text-muted-foreground">
          Esta wiki está pensada para estudiantes que necesitan entender, repasar y practicar Electricidad de forma
          ordenada. Podés recorrerla en secuencia como curso breve o usarla como apunte rápido por tema.
        </p>
        <div className="max-w-3xl rounded-xl border border-border bg-card p-4 text-sm text-card-foreground">
          Encontrarás explicaciones breves, fórmulas clave y ejemplos numéricos para conectar teoría con resolución de
          problemas.
        </div>
        <Button asChild>
          <Link href="/unidad/electricidad">Ir a Unidad: Electricidad</Link>
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Temas destacados</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTopics.map((item) => {
            const topic = getTopicBySlug(item.slug);
            const href = topic?.href ?? item.fallbackHref;

            return (
              <Card key={item.slug} className="flex h-full flex-col">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
                <Button asChild variant="outline" className="mt-4 w-full justify-center">
                  <Link href={href}>Abrir tema</Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-card p-5 text-card-foreground">
        <h2 className="text-2xl font-semibold tracking-tight">Cómo estudiar con esta wiki</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {studyTips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span aria-hidden="true" className="mt-1 text-muted-foreground">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
