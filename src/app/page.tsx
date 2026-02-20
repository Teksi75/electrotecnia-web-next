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
  const routeSteps = [
    "Cargas, campos y potencial",
    "Corriente, tensión y resistencia",
    "Leyes de Ohm, Joule y Kirchhoff",
    "Aplicaciones y práctica guiada",
  ];

  return (
    <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="surface-panel reveal-up overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Badge>Unidad activa</Badge>
            <h1 className="text-balance text-4xl font-extrabold leading-tight sm:text-5xl">
              Servicio académico de Electrotecnia para alumnos de INGENIUM
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Esta plataforma fue diseñada para que los alumnos de INGENIUM estudien Electricidad con una secuencia
              clara de teoría, fórmulas y práctica aplicada. Podés recorrerla de principio a fin o consultar cada
              tema como material de apoyo.
            </p>
            <div className="max-w-3xl rounded-2xl border border-border/80 bg-secondary/60 p-4 text-sm text-secondary-foreground">
              Encontrarás explicaciones breves, fórmulas clave y ejemplos numéricos para conectar teoría con
              resolución de problemas.
            </div>
            <Button asChild className="h-11 px-6">
              <Link href="/unidad/electricidad">Ir a Unidad: Electricidad</Link>
            </Button>
          </div>
          <aside className="surface-panel relative overflow-hidden rounded-2xl p-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(255,180,94,0.22),transparent_40%),radial-gradient(circle_at_90%_85%,rgba(255,180,94,0.14),transparent_35%)]"
            />
            <div className="relative flex h-full min-h-[420px] flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Ruta sugerida</p>

              <div className="relative mt-8 flex-1">
                <div
                  aria-hidden="true"
                  className="absolute left-6 right-6 top-[18%] h-[64%] rounded-[2rem] border border-[var(--highlight-soft)]/60"
                />
                <div aria-hidden="true" className="absolute bottom-12 left-7 top-[22%] border-l border-dashed border-[var(--highlight-soft)]/70" />
                <div
                  aria-hidden="true"
                  className="absolute bottom-12 right-7 top-[36%] border-r border-dashed border-[var(--highlight-soft)]/70"
                />

                <ol className="relative z-10 flex h-full flex-col justify-between gap-5 text-sm text-foreground/90">
                  {routeSteps.map((step, index) => (
                    <li key={step} className="relative flex items-center gap-3">
                      <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-[var(--highlight-soft)] bg-card/80 text-lg font-semibold text-[var(--highlight)] shadow-[0_0_18px_rgba(247,176,106,0.38)]">
                        {index === 0 ? "+q" : index === 1 ? "V" : index === 2 ? "Ω" : "Σ"}
                      </span>
                      <span className="flex-1 rounded-xl border border-[var(--highlight-soft)] bg-card/70 p-3 text-base">
                        {index + 1}. {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="absolute right-10 top-[47%] text-2xl text-[var(--highlight)]/80">I = V/R</p>
                <p className="absolute bottom-14 left-16 text-xl text-[var(--highlight)]/70">ΣI = 0</p>
              </div>
            </div>
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
