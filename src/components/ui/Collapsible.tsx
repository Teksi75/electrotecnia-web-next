"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Collapsible({ title, children, defaultOpen = false, className }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className={cn("rounded-lg border border-slate-300 bg-white/90 p-2 shadow-sm dark:border-slate-800", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-1 py-1 text-left text-sm font-semibold"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <span className="text-xs text-slate-600">{open ? "Ocultar" : "Mostrar"}</span>
      </button>
      {open ? (
        <div id={contentId} className="pt-2">
          {children}
        </div>
      ) : null}
    </section>
  );
}
