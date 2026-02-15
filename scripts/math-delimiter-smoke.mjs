import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = "src/content/electricidad";
const LATEX_PATTERN = /\\frac|\\mu|\\times|\\left|\\right|\\vec|\^\{|_\{/;
const MATH_DELIMITER_PATTERN = /(\\\(|\\\)|\\\[|\\\]|\$\$|\$)/;

function hasMathDelimiter(value) {
  return /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\$[^$\n]+\$/.test(value);
}

function findJsonIssues(jsonData, filePath) {
  const issues = [];

  function walk(node) {
    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }

    if (!node || typeof node !== "object") {
      return;
    }

    if (node.type === "formulas" && Array.isArray(node.items)) {
      node.items.forEach((item, index) => {
        if (typeof item === "string" && LATEX_PATTERN.test(item) && !hasMathDelimiter(item)) {
          issues.push(`${filePath}: formulas.items[${index}] contiene LaTeX sin delimitadores.`);
        }
      });
    }

    if (node.type === "example" && typeof node.body === "string") {
      if (LATEX_PATTERN.test(node.body) && !hasMathDelimiter(node.body)) {
        issues.push(`${filePath}: example.body contiene LaTeX sin delimitadores.`);
      }
    }

    Object.values(node).forEach((value) => walk(value));
  }

  walk(jsonData);
  return issues;
}

function findMdxCodeDelimiterIssues(mdxText, filePath) {
  const issues = [];
  const lines = mdxText.split(/\r?\n/);
  let inFence = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      return;
    }

    if (inFence && MATH_DELIMITER_PATTERN.test(line)) {
      issues.push(`${filePath}:${index + 1} delimitador matemático dentro de code fence.`);
    }

    const inlineMatches = line.match(/`[^`]*`/g) ?? [];
    inlineMatches.forEach((codeSpan) => {
      if (MATH_DELIMITER_PATTERN.test(codeSpan)) {
        issues.push(`${filePath}:${index + 1} delimitador matemático dentro de inline code.`);
      }
    });
  });

  return issues;
}

async function main() {
  const entries = await fs.readdir(CONTENT_DIR);
  const jsonFiles = entries.filter((entry) => entry.endsWith(".json"));
  const mdxFiles = entries.filter((entry) => entry.endsWith(".mdx"));

  const errors = [];

  for (const file of jsonFiles) {
    const absolutePath = path.join(CONTENT_DIR, file);
    const parsed = JSON.parse(await fs.readFile(absolutePath, "utf8"));
    errors.push(...findJsonIssues(parsed, absolutePath));
  }

  for (const file of mdxFiles) {
    const absolutePath = path.join(CONTENT_DIR, file);
    const text = await fs.readFile(absolutePath, "utf8");
    errors.push(...findMdxCodeDelimiterIssues(text, absolutePath));
  }

  if (errors.length > 0) {
    console.error("math-delimiter-smoke: FAIL");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("math-delimiter-smoke: OK");
}

main();
