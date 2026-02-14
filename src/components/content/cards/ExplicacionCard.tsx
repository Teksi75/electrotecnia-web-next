import { ContentCardBody } from "@/components/content/cards/ContentCardBody";
import type { ContentBlock } from "@/types";

export function ExplicacionCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h2 className="text-lg font-semibold">{block.title}</h2>
      <ContentCardBody block={block} />
    </section>
  );
}
