import type { ReactNode } from "react";

import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Sidebar } from "@/components/layout/Sidebar";

export default function ElectricidadLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
          <Sidebar />
        </div>
      </aside>
      <section>
        <div className="mb-4 lg:hidden">
          <MobileDrawer />
        </div>
        <div className="space-y-4">{children}</div>
      </section>
    </main>
  );
}
