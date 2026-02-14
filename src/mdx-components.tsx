import type { ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
};

export function Formula({ children }: SharedProps) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-800 dark:bg-indigo-950/40" aria-label="Fórmula destacada">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Fórmula</p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </div>
  );
}

export function Ejemplo({ children }: SharedProps) {
  return (
    <aside className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800 dark:bg-emerald-950/40" aria-label="Ejemplo">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Ejemplo</p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </aside>
  );
}

export function Nota({ children }: SharedProps) {
  return (
    <aside className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-800 dark:bg-amber-950/40" aria-label="Nota importante">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Nota</p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </aside>
  );
}

export function useMDXComponents(components: Record<string, React.ComponentType<SharedProps> | unknown>) {
  return {
    Formula,
    Ejemplo,
    Nota,
    ...components,
  };
}
