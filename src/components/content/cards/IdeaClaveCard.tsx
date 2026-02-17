import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type IdeaClaveCardProps = {
  block: ContentBlock;
};

export function IdeaClaveCard({ block }: IdeaClaveCardProps) {
  return (
    <section className="surface-panel rounded-2xl border-l-4 border-l-cyan-700 p-5 dark:border-l-cyan-400">
      <h2 className="inline-flex rounded-lg bg-cyan-100 px-2.5 py-1 text-lg font-bold text-cyan-950 dark:bg-cyan-900/45 dark:text-cyan-100">
        {block.title}
      </h2>
      {renderContentNodes(block.nodes ?? [], block.body, block.mono)}
    </section>
  );
}
