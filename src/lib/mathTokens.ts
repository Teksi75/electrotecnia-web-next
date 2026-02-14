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

const startsWithAt = (text: string, cursor: number, target: string) => text.slice(cursor, cursor + target.length) === target;

const consumeCodeSpan = (text: string, cursor: number): number => {
  if (text[cursor] !== "`") return cursor;

  let ticks = 1;
  while (text[cursor + ticks] === "`") ticks += 1;

  const fence = "`".repeat(ticks);
  let end = cursor + ticks;

  while (end < text.length) {
    if (startsWithAt(text, end, fence)) {
      return end + ticks;
    }
    end += 1;
  }

  return text.length;
};

const findInlineMathEnd = (text: string, start: number) => {
  let end = start + 1;

  while (end < text.length) {
    if (text[end] === "`") {
      end = consumeCodeSpan(text, end);
      continue;
    }

    if (text[end] === "$" && !isEscaped(text, end)) {
      return end;
    }

    end += 1;
  }

  return -1;
};

const findBlockMathEnd = (text: string, start: number, closing: string) => {
  let cursor = start;
  let inFence = false;

  while (cursor < text.length) {
    if (startsWithAt(text, cursor, "```")) {
      inFence = !inFence;
      cursor += 3;
      continue;
    }

    if (inFence) {
      cursor += 1;
      continue;
    }

    if (text[cursor] === "`") {
      cursor = consumeCodeSpan(text, cursor);
      continue;
    }

    if (startsWithAt(text, cursor, closing) && !isEscaped(text, cursor)) {
      return cursor;
    }

    cursor += 1;
  }

  return -1;
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

    if (currentChar === "`") {
      const nextCursor = consumeCodeSpan(text, cursor);
      textBuffer += text.slice(cursor, nextCursor);
      cursor = nextCursor;
      continue;
    }

    if (currentChar !== "$") {
      textBuffer += currentChar;
      cursor += 1;
      continue;
    }

    if (isEscaped(text, cursor) || text[cursor + 1] === "$") {
      textBuffer += "$";
      cursor += 1;
      continue;
    }

    const end = findInlineMathEnd(text, cursor);

    if (end === -1) {
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
  let lastTextStart = 0;
  let inFence = false;

  while (cursor < text.length) {
    if (startsWithAt(text, cursor, "```")) {
      inFence = !inFence;
      cursor += 3;
      continue;
    }

    if (inFence) {
      cursor += 1;
      continue;
    }

    if (text[cursor] === "`") {
      cursor = consumeCodeSpan(text, cursor);
      continue;
    }

    let opening = "";
    let closing = "";

    if (startsWithAt(text, cursor, "$$") && !isEscaped(text, cursor)) {
      opening = "$$";
      closing = "$$";
    } else if (startsWithAt(text, cursor, "\\[") && !isEscaped(text, cursor)) {
      opening = "\\[";
      closing = "\\]";
    }

    if (!opening) {
      cursor += 1;
      continue;
    }

    const start = cursor;
    const end = findBlockMathEnd(text, start + opening.length, closing);

    if (end === -1) {
      cursor += opening.length;
      continue;
    }

    if (start > lastTextStart) {
      parts.push({ kind: "textBlock", text: text.slice(lastTextStart, start) });
    }

    const latex = text.slice(start + opening.length, end).trim();
    if (latex.length) {
      parts.push({ kind: "blockMath", latex });
    }

    cursor = end + closing.length;
    lastTextStart = cursor;
  }

  if (lastTextStart < text.length) {
    parts.push({ kind: "textBlock", text: text.slice(lastTextStart) });
  }

  return parts.length ? parts : [{ kind: "textBlock", text }];
}
