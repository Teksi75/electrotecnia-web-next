import { BlockBody } from "@/components/content/cards/BlockBody";
import type { ContentBlock } from "@/types";

export function EjemploCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-violet-200 bg-violet-50/70 p-5 shadow-sm dark:border-violet-900 dark:bg-violet-950/30">
      <h2 className="text-lg font-semibold text-violet-900 dark:text-violet-200">{block.title}</h2>
      <BlockBody block={block} />
    </section>
  );
}
