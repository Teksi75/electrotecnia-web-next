type KatexModule = {
  renderToString: (latex: string, options: { displayMode: boolean; throwOnError: boolean; strict: "ignore" }) => string;
};

function getKatex(): KatexModule | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("katex") as KatexModule;
  } catch {
    return null;
  }
}

export function renderKatexToString(latex: string, displayMode: boolean): string {
  const katex = getKatex();

  if (!katex) {
    return `<code>${latex}</code>`;
  }

  return katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  });
}
