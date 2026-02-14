import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const featuredTopics = [
  {
    title: "Electricidad básica",
    description: "Comenzá por cargas, campo y potencial para construir una base sólida.",
    href: "/unidad/electricidad/metodos-electrificacion",
  },
  {
    title: "Ley de Ohm",
    description: "Relacioná tensión, corriente y resistencia en problemas de circuitos.",
    href: "/unidad/electricidad/ley-de-ohm",
  },
  {
    title: "Circuitos eléctricos",
    description: "Compará serie, paralelo y mixtos con ejemplos típicos.",
    href: "/unidad/electricidad/circuitos-electricos",
  },
  {
    title: "Leyes de Kirchhoff",
    description: "Aplicá conservación de corriente y tensión en nodos y mallas.",
    href: "/unidad/electricidad/leyes-de-kirchhoff",
  },
  {
    title: "Ejemplo numérico (SI)",
    description: "Repasá temas con ejercicios guiados y unidades del Sistema Internacional.",
    href: "/unidad/electricidad/potencia-electrica",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <Badge>Unidad activa</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Consulta de Electrotecnia</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          Esta wiki es una guía de estudio de Electricidad para estudiantes que necesitan entender conceptos,
          fórmulas y aplicaciones paso a paso. Podés usar el índice para avanzar por orden o entrar directo a
          un tema puntual.
        </p>
        <Button asChild>
          <Link href="/unidad/electricidad">Ir a Unidad: Electricidad</Link>
        </Button>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Temas destacados</h2>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Accesos rápidos para empezar por lo más usado en clase o en prácticas.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTopics.map((topic) => (
            <Card key={topic.href} className="h-full">
              <h3 className="text-base font-semibold">{topic.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{topic.description}</p>
              <Link
                href={topic.href}
                className="mt-4 inline-flex text-sm font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-300"
              >
                Ver tema
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <Card>
          <h2 className="text-xl font-semibold tracking-tight">Cómo estudiar con esta wiki</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Empezá por la Parte 1 si necesitás reforzar conceptos antes de resolver circuitos.</li>
            <li>Usá la búsqueda para saltar a definiciones, leyes o subtemas específicos.</li>
            <li>Leé cada ejemplo numérico verificando unidades y notación.</li>
            <li>Terminá cada tema repasando fórmulas y practicando con ejercicios propios.</li>
          </ul>
        </Card>
      </section>
    </main>
  );
}
