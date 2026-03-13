import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import type { ReferenceEntry, ConvertedPage } from "./types.js";
import { REFERENCE_URL } from "./reference-crawler.js";

/**
 * Mapping of operator symbols to safe filenames.
 */
const OPERATOR_NAMES: Record<string, string> = {
  "-": "minus",
  "-=": "minus-assign",
  ":=": "reassign",
  "!=": "not-equal",
  "?:": "ternary",
  "[]": "subscript",
  "*": "multiply",
  "*=": "multiply-assign",
  "/": "divide",
  "/=": "divide-assign",
  "%": "modulo",
  "%=": "modulo-assign",
  "+": "plus",
  "+=": "plus-assign",
  "<": "less-than",
  "<=": "less-equal",
  "=": "assign",
  "==": "equal",
  "=>": "arrow",
  ">": "greater-than",
  ">=": "greater-equal",
};

const CATEGORY_DIRS: Record<string, string> = {
  Variables: "variables",
  Constants: "constants",
  Functions: "functions",
  Keywords: "keywords",
  Types: "types",
  Operators: "operators",
  Annotations: "annotations",
};

/**
 * Creates the unified processor pipeline for HTML -> Markdown conversion.
 */
function createProcessor() {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, {
      bullet: "-",
      emphasis: "_",
      strong: "*",
      listItemIndent: "one",
      rule: "-",
      fences: true,
    });
}

/**
 * Converts an operator/annotation/function name to a safe filename.
 */
function sanitizeFilename(name: string, category: string): string {
  if (category === "Operators") {
    return OPERATOR_NAMES[name] || name.replace(/[^a-zA-Z0-9.-]/g, "-");
  }
  if (category === "Annotations") {
    // Strip @ prefix and trailing =
    return name.replace(/^@/, "").replace(/=$/, "");
  }
  // Strip trailing () for functions
  let filename = name.replace(/\(\)$/, "");
  // Handle angle brackets (array.new<type> → array.new_type)
  filename = filename.replace(/<([^>]+)>/g, "_$1").replace(/,/g, "_");
  return filename;
}

/**
 * Detects if a line is a single-backtick fence opener from remark-stringify.
 */
function isSingleBacktickFenceOpen(line: string): boolean {
  if (!line.startsWith("`") || line.startsWith("``")) return false;
  const afterBacktick = line.slice(1);
  if (/^[A-Za-z0-9+-]*$/.test(afterBacktick)) return true;
  if (!afterBacktick.includes("`")) return true;
  return false;
}

function fixSingleBacktickFences(md: string): string {
  const lines = md.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;

  const hasFutureClosing = new Array<boolean>(lines.length);
  let seenClosing = false;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i] === "`") {
      seenClosing = true;
    }
    hasFutureClosing[i] = seenClosing;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inCodeBlock) {
      if (isSingleBacktickFenceOpen(line) && hasFutureClosing[i + 1]) {
        const content = line.slice(1);
        inCodeBlock = true;
        result.push("```" + content);
        continue;
      }
    } else {
      if (line === "`") {
        inCodeBlock = false;
        result.push("```");
        continue;
      }
    }

    result.push(line);
  }

  return result.join("\n");
}

/**
 * Cleans up converted markdown for reference entries.
 */
function cleanMarkdown(md: string): string {
  md = fixSingleBacktickFences(md);

  return md
    .replace(/^``(?!`)/gm, "```")
    .replace(
      /\]\(#(var_|fun_|const_|kw_|type_|op_|an_)/g,
      `](${REFERENCE_URL}#$1`,
    )
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

/**
 * Converts a single reference entry to Markdown.
 */
export async function convertReferenceEntry(
  entry: ReferenceEntry,
): Promise<ConvertedPage> {
  const processor = createProcessor();
  const result = await processor.process(entry.html);
  let markdown = String(result);

  markdown = cleanMarkdown(markdown);

  const frontmatter = [
    "---",
    `title: "${entry.name.replace(/"/g, '\\"')}"`,
    `source: "${REFERENCE_URL}#${entry.id}"`,
    `category: "${entry.category}"`,
    "---",
  ].join("\n");

  const categoryDir =
    CATEGORY_DIRS[entry.category] || entry.category.toLowerCase();
  const filename = sanitizeFilename(entry.name, entry.category);
  const outputPath = `pine-script-reference/${categoryDir}/${filename}.md`;

  return {
    info: {
      path: `#${entry.id}`,
      title: entry.name,
      section: entry.category,
    },
    markdown: `${frontmatter}\n\n${markdown}\n`,
    outputPath,
  };
}

/**
 * Converts all reference entries to Markdown.
 */
export async function convertAllReferenceEntries(
  entries: ReferenceEntry[],
): Promise<ConvertedPage[]> {
  const results: ConvertedPage[] = [];

  for (const entry of entries) {
    const converted = await convertReferenceEntry(entry);
    results.push(converted);
  }

  return results;
}
