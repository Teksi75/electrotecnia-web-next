import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
};

function Formula({ children, title = "Fórmula" }: CardProps) {
  return (
    <section aria-label={title} className="my-4 rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-800 dark:bg-sky-950/40">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">{title}</h3>
      <div className="text-slate-800 dark:text-slate-100">{children}</div>
    </section>
  );
}

function Ejemplo({ children, title = "Ejemplo" }: CardProps) {
  return (
    <section aria-label={title} className="my-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">{title}</h3>
      <div className="text-slate-800 dark:text-slate-100">{children}</div>
    </section>
  );
}

function Nota({ children, title = "Nota" }: CardProps) {
  return (
    <aside aria-label={title} className="my-4 rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950/40">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">{title}</h3>
      <div className="text-slate-800 dark:text-slate-100">{children}</div>
    </aside>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Formula,
    Ejemplo,
    Nota,
    ...components,
  };
}
