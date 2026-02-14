export type InlineToken = { kind: "text"; text: string } | { kind: "inlineMath"; latex: string };

export type BlockToken = { kind: "blockMath"; latex: string };

export type SplitBlockToken = { kind: "textBlock"; text: string } | BlockToken;

function isEscaped(text: string, index: number): boolean {
  let slashCount = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i -= 1) {
    slashCount += 1;
  }
  return slashCount % 2 === 1;
}

export function tokenizeInlineMath(text: string): InlineToken[] {
  if (!text.includes("$")) {
    return [{ kind: "text", text }];
  }

  const tokens: InlineToken[] = [];
  let buffer = "";

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (char !== "$" || isEscaped(text, i) || text[i + 1] === "$") {
      buffer += char;
      continue;
    }

    const start = i + 1;
    let end = start;

    while (end < text.length) {
      if (text[end] === "$" && !isEscaped(text, end)) {
        break;
      }
      end += 1;
    }

    if (end >= text.length) {
      buffer += char;
      continue;
    }

    if (buffer) {
      tokens.push({ kind: "text", text: buffer });
      buffer = "";
    }

    const latex = text.slice(start, end).trim();
    if (latex) {
      tokens.push({ kind: "inlineMath", latex });
    }

    i = end;
  }

  if (buffer) {
    tokens.push({ kind: "text", text: buffer });
  }

  return tokens.length ? tokens : [{ kind: "text", text }];
}

export function splitBlockMath(text: string): SplitBlockToken[] {
  if (!text.includes("$$")) {
    return [{ kind: "textBlock", text }];
  }

  const blocks: SplitBlockToken[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const open = text.indexOf("$$", cursor);
    if (open === -1) {
      const remainder = text.slice(cursor);
      if (remainder) {
        blocks.push({ kind: "textBlock", text: remainder });
      }
      break;
    }

    const close = text.indexOf("$$", open + 2);
    if (close === -1) {
      const remainder = text.slice(cursor);
      if (remainder) {
        blocks.push({ kind: "textBlock", text: remainder });
      }
      break;
    }

    const before = text.slice(cursor, open);
    if (before) {
      blocks.push({ kind: "textBlock", text: before });
    }

    const latex = text.slice(open + 2, close).trim();
    if (latex) {
      blocks.push({ kind: "blockMath", latex });
    }

    cursor = close + 2;
  }

  return blocks.length ? blocks : [{ kind: "textBlock", text }];
}
