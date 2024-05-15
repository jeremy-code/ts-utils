import type { Dirent } from "node:fs";
import fs, { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

/**
 * For convenience, text is initially separated by only one linebreak, and final
 * content is formatted with prettier.
 */
const NEWLINE = "\n";

// Markdown helpers
const link = (text: string, href: string) => `[${text}](${href})`;
const image = (alt: string, href: string) => `![${alt}](${href})`;
// not using template strings to avoid escaping backticks
const code = (lang: string, code: string) =>
  ["```" + lang, code, "```"].join(NEWLINE);

const HEADER = [
  "# ts-utils",
  link(
    image(
      "GitHub Actions badge",
      "https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml/badge.svg",
    ),
    "https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml",
  ),
  link(
    image(
      "License",
      "https://img.shields.io/github/license/jeremy-code/ts-utils",
    ),
    "LICENSE",
  ),
].join(" ");

const updateReadMe = async () => {
  console.log("🔄 Generating README.md...");

  const dirents = await readdir("./src", {
    withFileTypes: true,
    recursive: true,
  });

  // Group files by path (category)
  const files = dirents.reduce<Record<string, Dirent[]>>((acc, dirent) => {
    if (
      dirent.isFile() && // only files
      !relative("src", dirent.parentPath).startsWith("_") && // ignore directories starting with "_"
      !dirent.name.endsWith(".test.ts") // ignore test files
    ) {
      acc[dirent.parentPath] = [...(acc[dirent.parentPath] ?? []), dirent];
    }
    return acc;
  }, {});

  const toc = Object.entries(files)
    .map(([filePath, dirents]) => {
      const category = relative("src", filePath);

      return [
        `- ${link(category, `#${category}`)}`,
        ...dirents
          // In GitHub, the anchor link doesn't support dots
          .map(
            ({ name }) => `\t- ${link(name, `#${name.replaceAll(".", "")}`)}`,
          ),
      ].join(NEWLINE);
    })
    .join(NEWLINE);

  const content = await Promise.all(
    Object.entries(files).map(async ([filePath, dirents]) => {
      const category = relative("src", filePath);

      const description = await Promise.all(
        dirents.map(async (d) => {
          const content = await fs.readFile(join(d.parentPath, d.name), {
            encoding: "utf8",
          });

          return [`### ${d.name}`, code("typescript", content)].join(NEWLINE);
        }),
      );

      return [`## ${category}`, ...description].join(NEWLINE);
    }),
  );

  const readMe = [HEADER, "# Table of Contents", toc, ...content].join(NEWLINE);

  await fs.writeFile("./README.md", readMe, { encoding: "utf8" });

  console.log("✅ README.md has been generated successfully.");
};

updateReadMe().catch((e: unknown) => {
  console.error("❌ Failed to generate README.md:", e);
});
