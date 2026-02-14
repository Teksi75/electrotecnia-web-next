import type { ComponentType, ReactNode } from "react";

type MdxComponentMap = Record<string, ComponentType<{ children?: ReactNode }>>;

function Formula({ children }: { children?: ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide">Fórmula</p>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function Ejemplo({ children }: { children?: ReactNode }) {
  return (
    <section aria-label="Ejemplo" className="my-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
      <h3 className="mb-2 text-sm font-semibold text-emerald-900 dark:text-emerald-200">Ejemplo</h3>
      <div className="text-emerald-950 dark:text-emerald-100">{children}</div>
    </section>
  );
}

function Nota({ children }: { children?: ReactNode }) {
  return (
    <aside aria-label="Nota" className="my-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
      <h3 className="mb-2 text-sm font-semibold text-amber-900 dark:text-amber-200">Nota</h3>
      <div className="text-amber-950 dark:text-amber-100">{children}</div>
    </aside>
  );
}

export function useMDXComponents(components: MdxComponentMap): MdxComponentMap {
  return {
    Formula,
    Ejemplo,
    Nota,
    ...components,
  };
}
