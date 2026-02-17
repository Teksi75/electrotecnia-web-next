import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type IdeaClaveCardProps = {
  block: ContentBlock;
};

export function IdeaClaveCard({ block }: IdeaClaveCardProps) {
  return (
    <section className="surface-panel rounded-2xl border-l-4 border-l-cyan-700 p-5 dark:border-l-cyan-400">
      <h2 className="text-xl font-semibold text-foreground dark:text-cyan-100">{block.title}</h2>
      {renderContentNodes(block.nodes ?? [], block.body, block.mono)}
    </section>
  );
}
