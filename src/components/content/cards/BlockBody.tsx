import { BlockMath } from "@/components/content/BlockMath";
import { renderInlineTokens } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type BlockBodyProps = {
  block: ContentBlock;
};

export function BlockBody({ block }: BlockBodyProps) {
  if (block.nodes?.length) {
    return (
      <div className="mt-2 space-y-2">
        {block.nodes.map((node, index) => {
          if (node.kind === "mathBlock") {
            return <BlockMath key={`math-${index}`} latex={node.latex} />;
          }

          return (
            <p key={`paragraph-${index}`} className={node.mono ? "font-mono text-sm whitespace-pre-wrap" : "text-slate-700 whitespace-pre-wrap dark:text-slate-300"}>
              {node.tokens?.length ? renderInlineTokens(node.tokens) : node.text}
            </p>
          );
        })}
      </div>
    );
  }

  if (block.body) {
    return (
      <p className={block.mono ? "mt-2 font-mono text-sm whitespace-pre-wrap" : "mt-2 text-slate-700 whitespace-pre-wrap dark:text-slate-300"}>
        {block.bodyTokens?.length ? renderInlineTokens(block.bodyTokens) : block.body}
      </p>
    );
  }

  return null;
}
