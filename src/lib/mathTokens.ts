export type InlineToken =
  | { kind: "text"; text: string }
  | { kind: "inlineMath"; latex: string };

export type BlockToken = { kind: "blockMath"; latex: string };

export type TextBlockToken = { kind: "textBlock"; text: string };

const isEscaped = (text: string, index: number) => {
  let backslashes = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i -= 1) {
    backslashes += 1;
  }
  return backslashes % 2 === 1;
};

export function tokenizeInlineMath(text: string): InlineToken[] {
  if (!text.includes("$")) {
    return [{ kind: "text", text }];
  }

  const tokens: InlineToken[] = [];
  const pushText = (value: string) => {
    if (!value) return;
    const last = tokens.at(-1);
    if (last?.kind === "text") {
      last.text += value;
      return;
    }

    tokens.push({ kind: "text", text: value });
  };
  let cursor = 0;

  while (cursor < text.length) {
    const start = text.indexOf("$", cursor);

    if (start === -1) {
      pushText(text.slice(cursor));
      break;
    }

    if (isEscaped(text, start) || text[start + 1] === "$") {
      const escapedEnd = Math.min(start + 1, text.length);
      pushText(text.slice(cursor, escapedEnd));
      cursor = escapedEnd;
      continue;
    }

    let end = text.indexOf("$", start + 1);
    while (end !== -1 && isEscaped(text, end)) {
      end = text.indexOf("$", end + 1);
    }

    if (end === -1) {
      pushText(text.slice(cursor));
      break;
    }

    if (start > cursor) {
      pushText(text.slice(cursor, start));
    }

    const latex = text.slice(start + 1, end).trim();
    if (latex.length) {
      tokens.push({ kind: "inlineMath", latex });
    } else {
      pushText("$");
    }

    cursor = end + 1;
  }

  return tokens.length ? tokens : [{ kind: "text", text }];
}

export function splitBlockMath(text: string): Array<TextBlockToken | BlockToken> {
  if (!text.includes("$$")) {
    return [{ kind: "textBlock", text }];
  }

  const parts: Array<TextBlockToken | BlockToken> = [];
  let cursor = 0;

  while (cursor < text.length) {
    const start = text.indexOf("$$", cursor);

    if (start === -1 || isEscaped(text, start)) {
      parts.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    const end = text.indexOf("$$", start + 2);
    if (end === -1 || isEscaped(text, end)) {
      parts.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    if (start > cursor) {
      parts.push({ kind: "textBlock", text: text.slice(cursor, start) });
    }

    const latex = text.slice(start + 2, end).trim();
    if (latex.length) {
      parts.push({ kind: "blockMath", latex });
    }

    cursor = end + 2;
  }

  return parts.length ? parts : [{ kind: "textBlock", text }];
}
