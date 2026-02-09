import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">No se encontró el contenido solicitado.</p>
      <Button asChild className="mt-6">
        <Link href="/unidad/electricidad">Volver a la unidad</Link>
      </Button>
    </main>
  );
}
