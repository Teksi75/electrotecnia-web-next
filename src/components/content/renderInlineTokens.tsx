import type { ReactNode } from "react";

import { InlineMath } from "@/components/content/InlineMath";
import type { InlineToken } from "@/lib/mathTokens";

export function renderInlineTokens(tokens?: InlineToken[]): ReactNode[] | null {
  if (!tokens?.length) return null;

  return tokens.map((token, index) => {
    if (token.kind === "inlineMath") {
      return <InlineMath key={`m-${index}-${token.latex}`} latex={token.latex} />;
    }

    return <span key={`t-${index}`}>{token.text}</span>;
  });
}
