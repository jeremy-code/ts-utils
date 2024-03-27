import fs from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { Dirent, PathLike } from "node:fs";

const __dirname: string = dirname(fileURLToPath(new URL(import.meta.url)));

const shouldIgnoreFile = (fileName: string): boolean =>
  fileName.endsWith(".test.ts");

const generateLinkForFile = (
  directoryName: string,
  fileName: string
): string => {
  const anchor: string = `${directoryName}/${fileName}`
    .replace(/\s/g, "-")
    .toLowerCase();
  return `- [${fileName}](#${anchor})`;
};

const generateMarkdownForFile = async (
  filePath: string,
  fileName: string
): Promise<string> => {
  const fileContents: string = await fs.readFile(filePath, {
    encoding: "utf8",
  });
  return `### ${fileName}\n\`\`\`typescript\n${fileContents}\n\`\`\``;
};

interface DirectoryProcessResult {
  toc: string;
  detailedContent: string;
}

// Recursive function to process directories for the table of contents and detailed content
const processDirectory = async (
  directoryPath: string,
  parentPath: string = ""
): Promise<DirectoryProcessResult> => {
  const dirents: Dirent[] = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });
  let toc: string = "";
  let detailedContent: string = "";

  for (const dirent of dirents) {
    if (dirent.isDirectory() && !dirent.name.startsWith("_")) {
      const subdirPath: string = join(parentPath, dirent.name);
      const { toc: subdirToc, detailedContent: subdirContent } =
        await processDirectory(join(directoryPath, dirent.name), subdirPath);
      if (subdirToc) {
        toc += `- ${dirent.name}\n${subdirToc}`;
        detailedContent += `\n## ${dirent.name}\n${subdirContent}`;
      }
    } else if (
      dirent.isFile() &&
      !shouldIgnoreFile(dirent.name) &&
      dirent.name.endsWith(".ts")
    ) {
      toc += `  ${generateLinkForFile(parentPath, dirent.name)}\n`;
      const fileContent: string = await generateMarkdownForFile(
        join(directoryPath, dirent.name),
        dirent.name
      );
      detailedContent += `\n${fileContent}\n`;
    }
  }

  return { toc, detailedContent };
};

const generateDocumentation = async (): Promise<void> => {
  const srcDirectoryPath: string = join(__dirname, "..", "src");
  const { toc, detailedContent }: DirectoryProcessResult =
    await processDirectory(srcDirectoryPath);

  const header: string = `# ts-utils [![GitHub Actions badge](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/ts-utils/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/jeremy-code/ts-utils)](LICENSE)\n`;
  const tocHeader: string = `# Table of Contents\n${toc}\n`;

  const documentation: string = `${header}\n${tocHeader}${detailedContent}`;

  await fs.writeFile(join(__dirname, "..", "README.md"), documentation, {
    encoding: "utf8",
  });
  console.log("README.md has been generated successfully.");
};

generateDocumentation().catch((error) =>
  console.error("Failed to generate README.md:", error)
);
