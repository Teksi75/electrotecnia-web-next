import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";
import { getSectionNodes, getPartFirstTopic } from "@/lib/nav";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = createPageMetadata({
  title: "Unidad: Electricidad",
  description: "Indice principal de la unidad Electricidad con navegación por partes.",
  path: "/unidad/electricidad",
});

const unidades = ["C", "N", "V", "A", "Ω", "W", "J", "m", "s", "°C"];

export default function ElectricidadIndexPage() {
  const firstPart1 = getPartFirstTopic(1);
  const firstPart2 = getPartFirstTopic(2);
  const sections = getSectionNodes();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Unidad: Electricidad</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Recorre la unidad en formato wiki con navegación jerárquica y bloques de estudio por tema.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Parte 1</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Electricidad básica: cargas y campos.</p>
          {firstPart1 ? <Button asChild className="mt-4"><Link href={firstPart1.href}>Comenzar Parte 1</Link></Button> : null}
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Parte 2</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Electricidad en circuitos y leyes fundamentales.</p>
          {firstPart2 ? <Button asChild className="mt-4"><Link href={firstPart2.href}>Comenzar Parte 2</Link></Button> : null}
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Temario completo</h2>
        {sections.map((section) => (
          <Card key={section.slug}>
            <h3 className="font-semibold">{section.title}</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
              {section.children.map((item) => (
                <li key={item.slug}><Link className="hover:underline" href={item.href}>{item.title}</Link></li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <section className="space-y-3 border-t border-slate-200 pt-6 dark:border-slate-800">
        <h2 className="text-xl font-semibold">Glosario de unidades</h2>
        <div className="flex flex-wrap gap-2">
          {unidades.map((unidad) => (
            <span key={unidad} className="rounded-full border border-slate-300 px-3 py-1 font-mono text-sm dark:border-slate-700">
              {unidad}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
