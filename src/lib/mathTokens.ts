export type InlineToken =
  | { kind: "text"; text: string }
  | { kind: "inlineMath"; latex: string };

export type BlockToken = { kind: "blockMath"; latex: string };

export type TextBlockToken = { kind: "textBlock"; text: string };

type CodeRange = {
  start: number;
  end: number;
};

const isEscaped = (text: string, index: number) => {
  let backslashes = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i -= 1) {
    backslashes += 1;
  }
  return backslashes % 2 === 1;
};

const isInsideCodeRange = (index: number, ranges: CodeRange[]) => {
  for (const range of ranges) {
    if (index >= range.start && index < range.end) return true;
  }
  return false;
};

function getCodeRanges(text: string): CodeRange[] {
  const ranges: CodeRange[] = [];

  let cursor = 0;
  while (cursor < text.length) {
    const start = text.indexOf("```", cursor);
    if (start === -1) break;

    const end = text.indexOf("```", start + 3);
    if (end === -1) {
      ranges.push({ start, end: text.length });
      cursor = text.length;
      break;
    }

    ranges.push({ start, end: end + 3 });
    cursor = end + 3;
  }

  cursor = 0;
  while (cursor < text.length) {
    const start = text.indexOf("`", cursor);
    if (start === -1) break;

    if (isInsideCodeRange(start, ranges)) {
      cursor = start + 1;
      continue;
    }

    const end = text.indexOf("`", start + 1);
    if (end === -1) {
      ranges.push({ start, end: text.length });
      break;
    }

    ranges.push({ start, end: end + 1 });
    cursor = end + 1;
  }

  return ranges.sort((a, b) => a.start - b.start);
}

export function tokenizeInlineMath(text: string): InlineToken[] {
  const codeRanges = getCodeRanges(text);
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
    if (isInsideCodeRange(cursor, codeRanges)) {
      textBuffer += text[cursor];
      cursor += 1;
      continue;
    }

    if (text[cursor] === "\\" && text[cursor + 1] === "$") {
      textBuffer += "$";
      cursor += 2;
      continue;
    }

    if (text[cursor] === "$" && text[cursor + 1] !== "$" && !isEscaped(text, cursor)) {
      let end = cursor + 1;
      while (end < text.length) {
        if (!isInsideCodeRange(end, codeRanges) && text[end] === "$" && !isEscaped(text, end)) break;
        end += 1;
      }

      if (end < text.length) {
        pushTextBuffer();
        const latex = text.slice(cursor + 1, end).trim();

        if (latex.length) {
          tokens.push({ kind: "inlineMath", latex });
        } else {
          tokens.push({ kind: "text", text: "$" });
        }

        cursor = end + 1;
        continue;
      }
    }

    if (text[cursor] === "\\" && text[cursor + 1] === "(" && !isEscaped(text, cursor)) {
      let end = cursor + 2;
      while (end < text.length - 1) {
        if (!isInsideCodeRange(end, codeRanges) && text[end] === "\\" && text[end + 1] === ")" && !isEscaped(text, end)) break;
        end += 1;
      }

      if (end < text.length - 1) {
        pushTextBuffer();
        const latex = text.slice(cursor + 2, end).trim();

        if (latex.length) {
          tokens.push({ kind: "inlineMath", latex });
        }

        cursor = end + 2;
        continue;
      }
    }

    textBuffer += text[cursor];
    cursor += 1;
  }

  pushTextBuffer();
  return tokens.length ? tokens : [{ kind: "text", text }];
}

export function splitBlockMath(text: string): Array<TextBlockToken | BlockToken> {
  const codeRanges = getCodeRanges(text);
  const parts: Array<TextBlockToken | BlockToken> = [];
  let cursor = 0;

  while (cursor < text.length) {
    let start = -1;
    let delim: "$$" | "\\[" = "$$";

    for (let i = cursor; i < text.length; i += 1) {
      if (isInsideCodeRange(i, codeRanges)) continue;

      const isDollar = text[i] === "$" && text[i + 1] === "$" && !isEscaped(text, i);
      const isBracket = text[i] === "\\" && text[i + 1] === "[" && !isEscaped(text, i);

      if (isDollar || isBracket) {
        start = i;
        delim = isBracket ? "\\[" : "$$";
        break;
      }
    }

    if (start === -1) {
      parts.push({ kind: "textBlock", text: text.slice(cursor) });
      break;
    }

    const startLen = delim.length;
    const endNeedle = delim === "$$" ? "$$" : "\\]";

    if (start > cursor) {
      parts.push({ kind: "textBlock", text: text.slice(cursor, start) });
    }

    let end = -1;
    for (let i = start + startLen; i < text.length; i += 1) {
      if (isInsideCodeRange(i, codeRanges)) continue;

      const matchDollar = endNeedle === "$$" && text[i] === "$" && text[i + 1] === "$" && !isEscaped(text, i);
      const matchBracket = endNeedle === "\\]" && text[i] === "\\" && text[i + 1] === "]" && !isEscaped(text, i);

      if (matchDollar || matchBracket) {
        end = i;
        break;
      }
    }

    if (end === -1) {
      parts.push({ kind: "textBlock", text: text.slice(start) });
      break;
    }

    const latex = text.slice(start + startLen, end).trim();
    if (latex.length) {
      parts.push({ kind: "blockMath", latex });
    }

    cursor = end + endNeedle.length;
  }

  return parts.length ? parts : [{ kind: "textBlock", text }];
}
