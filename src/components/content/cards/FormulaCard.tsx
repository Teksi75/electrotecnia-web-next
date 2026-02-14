import { ContentCardBody } from "@/components/content/cards/ContentCardBody";
import type { ContentBlock } from "@/types";

export function FormulaCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/70 p-5 shadow-sm dark:border-fuchsia-900 dark:bg-fuchsia-950/20">
      <h2 className="text-lg font-semibold">{block.title}</h2>
      <ContentCardBody block={block} />
    </section>
  );
}
