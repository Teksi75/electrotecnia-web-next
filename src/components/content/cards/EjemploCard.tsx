import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type EjemploCardProps = {
  block: ContentBlock;
};

export function EjemploCard({ block }: EjemploCardProps) {
  return (
    <section className="rounded-xl border border-violet-200 bg-violet-50 p-5 shadow-sm dark:border-violet-900 dark:bg-violet-950/30">
      <h2 className="text-lg font-semibold text-violet-900 dark:text-violet-100">{block.title}</h2>
      {renderContentNodes(block.nodes ?? [], block.body, true)}
    </section>
  );
}
