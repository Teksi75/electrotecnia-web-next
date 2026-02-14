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

const readInlineMath = (text: string, start: number) => {
  if (text[start] === "$" && text[start + 1] !== "$" && !isEscaped(text, start)) {
    let end = start + 1;
    while (end < text.length) {
      if (text[end] === "$" && !isEscaped(text, end)) {
        return { latex: text.slice(start + 1, end).trim(), next: end + 1 };
      }
      end += 1;
    }
    return null;
  }

  if (text[start] === "\\" && text[start + 1] === "(") {
    let end = start + 2;
    while (end < text.length - 1) {
      if (text[end] === "\\" && text[end + 1] === ")" && !isEscaped(text, end)) {
        return { latex: text.slice(start + 2, end).trim(), next: end + 2 };
      }
      end += 1;
    }
  }

  return null;
};

export function tokenizeInlineMath(text: string): InlineToken[] {
  if (!text.includes("$") && !text.includes("\\(")) {
    return [{ kind: "text", text: text.replace(/\\\$/g, "$") }];
  }

  const tokens: InlineToken[] = [];
  let cursor = 0;
  let textBuffer = "";
  let inInlineCode = false;

  const pushTextBuffer = () => {
    if (textBuffer.length) {
      tokens.push({ kind: "text", text: textBuffer.replace(/\\\$/g, "$") });
      textBuffer = "";
    }
  };

  while (cursor < text.length) {
    const currentChar = text[cursor];

    if (currentChar === "`") {
      inInlineCode = !inInlineCode;
      textBuffer += currentChar;
      cursor += 1;
      continue;
    }

    if (inInlineCode) {
      textBuffer += currentChar;
      cursor += 1;
      continue;
    }

    const inlineMath = readInlineMath(text, cursor);
    if (inlineMath) {
      pushTextBuffer();
      if (inlineMath.latex.length) {
        tokens.push({ kind: "inlineMath", latex: inlineMath.latex });
      }
      cursor = inlineMath.next;
      continue;
    }

    textBuffer += currentChar;
    cursor += 1;
  }

  pushTextBuffer();

  return tokens.length ? tokens : [{ kind: "text", text: text.replace(/\\\$/g, "$") }];
}

const readBlockMath = (text: string, start: number) => {
  if (text[start] === "$" && text[start + 1] === "$" && !isEscaped(text, start)) {
    let end = start + 2;
    while (end < text.length - 1) {
      if (text[end] === "$" && text[end + 1] === "$" && !isEscaped(text, end)) {
        return { latex: text.slice(start + 2, end).trim(), next: end + 2 };
      }
      end += 1;
    }
    return null;
  }

  if (text[start] === "\\" && text[start + 1] === "[") {
    let end = start + 2;
    while (end < text.length - 1) {
      if (text[end] === "\\" && text[end + 1] === "]" && !isEscaped(text, end)) {
        return { latex: text.slice(start + 2, end).trim(), next: end + 2 };
      }
      end += 1;
    }
  }

  return null;
};

export function splitBlockMath(text: string): Array<TextBlockToken | BlockToken> {
  if (!text.includes("$$") && !text.includes("\\[")) {
    return [{ kind: "textBlock", text }];
  }

  const parts: Array<TextBlockToken | BlockToken> = [];
  let cursor = 0;
  let lastTextStart = 0;
  let inFencedCode = false;

  while (cursor < text.length) {
    const lineStart = cursor === 0 || text[cursor - 1] === "\n";
    if (lineStart && text.startsWith("```", cursor)) {
      inFencedCode = !inFencedCode;
      const lineEnd = text.indexOf("\n", cursor);
      cursor = lineEnd === -1 ? text.length : lineEnd + 1;
      continue;
    }

    if (inFencedCode) {
      cursor += 1;
      continue;
    }

    const blockMath = readBlockMath(text, cursor);
    if (!blockMath) {
      cursor += 1;
      continue;
    }

    if (cursor > lastTextStart) {
      parts.push({ kind: "textBlock", text: text.slice(lastTextStart, cursor) });
    }

    if (blockMath.latex.length) {
      parts.push({ kind: "blockMath", latex: blockMath.latex });
    }

    cursor = blockMath.next;
    lastTextStart = cursor;
  }

  if (lastTextStart < text.length) {
    parts.push({ kind: "textBlock", text: text.slice(lastTextStart) });
  }

  return parts.length ? parts : [{ kind: "textBlock", text }];
}
