import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type FormulaCardProps = {
  block: ContentBlock;
};

export function FormulaCard({ block }: FormulaCardProps) {
  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm dark:border-amber-900 dark:bg-amber-950/30">
      <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">{block.title}</h2>
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
