import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import type { ScrapedPage, ConvertedPage } from "./types.js";
import { DOCS_ROOT } from "./pages.js";

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
 * Converts a scraped page's HTML content to clean Markdown.
 */
export async function convertPage(scraped: ScrapedPage): Promise<ConvertedPage> {
  const processor = createProcessor();
  const result = await processor.process(scraped.html);
  let markdown = String(result);

  // Build YAML frontmatter
  const frontmatter = [
    "---",
    `title: "${scraped.info.title.replace(/"/g, '\\"')}"`,
    `source: "https://www.tradingview.com${scraped.info.path}"`,
    scraped.info.section ? `section: "${scraped.info.section}"` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  // Clean up the markdown
  markdown = cleanMarkdown(markdown);

  // Determine output file path
  const normalizedPath = scraped.info.path.replace(/\/+$/, "");
  let pathAfterRoot = normalizedPath.startsWith(DOCS_ROOT + "/")
    ? normalizedPath.slice(DOCS_ROOT.length + 1)
    : normalizedPath.replace(/^\/+/, "");
  if (!pathAfterRoot) {
    pathAfterRoot = "index";
  }
  const outputPath = `pine-script-docs/${pathAfterRoot}.md`;

  return {
    info: scraped.info,
    markdown: `${frontmatter}\n\n${markdown}\n`,
    outputPath,
  };
}

/**
 * Cleans up converted markdown:
 * - Fixes excessive blank lines
 * - Cleans up heading anchor artifacts
 * - Normalizes whitespace
 */
// Matches a single-backtick fence opener: exactly "`" or "`lang" with no
// spaces or other content (e.g. "`pine", "`js"). Won't match inline code
// like "`foo` is a variable".
const singleBacktickFenceOpenRe = /^`[A-Za-z0-9+-]*$/;

function fixSingleBacktickFences(md: string): string {
  // remark-stringify sometimes uses single-backtick fences for code blocks.
  // We detect these and convert to triple-backtick fences.
  const lines = md.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;

  // Precompute whether a future closing single-backtick fence exists from
  // each index. This avoids an O(n²) forward scan per opening fence.
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
      // Only treat dedicated fence lines (exactly "`" or "`lang") as openers
      if (singleBacktickFenceOpenRe.test(line)) {
        const content = line.slice(1);
        // Only treat this as a fence if there is a matching closing ` later
        if (hasFutureClosing[i + 1]) {
          inCodeBlock = true;
          result.push("```" + content);
          continue;
        }
      }
    } else {
      // Inside code block: look for closing single-backtick fence
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

function cleanMarkdown(md: string): string {
  // First fix single-backtick fenced code blocks
  md = fixSingleBacktickFences(md);

  return (
    md
      // Clean heading anchor links: "# [Title](#id)" → "# Title"
      .replace(/^(#{1,6}) \[([^\]]+)\]\(#[^)]*\)/gm, "$1 $2")
      // Remove any leftover empty link artifacts from heading anchors
      .replace(/\[]\(#[^)]*\)/g, "")
      // Remove "Copied" artifacts from code block copy buttons
      .replace(/^Copied\n\n/gm, "")
      // Remove Pine Script code block labels (link before code blocks)
      .replace(/\[Pine Script®\]\(https:\/\/(?:www\.)?tradingview\.com\/pine-script-docs\)\n\n/g, "")
      // Normalize double-backtick fences to triple-backtick fences
      .replace(/^``(?!`)/gm, "```")
      // Add pine language tag to fenced code blocks whose first line is //@version=
      .replace(/^```(\/\/@version=)/gm, "```pine\n$1")
      .replace(/^```(?=\n\/\/@version=)/gm, "```pine")
      // Convert relative image paths to full URLs
      .replace(/!\[([^\]]*)\]\(\//g, "![$1](https://www.tradingview.com/")
      // Fix note/warning callouts that merge with text
      .replace(/^(Note|Warning|Tip|Important|Caution)(?=[A-Z])/gm, "**$1**\n\n")
      // Collapse 3+ consecutive blank lines into 2
      .replace(/\n{3,}/g, "\n\n")
      // Remove trailing whitespace on lines
      .replace(/[ \t]+$/gm, "")
      // Trim leading/trailing whitespace
      .trim()
  );
}

/**
 * Converts all scraped pages to Markdown.
 */
export async function convertAllPages(
  scrapedPages: ScrapedPage[],
): Promise<ConvertedPage[]> {
  const results: ConvertedPage[] = [];

  for (const scraped of scrapedPages) {
    console.log(`  Converting: ${scraped.info.title}`);
    const converted = await convertPage(scraped);
    results.push(converted);
  }

  return results;
}
