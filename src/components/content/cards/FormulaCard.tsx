import { BlockBody } from "@/components/content/cards/BlockBody";
import type { ContentBlock } from "@/types";

export function FormulaCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm dark:border-amber-900 dark:bg-amber-950/30">
      <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200">{block.title}</h2>
      <BlockBody block={block} />
    </section>
  );
}
