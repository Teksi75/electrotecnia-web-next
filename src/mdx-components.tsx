import type { ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
};

export function Formula({ children }: SharedProps) {
  return (
    <div className="surface-panel rounded-2xl border-l-4 border-l-amber-700 p-4 dark:border-l-amber-400" aria-label="Fórmula destacada">
      <p className="inline-flex rounded-md bg-amber-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-amber-950 dark:bg-amber-900/45 dark:text-amber-300">
        Fórmula
      </p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </div>
  );
}

export function Ejemplo({ children }: SharedProps) {
  return (
    <aside className="surface-panel rounded-2xl border-l-4 border-l-emerald-700 p-4 dark:border-l-emerald-400" aria-label="Ejemplo">
      <p className="inline-flex rounded-md bg-emerald-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-emerald-950 dark:bg-emerald-900/45 dark:text-emerald-300">
        Ejemplo
      </p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </aside>
  );
}

export function Nota({ children }: SharedProps) {
  return (
    <aside className="surface-panel rounded-2xl border-l-4 border-l-orange-700 p-4 dark:border-l-orange-400" aria-label="Nota importante">
      <p className="inline-flex rounded-md bg-orange-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-orange-950 dark:bg-orange-900/45 dark:text-orange-300">
        Nota
      </p>
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
