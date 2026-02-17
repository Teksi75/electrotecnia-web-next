import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type ExplicacionCardProps = {
  block: ContentBlock;
};

export function ExplicacionCard({ block }: ExplicacionCardProps) {
  return (
    <section className="surface-panel rounded-2xl border-l-4 border-l-emerald-700 p-5 dark:border-l-emerald-400">
      <h2 className="inline-flex rounded-lg bg-emerald-100 px-2.5 py-1 text-lg font-bold text-emerald-950 dark:bg-emerald-900/45 dark:text-emerald-100">
        {block.title}
      </h2>
      {renderContentNodes(block.nodes ?? [], block.body, block.mono)}
    </section>
  );
}
