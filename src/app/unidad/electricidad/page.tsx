import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";
import { getPartFirstTopic } from "@/lib/nav";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = createPageMetadata({
  title: "Unidad: Electricidad",
  description: "Indice principal de la unidad Electricidad con navegacion por partes.",
  path: "/unidad/electricidad",
});

export default function ElectricidadIndexPage() {
  const firstPart1 = getPartFirstTopic(1);
  const firstPart2 = getPartFirstTopic(2);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Unidad: Electricidad</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Selecciona una parte para empezar el repaso y navegar por temas en orden.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Parte 1</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Electricidad basica: cargas, campos y potencial.
          </p>
          {firstPart1 ? (
            <Button asChild className="mt-4">
              <Link href={firstPart1.href}>Comenzar Parte 1</Link>
            </Button>
          ) : null}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Parte 2</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Electricidad en circuitos: magnitudes y leyes fundamentales.
          </p>
          {firstPart2 ? (
            <Button asChild className="mt-4">
              <Link href={firstPart2.href}>Comenzar Parte 2</Link>
            </Button>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
