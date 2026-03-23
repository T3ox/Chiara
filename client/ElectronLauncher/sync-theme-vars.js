const fs = require("fs");
const path = require("path");

const sourcePath = path.resolve(__dirname, "../../theme.css");
const outputPath = path.resolve(__dirname, "theme.generated.css");

function extractCssVariables(css) {
  const variableRegex = /--[a-zA-Z0-9-_]+\s*:\s*[^;]+;/g;
  const matches = css.match(variableRegex) || [];
  const unique = [];
  const seen = new Set();

  for (const match of matches) {
    const key = match.split(":")[0].trim();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(match.trim());
    }
  }

  return unique;
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`File tema non trovato: ${sourcePath}`);
  }

  const sourceCss = fs.readFileSync(sourcePath, "utf8");
  const variables = extractCssVariables(sourceCss);

  if (!variables.length) {
    throw new Error(`Nessuna CSS variable trovata in: ${sourcePath}`);
  }

  const generatedCss = [
    "/* Auto-generated from ../../theme.css. Do not edit manually. */",
    ":root {",
    ...variables.map((line) => `  ${line}`),
    "}",
    "",
  ].join("\n");

  fs.writeFileSync(outputPath, generatedCss, "utf8");
  console.log(
    `Theme variables synced: ${variables.length} variables -> ${path.relative(process.cwd(), outputPath)}`
  );
}

main();
