import { renderContentNodes, renderInlineTokens } from "@/components/content/renderTokens";
import { splitBlockMath, tokenizeInlineMath } from "@/lib/mathTokens";
import type { ContentBlock, ContentNode } from "@/types";

type FormulaCardProps = {
  block: ContentBlock;
};

function buildNodesFromItem(item: string): ContentNode[] {
  const blocks = splitBlockMath(item);
  const nodes: ContentNode[] = [];

  for (const block of blocks) {
    if (block.kind === "blockMath") {
      nodes.push(block);
      continue;
    }

    if (!block.text.trim()) {
      continue;
    }

    nodes.push({ kind: "paragraph", tokens: tokenizeInlineMath(block.text), mono: false });
  }

  return nodes;
}

export function FormulaCard({ block }: FormulaCardProps) {
  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm dark:border-amber-900 dark:bg-amber-950/30">
      <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">{block.title}</h2>
      {renderContentNodes(block.nodes ?? [], block.body, false)}
      {block.items?.length ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
          {block.items.map((item) => {
            const nodes = buildNodesFromItem(item);

            return (
              <li key={item}>
                {nodes.length
                  ? renderContentNodes(nodes)
                  : <span>{renderInlineTokens(tokenizeInlineMath(item))}</span>}
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
