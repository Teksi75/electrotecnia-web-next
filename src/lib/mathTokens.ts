export type InlineToken = { kind: "text"; text: string } | { kind: "inlineMath"; latex: string };

export type BlockToken = { kind: "blockMath"; latex: string };

export type TextBlockToken = { kind: "textBlock"; text: string };

const isEscaped = (text: string, index: number) => {
  let slashCount = 0;
  let pointer = index - 1;

  while (pointer >= 0 && text[pointer] === "\\") {
    slashCount += 1;
    pointer -= 1;
  }

  return slashCount % 2 === 1;
};

export function tokenizeInlineMath(text: string): InlineToken[] {
  if (!text.includes("$")) {
    return [{ kind: "text", text }];
  }

  const tokens: InlineToken[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const open = text.indexOf("$", cursor);

    if (open === -1) {
      tokens.push({ kind: "text", text: text.slice(cursor) });
      break;
    }

    if (isEscaped(text, open) || text[open + 1] === "$") {
      cursor = open + 1;
      continue;
    }

    const close = (() => {
      let scan = open + 1;
      while (scan < text.length) {
        const candidate = text.indexOf("$", scan);
        if (candidate === -1) {
          return -1;
        }
        if (!isEscaped(text, candidate) && text[candidate + 1] !== "$") {
          return candidate;
        }
        scan = candidate + 1;
      }
      return -1;
    })();

    if (close === -1) {
      tokens.push({ kind: "text", text: text.slice(cursor) });
      break;
    }

    if (open > cursor) {
      tokens.push({ kind: "text", text: text.slice(cursor, open) });
    }

    tokens.push({ kind: "inlineMath", latex: text.slice(open + 1, close).trim() });
    cursor = close + 1;
  }

  return tokens.length ? tokens : [{ kind: "text", text }];
}

export function splitBlockMath(text: string): Array<TextBlockToken | BlockToken> {
  if (!text.includes("$$")) {
    return [{ kind: "textBlock", text }];
  }

  const tokens: Array<TextBlockToken | BlockToken> = [];
  let cursor = 0;

  while (cursor < text.length) {
    const open = text.indexOf("$$", cursor);

    if (open === -1) {
      tokens.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    if (isEscaped(text, open)) {
      cursor = open + 2;
      continue;
    }

    const close = (() => {
      let scan = open + 2;
      while (scan < text.length) {
        const candidate = text.indexOf("$$", scan);
        if (candidate === -1) {
          return -1;
        }
        if (!isEscaped(text, candidate)) {
          return candidate;
        }
        scan = candidate + 2;
      }
      return -1;
    })();

    if (close === -1) {
      tokens.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    if (open > cursor) {
      tokens.push({ kind: "textBlock", text: text.slice(cursor, open) });
    }

    tokens.push({ kind: "blockMath", latex: text.slice(open + 2, close).trim() });
    cursor = close + 2;
  }

  return tokens.length ? tokens : [{ kind: "textBlock", text }];
}
