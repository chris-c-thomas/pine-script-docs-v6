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
  const pathAfterRoot = scraped.info.path
    .replace(DOCS_ROOT + "/", "")
    .replace(/\/$/, "");
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
function fixSingleBacktickFences(md: string): string {
  // remark-stringify sometimes uses single-backtick fences for code blocks.
  // We need to detect these and convert to triple-backtick fences.
  // A single-backtick fence is: a line starting with ` followed by code,
  // with a matching closing ` on its own line.
  const lines = md.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inCodeBlock) {
      // Detect opening single-backtick fence: line starts with exactly one
      // backtick (not two or more), and is NOT inline code (which has
      // a closing backtick on the same line after text)
      if (
        line.startsWith("`") &&
        !line.startsWith("``") &&
        !line.startsWith("```")
      ) {
        const content = line.slice(1);
        // Check if this looks like a fenced code block opening
        // (no closing backtick on same line, or the content has multiple lines worth)
        const closingIdx = content.indexOf("`");
        if (closingIdx === -1 || closingIdx === content.length - 1) {
          // No closing backtick or backtick at very end — check if next lines
          // form a code block (look for a line that is just `)
          let foundClose = false;
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j] === "`") {
              foundClose = true;
              break;
            }
          }
          if (foundClose) {
            // This is a single-backtick fenced code block
            inCodeBlock = true;
            result.push("```" + content);
            continue;
          }
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
      .replace(/\[Pine Script®\]\(https:\/\/tradingview\.com\/pine-script-docs\)\n\n/g, "")
      // Normalize double-backtick fences to triple-backtick fences
      .replace(/^``(?!`)/gm, "```")
      // Add pine language tag to fenced code blocks starting with //@version=
      .replace(/^```(\/\/@version=)/gm, "```pine\n$1")
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
