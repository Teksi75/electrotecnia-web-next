import { BlockBody } from "@/components/content/cards/BlockBody";
import type { ContentBlock } from "@/types";

export function IdeaClaveCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
      <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200">{block.title}</h2>
      <BlockBody block={block} />
    </section>
  );
}
