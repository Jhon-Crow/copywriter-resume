const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "assets/css/resume.css"), "utf8");
const casesDir = path.join(root, "cases");

const failures = [];

for (const caseName of fs.readdirSync(casesDir).sort()) {
  const casePath = path.join(casesDir, caseName);
  if (!fs.statSync(casePath).isDirectory()) continue;

  for (const sourceName of ["task.md", "work.md"]) {
    const sourcePath = path.join(casePath, sourceName);
    const expectedText = normalizeVisibleText(markdownToVisibleText(fs.readFileSync(sourcePath, "utf8")));
    const actualText = normalizeVisibleText(sectionHtmlFor(caseName, sourceName));

    if (actualText !== expectedText) {
      failures.push(`${caseName}/${sourceName}`);
      failures.push(`  expected: ${expectedText}`);
      failures.push(`  actual:   ${actualText}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Missing source text in index.html:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

assertCaseBlocksAreNotClippedOnScreen();

console.log("All case task.md and work.md text matches index.html exactly.");
console.log("Case task/work blocks are not clipped on screen.");

function sectionHtmlFor(caseName, sourceName) {
  const caseNumber = caseName.match(/\d+/)?.[0];
  const articles = html.match(/<article class="case-card">[\s\S]*?<\/article>/g) || [];
  const article = articles[Number(caseNumber) - 1];
  const sections = article?.match(/<section class="case-source__block[^"]*">[\s\S]*?<\/section>/g) || [];
  const sectionIndex = sourceName === "task.md" ? 0 : 1;
  const section = sections[sectionIndex];

  if (!section) {
    return "";
  }

  return section.replace(/<h4>[\s\S]*?<\/h4>/, "");
}

function markdownToVisibleText(markdown) {
  return markdown
    .trim()
    .split("\n")
    .map(stripMarkdown)
    .join("\n");
}

function stripMarkdown(text) {
  return text
    .replace(/^#\s+/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/<u>(.*?)<\/u>/g, "$1");
}

function normalizeVisibleText(text) {
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/g, "\u00a0")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/<\/?(strong|em|u)>/g, "")
    .replace(/<\/h5>/g, "\n")
    .replace(/<\/p>/g, "\n")
    .replace(/<hr\s*\/?>/g, "\n---\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function assertCaseBlocksAreNotClippedOnScreen() {
  const screenCss = css.replace(/@media print \{[\s\S]*?\n\}/g, "");
  const blockRule = screenCss.match(/\.case-source__block\s*\{([\s\S]*?)\}/);

  if (!blockRule) {
    failures.push("CSS rule .case-source__block was not found.");
    return;
  }

  const ruleBody = blockRule[1];
  const clippingDeclarations = [
    /\bmax-height\s*:/,
    /\boverflow\s*:\s*(?:auto|hidden|scroll)\b/,
    /\boverflow-y\s*:\s*(?:auto|hidden|scroll)\b/,
    /\b-webkit-line-clamp\s*:/
  ];

  if (clippingDeclarations.some((pattern) => pattern.test(ruleBody))) {
    failures.push("CSS rule .case-source__block clips task/work text on screen.");
  }
}
