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

const isInsideInlineCode = (text: string, index: number) => {
  let insideCode = false;

  for (let i = 0; i < index; i += 1) {
    if (text[i] !== "`" || isEscaped(text, i)) continue;
    insideCode = !insideCode;
  }

  return insideCode;
};

const isInsideFence = (text: string, index: number) => {
  let insideFence = false;

  for (let i = 0; i < index; i += 1) {
    if (text[i] !== "`" || text.slice(i, i + 3) !== "```" || isEscaped(text, i)) continue;
    insideFence = !insideFence;
    i += 2;
  }

  return insideFence;
};

export function tokenizeInlineMath(text: string): InlineToken[] {
  if (!text.includes("$")) {
    return [{ kind: "text", text }];
  }

  const tokens: InlineToken[] = [];
  let cursor = 0;
  let textBuffer = "";

  const pushTextBuffer = () => {
    if (textBuffer.length) {
      tokens.push({ kind: "text", text: textBuffer });
      textBuffer = "";
    }
  };

  while (cursor < text.length) {
    const currentChar = text[cursor];

    if (currentChar === "\\" && text[cursor + 1] === "$") {
      textBuffer += "$";
      cursor += 2;
      continue;
    }

    if (currentChar !== "$" || isInsideInlineCode(text, cursor)) {
      textBuffer += currentChar;
      cursor += 1;
      continue;
    }

    if (isEscaped(text, cursor) || text[cursor + 1] === "$") {
      textBuffer += "$";
      cursor += 1;
      continue;
    }

    let end = cursor + 1;
    while (end < text.length) {
      if (text[end] === "$" && !isEscaped(text, end)) break;
      end += 1;
    }

    if (end >= text.length) {
      textBuffer += text.slice(cursor);
      break;
    }

    pushTextBuffer();

    const latex = text.slice(cursor + 1, end).trim();
    if (latex.length) {
      tokens.push({ kind: "inlineMath", latex });
    } else {
      tokens.push({ kind: "text", text: "$" });
    }

    cursor = end + 1;
  }

  pushTextBuffer();

  return tokens.length ? tokens : [{ kind: "text", text }];
}

export function splitBlockMath(text: string): Array<TextBlockToken | BlockToken> {
  if (!text.includes("$$") && !text.includes("\\[")) {
    return [{ kind: "textBlock", text }];
  }

  const parts: Array<TextBlockToken | BlockToken> = [];
  let cursor = 0;

  while (cursor < text.length) {
    const doubleDollarStart = text.indexOf("$$", cursor);
    const bracketStart = text.indexOf("\\[", cursor);
    const start =
      doubleDollarStart === -1
        ? bracketStart
        : bracketStart === -1
          ? doubleDollarStart
          : Math.min(doubleDollarStart, bracketStart);

    const usesBracketDelimiter = start === bracketStart;

    if (start === -1 || isEscaped(text, start) || isInsideFence(text, start)) {
      parts.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    const delimiter = usesBracketDelimiter ? "\\]" : "$$";
    const end = text.indexOf(delimiter, start + 2);

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

    cursor = end + delimiter.length;
  }

  return parts.length ? parts : [{ kind: "textBlock", text }];
}
