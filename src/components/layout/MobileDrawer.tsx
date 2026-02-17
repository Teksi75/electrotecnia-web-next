"use client";

import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button type="button" variant="outline" className="rounded-full px-5" onClick={() => setOpen(true)}>
        Indice
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/45" role="dialog" aria-modal="true">
          <div className="h-full w-[85%] max-w-sm overflow-y-auto border-r border-border/80 bg-background p-4 text-card-foreground">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">Indice</h2>
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setOpen(false)}>
                Cerrar
              </Button>
            </div>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
          <button
            type="button"
            className="h-full w-[15%]"
            aria-label="Cerrar indice"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
