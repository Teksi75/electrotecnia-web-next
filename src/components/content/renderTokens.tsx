import type { ReactNode } from "react";

import { Math } from "@/components/content/Math";
import { MathBlock } from "@/components/content/MathBlock";
import type { ContentNode } from "@/types";

import type { InlineToken } from "@/lib/mathTokens";

export function renderInlineTokens(tokens: InlineToken[]): ReactNode[] {
  return tokens.map((token, index) => {
    if (token.kind === "inlineMath") {
      return <Math key={`math-${token.latex}-${index}`} latex={token.latex} />;
    }

    return <span key={`text-${index}`}>{token.text.replace(/\\\$/g, "$")}</span>;
  });
}

export function renderContentNodes(nodes: ContentNode[], fallbackBody?: string, mono?: boolean): ReactNode {
  if (!nodes.length) {
    return fallbackBody ? <p className={mono ? "mt-2 font-mono text-sm whitespace-pre-wrap" : "mt-2 text-slate-700 dark:text-slate-300 whitespace-pre-wrap"}>{fallbackBody}</p> : null;
  }

  return nodes.map((node, index) => {
    if (node.kind === "blockMath") {
      return <MathBlock key={`block-math-${node.latex}-${index}`} latex={node.latex} />;
    }

    return (
      <p key={`paragraph-${index}`} className={node.mono ? "mt-2 font-mono text-sm whitespace-pre-wrap" : "mt-2 text-slate-700 dark:text-slate-300 whitespace-pre-wrap"}>
        {renderInlineTokens(node.tokens)}
      </p>
    );
  });
}
