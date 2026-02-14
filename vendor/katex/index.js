function escapeHtml(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderToString(latex, options) {
  const cls = options && options.displayMode ? "katex katex-display" : "katex";
  return `<span class="${cls}"><span class="katex-mathml"><annotation>${escapeHtml(latex)}</annotation></span><span class="katex-html">${escapeHtml(latex)}</span></span>`;
}

module.exports = { renderToString };
