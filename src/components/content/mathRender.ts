function renderLatex(latex: string, displayMode: boolean): string | null {
  try {
    const katex = (Function("moduleName", "return require(moduleName);") as (moduleName: string) => {
      renderToString: (input: string, options: Record<string, unknown>) => string;
    })("katex");

    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: "ignore",
      trust: false,
      output: "mathml",
    });
  } catch {
    return null;
  }
}

export function renderInlineLatex(latex: string) {
  return renderLatex(latex, false);
}

export function renderBlockLatex(latex: string) {
  return renderLatex(latex, true);
}
