import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <Badge>Unidad activa</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Consulta de Electrotecnia</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">
          Wiki/apunte rapido para estudiar la unidad de Electricidad con indice por temas, busqueda local y
          navegacion por orden.
        </p>
        <Button asChild>
          <Link href="/unidad/electricidad">Ir a Unidad: Electricidad</Link>
        </Button>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Navegacion por indice</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Sidebar con arbol de contenidos por partes y subitems internos.
          </p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Busqueda local</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Busqueda sin backend para saltar a temas y secciones rapidamente.
          </p>
        </Card>
      </section>
    </main>
  );
}
