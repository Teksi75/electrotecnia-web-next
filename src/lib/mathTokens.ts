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

export function tokenizeInlineMath(text: string): InlineToken[] {
  if (!text.includes("$") && !text.includes("\\(")) {
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

    if (currentChar === "\\" && text[cursor + 1] === "(" && !isEscaped(text, cursor) && !isInsideCode(text, cursor)) {
      let end = cursor + 2;
      while (end < text.length - 1) {
        if (text[end] === "\\" && text[end + 1] === ")" && !isEscaped(text, end) && !isInsideCode(text, end)) break;
        end += 1;
      }

      if (end >= text.length - 1) {
        textBuffer += text.slice(cursor);
        break;
      }

      pushTextBuffer();

      const latex = text.slice(cursor + 2, end).trim();
      if (latex.length) {
        tokens.push({ kind: "inlineMath", latex });
      } else {
        tokens.push({ kind: "text", text: "\\(\\)" });
      }

      cursor = end + 2;
      continue;
    }

    if (currentChar !== "$") {
      textBuffer += currentChar;
      cursor += 1;
      continue;
    }

    if (isEscaped(text, cursor) || text[cursor + 1] === "$" || isInsideCode(text, cursor)) {
      textBuffer += "$";
      cursor += 1;
      continue;
    }

    let end = cursor + 1;
    while (end < text.length) {
      if (text[end] === "$" && !isEscaped(text, end) && !isInsideCode(text, end)) break;
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
    let start = text.indexOf("$$", cursor);
    let end = -1;
    let delimiterLength = 2;

    while (start !== -1 && (isEscaped(text, start) || isInsideCode(text, start))) {
      start = text.indexOf("$$", start + 2);
    }

    let bracketStart = text.indexOf("\\[", cursor);
    while (bracketStart !== -1 && (isEscaped(text, bracketStart) || isInsideCode(text, bracketStart))) {
      bracketStart = text.indexOf("\\[", bracketStart + 2);
    }

    if (bracketStart !== -1 && (start === -1 || bracketStart < start)) {
      start = bracketStart;
      delimiterLength = 2;
      end = text.indexOf("\\]", start + 2);
      while (end !== -1 && (isEscaped(text, end) || isInsideCode(text, end))) {
        end = text.indexOf("\\]", end + 2);
      }
    } else if (start !== -1) {
      end = text.indexOf("$$", start + 2);
      while (end !== -1 && (isEscaped(text, end) || isInsideCode(text, end))) {
        end = text.indexOf("$$", end + 2);
      }
    }

    if (start === -1 || end === -1) {
      parts.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    if (start > cursor) {
      parts.push({ kind: "textBlock", text: text.slice(cursor, start) });
    }

    const latex = text.slice(start + delimiterLength, end).trim();
    if (latex.length) {
      parts.push({ kind: "blockMath", latex });
    }

    cursor = end + delimiterLength;
  }

  return parts.length ? parts : [{ kind: "textBlock", text }];
}
