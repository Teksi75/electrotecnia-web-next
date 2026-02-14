import { ContentCardBody } from "@/components/content/cards/ContentCardBody";
import type { ContentBlock } from "@/types";

export function IdeaClaveCard({ block }: { block: ContentBlock }) {
  return (
    <section className="rounded-xl border border-cyan-200 bg-cyan-50/70 p-5 shadow-sm dark:border-cyan-900 dark:bg-cyan-950/20">
      <h2 className="text-lg font-semibold">{block.title}</h2>
      <ContentCardBody block={block} />
    </section>
  );
}
