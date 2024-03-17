const HEADER = `# ts-utils [![GitHub Actions badge](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/jeremy-code/ts-utils)](LICENSE)`;

import fs from "node:fs/promises";
import { join, dirname } from "node:path";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const files = await fs.readdir(join(__dirname, "..", "src"));

console.log(files);

const tableOfContents = `# Table of Contents\n${files
  .map((file) => `- [${file.replace(".ts", "")}](#${file})`)
  .join("\n")}`;

console.log(tableOfContents);

// const markdown =
//   HEADER +
//   "\n\n" +
//   files.map((file) => `- [${file.replace(".ts", "")}](src/${file})`).join;
