import { BlockBody } from "@/components/content/cards/BlockBody";
import type { ContentBlock } from "@/types";

export function ExplicacionCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50/70 p-5 shadow-sm dark:border-sky-900 dark:bg-sky-950/30">
      <h2 className="text-lg font-semibold text-sky-900 dark:text-sky-200">{block.title}</h2>
      <BlockBody block={block} />
    </section>
  );
}
