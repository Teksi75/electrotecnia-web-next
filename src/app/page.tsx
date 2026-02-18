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
    <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="surface-panel reveal-up overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Badge>Unidad activa</Badge>
            <h1 className="text-balance text-4xl font-extrabold leading-tight sm:text-5xl">
              Electrotecnia sin ruido: teoría clara, fórmulas y práctica aplicada
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Esta wiki está pensada para estudiantes que necesitan entender, repasar y practicar Electricidad de
              forma ordenada. Podés recorrerla en secuencia como curso breve o usarla como apunte rápido por tema.
            </p>
            <div className="max-w-3xl rounded-2xl border border-border/80 bg-secondary/60 p-4 text-sm text-secondary-foreground">
              Encontrarás explicaciones breves, fórmulas clave y ejemplos numéricos para conectar teoría con
              resolución de problemas.
            </div>
            <Button asChild className="h-11 px-6">
              <Link href="/unidad/electricidad">Ir a Unidad: Electricidad</Link>
            </Button>
          </div>
          <aside className="study-route surface-panel rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Ruta sugerida</p>
            <div className="study-route__canvas" aria-hidden="true">
              <span className="study-route__badge study-route__badge--charge">+q</span>
              <span className="study-route__badge study-route__badge--voltage">V</span>

              <span className="study-route__formula study-route__formula--ohm">I = V/R</span>
              <span className="study-route__formula study-route__formula--kirchhoff">Σ = 0</span>

              <span className="study-route__line study-route__line--left" />
              <span className="study-route__line study-route__line--right" />
              <span className="study-route__line study-route__line--top" />
              <span className="study-route__line study-route__line--mid" />
              <span className="study-route__line study-route__line--bottom" />

              <span className="study-route__dot study-route__dot--left-top" />
              <span className="study-route__dot study-route__dot--left-mid" />
              <span className="study-route__dot study-route__dot--left-bottom" />
              <span className="study-route__dot study-route__dot--right-mid" />
              <span className="study-route__dot study-route__dot--right-bottom" />
            </div>

            <ol className="study-route__list text-sm text-muted-foreground">
              <li className="study-route__item">1. Cargas, campos y potencial</li>
              <li className="study-route__item">2. Corriente, tensión y resistencia</li>
              <li className="study-route__item">3. Leyes de Ohm, Joule y Kirchhoff</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-balance text-3xl font-semibold tracking-tight">Temas destacados</h2>
        <p className="text-sm text-muted-foreground">Accesos rápidos para estudiar los núcleos de la unidad.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTopics.map((item) => {
            const topic = getTopicBySlug(item.slug);
            const href = topic?.href ?? item.fallbackHref;

            return (
              <Card key={item.slug} className="flex h-full flex-col rounded-2xl">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
                <Button asChild variant="outline" className="mt-5 w-full justify-center">
                  <Link href={href}>Abrir tema</Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="surface-panel space-y-3 rounded-3xl p-5 sm:p-6">
        <h2 className="text-balance text-3xl font-semibold tracking-tight">Cómo estudiar con esta wiki</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {studyTips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span aria-hidden="true" className="mt-1 text-[var(--highlight)]">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
