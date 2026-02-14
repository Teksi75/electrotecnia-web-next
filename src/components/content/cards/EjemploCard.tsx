import { ContentCardBody } from "@/components/content/cards/ContentCardBody";
import type { ContentBlock } from "@/types";

export function EjemploCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm dark:border-amber-900 dark:bg-amber-950/20">
      <h2 className="text-lg font-semibold">{block.title}</h2>
      <ContentCardBody block={block} />
    </section>
  );
}
