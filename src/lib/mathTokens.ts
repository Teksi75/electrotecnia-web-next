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
  let inCode = false;

  for (let i = 0; i < index; i += 1) {
    if (text[i] !== "`") continue;
    if (isEscaped(text, i)) continue;
    inCode = !inCode;
  }

  return inCode;
};

const isInsideFencedCode = (text: string, index: number) => {
  let inFence = false;

  for (let i = 0; i < index; i += 1) {
    if (text[i] !== "`") continue;
    if (text.slice(i, i + 3) !== "```") continue;
    if (isEscaped(text, i)) continue;
    inFence = !inFence;
    i += 2;
  }

  return inFence;
};

const isInsideCode = (text: string, index: number) => isInsideInlineCode(text, index) || isInsideFencedCode(text, index);

const hasMathDelimiters = (text: string) => text.includes("$") || text.includes("\\(") || text.includes("\\[");

export function tokenizeInlineMath(text: string): InlineToken[] {
  if (!hasMathDelimiters(text)) {
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

    const isDollarOpen = currentChar === "$" && !isEscaped(text, cursor) && text[cursor + 1] !== "$" && !isInsideCode(text, cursor);
    const isParenOpen = text.slice(cursor, cursor + 2) === "\\(" && !isEscaped(text, cursor) && !isInsideCode(text, cursor);

    if (!isDollarOpen && !isParenOpen) {
      textBuffer += currentChar;
      cursor += 1;
      continue;
    }

    const openLength = isParenOpen ? 2 : 1;
    const closeDelimiter = isParenOpen ? "\\)" : "$";
    let end = cursor + openLength;

    while (end < text.length) {
      if (closeDelimiter === "$") {
        if (text[end] === "$" && !isEscaped(text, end) && !isInsideCode(text, end)) break;
        end += 1;
        continue;
      }

      if (text.slice(end, end + 2) === "\\)" && !isEscaped(text, end) && !isInsideCode(text, end)) break;
      end += 1;
    }

    if (end >= text.length) {
      textBuffer += text.slice(cursor);
      break;
    }

    pushTextBuffer();

    const latex = text.slice(cursor + openLength, end).trim();

    if (latex.length) {
      tokens.push({ kind: "inlineMath", latex });
    } else {
      tokens.push({ kind: "text", text: text.slice(cursor, cursor + openLength) });
    }

    cursor = end + (closeDelimiter === "$" ? 1 : 2);
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
    const dollarStart = text.indexOf("$$", cursor);
    const bracketStart = text.indexOf("\\[", cursor);

    let start = -1;
    let delimiter: "dollar" | "bracket" | null = null;

    if (dollarStart !== -1 && (bracketStart === -1 || dollarStart < bracketStart)) {
      start = dollarStart;
      delimiter = "dollar";
    } else if (bracketStart !== -1) {
      start = bracketStart;
      delimiter = "bracket";
    }

    if (start === -1 || isEscaped(text, start) || isInsideCode(text, start)) {
      parts.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    const close = delimiter === "dollar" ? "$$" : "\\]";
    const end = text.indexOf(close, start + 2);

    if (end === -1 || isEscaped(text, end) || isInsideCode(text, end)) {
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
