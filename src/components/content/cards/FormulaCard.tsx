import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type FormulaCardProps = {
  block: ContentBlock;
};

export function FormulaCard({ block }: FormulaCardProps) {
  return (
    <section className="surface-panel rounded-2xl border-l-4 border-l-amber-700 p-5 dark:border-l-amber-400">
      <h2 className="text-xl font-semibold text-foreground dark:text-amber-100">{block.title}</h2>
      {renderContentNodes(block.nodes ?? [], block.body, block.mono)}
      {block.items?.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
          {block.items.map((item) => (
            <li key={item} className="font-mono text-sm">{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
