import type { ReactNode } from "react";

import { InlineMath } from "@/components/content/InlineMath";
import type { ContentBlock, ContentNode } from "@/types";

export function renderInlineTokens(tokens: ContentBlock["bodyTokens"]): ReactNode[] {
  if (!tokens?.length) {
    return [];
  }

  return tokens.map((token, index) => {
    if (token.kind === "inlineMath") {
      return <InlineMath key={`inline-math-${index}`} latex={token.latex} />;
    }

    return <span key={`inline-text-${index}`}>{token.text}</span>;
  });
}

export function hasNodes(nodes: ContentBlock["nodes"]): nodes is ContentNode[] {
  return Boolean(nodes?.length);
}
