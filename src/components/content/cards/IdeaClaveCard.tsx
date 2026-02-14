import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type IdeaClaveCardProps = {
  block: ContentBlock;
};

export function IdeaClaveCard({ block }: IdeaClaveCardProps) {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50/90 p-5 shadow-sm dark:border-sky-900 dark:bg-sky-950/30">
      <h2 className="text-lg font-semibold text-sky-900 dark:text-sky-100">{block.title}</h2>
      {renderContentNodes(block.nodes ?? [], block.body, block.mono)}
    </section>
  );
}
