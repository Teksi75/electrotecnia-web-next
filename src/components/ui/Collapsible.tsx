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
    <section className={cn("rounded-lg border border-border bg-card p-2 text-card-foreground", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-sm px-1 py-1 text-left text-sm font-semibold text-foreground hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <span className="text-xs text-muted-foreground">{open ? "Ocultar" : "Mostrar"}</span>
      </button>
      {open ? (
        <div id={contentId} className="pt-2">
          {children}
        </div>
      ) : null}
    </section>
  );
}
