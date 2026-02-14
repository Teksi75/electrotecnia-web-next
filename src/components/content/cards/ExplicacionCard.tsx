import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type ExplicacionCardProps = {
  block: ContentBlock;
};

export function ExplicacionCard({ block }: ExplicacionCardProps) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
      <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">{block.title}</h2>
      {renderContentNodes(block.nodes ?? [], block.body, block.mono)}
    </section>
  );
}
