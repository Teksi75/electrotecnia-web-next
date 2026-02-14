import { BlockMath } from "@/components/content/BlockMath";
import { renderInlineTokens } from "@/components/content/renderInlineTokens";
import type { ContentBlock } from "@/types";

type ContentCardBodyProps = {
  block: ContentBlock;
};

export function ContentCardBody({ block }: ContentCardBodyProps) {
  if (block.nodes?.length) {
    return (
      <div className="mt-2 space-y-2">
        {block.nodes.map((node, index) => {
          if (node.kind === "mathBlock") {
            return <BlockMath key={`${node.kind}-${index}`} latex={node.latex} />;
          }

          return (
            <p key={`${node.kind}-${index}`} className={node.mono ? "font-mono text-sm whitespace-pre-wrap" : "text-slate-700 dark:text-slate-300 whitespace-pre-wrap"}>
              {renderInlineTokens(node.tokens)}
            </p>
          );
        })}
      </div>
    );
  }

  if (!block.body) return null;

  return <p className={block.mono ? "mt-2 font-mono text-sm whitespace-pre-wrap" : "mt-2 text-slate-700 dark:text-slate-300 whitespace-pre-wrap"}>{block.body}</p>;
}
