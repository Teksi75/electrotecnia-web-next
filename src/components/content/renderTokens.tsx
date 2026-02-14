import type { ReactNode } from "react";

import { BlockMath } from "@/components/content/BlockMath";
import { InlineMath } from "@/components/content/InlineMath";
import type { ContentNode } from "@/types";

import { tokenizeInlineMath } from "@/lib/mathTokens";
import type { InlineToken } from "@/lib/mathTokens";

type RenderContentNodesOptions = {
  paragraphClassName?: string;
  fallbackParagraphClassName?: string;
  renderParagraphLines?: boolean;
  linesContainerClassName?: string;
  lineClassName?: string;
  preserveEmptyLines?: boolean;
};

function splitTokensByLine(tokens: InlineToken[]): InlineToken[][] {
  const lines: InlineToken[][] = [[]];

  for (const token of tokens) {
    if (token.kind === "inlineMath") {
      lines[lines.length - 1].push(token);
      continue;
    }

    const parts = token.text.split("\n");

    parts.forEach((part, index) => {
      if (part.length) {
        lines[lines.length - 1].push({ kind: "text", text: part });
      }

      if (index < parts.length - 1) {
        lines.push([]);
      }
    });
  }

  return lines;
}

export function renderInlineTokens(tokens: InlineToken[]): ReactNode[] {
  return tokens.map((token, index) => {
    if (token.kind === "inlineMath") {
      return <InlineMath key={`math-${token.latex}-${index}`} latex={token.latex} />;
    }

    return <span key={`text-${index}`}>{token.text.replace(/\\\$/g, "$")}</span>;
  });
}

export function renderContentNodes(nodes: ContentNode[], fallbackBody?: string, mono?: boolean, options?: RenderContentNodesOptions): ReactNode {
  if (!nodes.length) {
    if (options?.renderParagraphLines && fallbackBody) {
      const fallbackTokens = tokenizeInlineMath(fallbackBody);
      const lines = splitTokensByLine(fallbackTokens);
      const lineBaseClass = mono ? "font-mono text-sm whitespace-pre-wrap" : "text-muted-foreground whitespace-pre-wrap";
      const lineClassName = options.lineClassName ? `${lineBaseClass} ${options.lineClassName}` : lineBaseClass;
      const containerClassName = options.linesContainerClassName ?? "space-y-2";

      return (
        <div className={containerClassName}>
          {lines
            .filter((lineTokens) => options.preserveEmptyLines || lineTokens.length > 0)
            .map((lineTokens, lineIndex) => (
              lineTokens.length ? (
                <div key={`fallback-line-${lineIndex}`} className={lineClassName}>
                  {renderInlineTokens(lineTokens)}
                </div>
              ) : (
                <div key={`fallback-line-${lineIndex}`} className="h-2" />
              )
            ))}
        </div>
      );
    }

    const baseClass = mono ? "mt-2 font-mono text-sm whitespace-pre-wrap" : "mt-2 text-muted-foreground whitespace-pre-wrap";
    const className = options?.fallbackParagraphClassName ? `${baseClass} ${options.fallbackParagraphClassName}` : baseClass;
    return fallbackBody ? <p className={className}>{fallbackBody}</p> : null;
  }

  return nodes.map((node, index) => {
    if (node.kind === "blockMath") {
      return <BlockMath key={`block-math-${node.latex}-${index}`} latex={node.latex} />;
    }

    const baseClass = node.mono ? "mt-2 font-mono text-sm whitespace-pre-wrap" : "mt-2 text-muted-foreground whitespace-pre-wrap";
    const className = options?.paragraphClassName ? `${baseClass} ${options.paragraphClassName}` : baseClass;

    if (options?.renderParagraphLines) {
      const lines = splitTokensByLine(node.tokens);
      const lineBaseClass = node.mono ? "font-mono text-sm whitespace-pre-wrap" : "text-muted-foreground whitespace-pre-wrap";
      const lineClassName = options.lineClassName ? `${lineBaseClass} ${options.lineClassName}` : lineBaseClass;
      const containerClassName = options.linesContainerClassName ?? "space-y-2";

      return (
        <div key={`paragraph-lines-${index}`} className={containerClassName}>
          {lines
            .filter((lineTokens) => options.preserveEmptyLines || lineTokens.length > 0)
            .map((lineTokens, lineIndex) => (
              lineTokens.length ? (
                <div key={`line-${index}-${lineIndex}`} className={lineClassName}>
                  {renderInlineTokens(lineTokens)}
                </div>
              ) : (
                <div key={`line-${index}-${lineIndex}`} className="h-2" />
              )
            ))}
        </div>
      );
    }

    return (
      <p key={`paragraph-${index}`} className={className}>
        {renderInlineTokens(node.tokens)}
      </p>
    );
  });
}
