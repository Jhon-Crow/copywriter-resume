const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = normalizeVisibleText(fs.readFileSync(path.join(root, "index.html"), "utf8"));
const casesDir = path.join(root, "cases");

const failures = [];

for (const caseName of fs.readdirSync(casesDir).sort()) {
  const casePath = path.join(casesDir, caseName);
  if (!fs.statSync(casePath).isDirectory()) continue;

  for (const sourceName of ["task.md", "work.md"]) {
    const sourcePath = path.join(casePath, sourceName);
    const paragraphs = visibleParagraphs(fs.readFileSync(sourcePath, "utf8"));

    paragraphs.forEach((paragraph, index) => {
      if (!html.includes(paragraph)) {
        failures.push(`${caseName}/${sourceName} paragraph ${index + 1}: ${paragraph}`);
      }
    });
  }
}

if (failures.length > 0) {
  console.error("Missing source text in index.html:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("All task.md and work.md visible text is present in index.html.");

function visibleParagraphs(markdown) {
  return markdown
    .trim()
    .split(/\n{2,}/)
    .flatMap((block) => block.split("\n"))
    .map(stripMarkdown)
    .map(normalizeVisibleText)
    .filter((line) => line.length > 0 && line !== "---");
}

function stripMarkdown(text) {
  return text
    .replace(/^#\s+/, "")
    .replace(/^—\s+/, "")
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
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
