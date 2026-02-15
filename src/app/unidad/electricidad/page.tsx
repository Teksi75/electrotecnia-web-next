import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";
import { getPartFirstTopic, getSectionNodes } from "@/lib/nav";

import { SIPrefixesCard } from "@/components/content/SIPrefixesCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = createPageMetadata({
  title: "Unidad: Electricidad",
  description: "Índice principal de la unidad Electricidad con navegación por partes.",
  path: "/unidad/electricidad",
});

const glossary = ["C", "N", "V", "A", "Ω", "W", "J", "m", "s", "°C"];

export default function ElectricidadIndexPage() {
  const firstPart1 = getPartFirstTopic(1);
  const firstPart2 = getPartFirstTopic(2);
  const sections = getSectionNodes();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Unidad: Electricidad</h1>
        <p className="text-muted-foreground">Wiki/apunte rápido para estudiar en orden todos los temas de la unidad.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Parte 1</h2>
          <p className="mt-2 text-sm text-muted-foreground">Electricidad básica: cargas, campos y potencial.</p>
          <p className="mt-3 text-xs text-muted-foreground">Progreso: 0/{sections[0]?.children.length ?? 0} temas.</p>
          {firstPart1 ? <Button asChild className="mt-4"><Link href={firstPart1.href}>Comenzar Parte 1</Link></Button> : null}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Parte 2</h2>
          <p className="mt-2 text-sm text-muted-foreground">Electricidad en circuitos: magnitudes y leyes fundamentales.</p>
          <p className="mt-3 text-xs text-muted-foreground">Progreso: 0/{sections[1]?.children.length ?? 0} temas.</p>
          {firstPart2 ? <Button asChild className="mt-4"><Link href={firstPart2.href}>Comenzar Parte 2</Link></Button> : null}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border p-5">
          <h2 className="text-xl font-semibold">Glosario de unidades</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {glossary.map((item) => (
              <li key={item} className="rounded-md border border-border px-3 py-1 font-mono text-sm">{item}</li>
            ))}
          </ul>
        </section>

        <SIPrefixesCard />
      </div>
    </div>
  );
}
