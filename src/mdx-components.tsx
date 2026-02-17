import type { ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
};

export function Formula({ children }: SharedProps) {
  return (
    <div className="surface-panel rounded-2xl border-l-4 border-l-amber-700 p-4 dark:border-l-amber-400" aria-label="Fórmula destacada">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Fórmula</p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </div>
  );
}

export function Ejemplo({ children }: SharedProps) {
  return (
    <aside className="surface-panel rounded-2xl border-l-4 border-l-emerald-700 p-4 dark:border-l-emerald-400" aria-label="Ejemplo">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Ejemplo</p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </aside>
  );
}

export function Nota({ children }: SharedProps) {
  return (
    <aside className="surface-panel rounded-2xl border-l-4 border-l-orange-700 p-4 dark:border-l-orange-400" aria-label="Nota importante">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">Nota</p>
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
