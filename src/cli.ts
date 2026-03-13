#!/usr/bin/env node

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { format } from "prettier";
import { discoverPages } from "./pages.js";
import { scrapeAllPages } from "./crawler.js";
import { convertAllPages } from "./converter.js";
import { scrapeReference } from "./reference-crawler.js";
import { convertAllReferenceEntries } from "./reference-converter.js";

const DOCS_OUTPUT_DIR = process.cwd();

async function main() {
  const command = process.argv[2] || "scrape";

  if (command === "scrape") {
    await scrape();
  } else if (command === "reference") {
    await reference();
  } else {
    console.log("Usage: pine-docs <command>");
    console.log("  scrape     Crawl the Pine Script v6 User Manual");
    console.log("  reference  Crawl the Pine Script v6 Language Reference");
    process.exit(1);
  }
}

async function scrape() {
  console.log("Pine Script v6 Documentation Scraper\n");

  // Launch browser
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Discover all pages
    console.log("\n[1/3] Discovering pages...");
    const pages = await discoverPages(page);

    if (pages.length === 0) {
      console.error("No pages discovered. The site structure may have changed.");
      process.exitCode = 1;
      return;
    }

    // Step 2: Scrape all pages
    console.log(`\n[2/3] Scraping ${pages.length} pages...`);
    const scrapedPages = await scrapeAllPages(page, pages);
    console.log(`  Successfully scraped ${scrapedPages.length} pages`);

    // Step 3: Convert to Markdown
    console.log(`\n[3/3] Converting to Markdown...`);
    const convertedPages = await convertAllPages(scrapedPages);

    // Format and write output files
    console.log(`\nFormatting and writing ${convertedPages.length} files...`);
    for (const converted of convertedPages) {
      const filePath = join(DOCS_OUTPUT_DIR, converted.outputPath);
      await mkdir(dirname(filePath), { recursive: true });
      const formatted = await format(converted.markdown, {
        parser: "markdown",
        proseWrap: "preserve",
      });
      await writeFile(filePath, formatted, "utf-8");
      console.log(`  Wrote: ${converted.outputPath}`);
    }

    // Build combined full-docs.md
    console.log("  Writing full-docs.md...");
    const fullDocsPath = join(DOCS_OUTPUT_DIR, "pine-script-docs/full-docs.md");
    const fullMarkdown = buildFullDocs(convertedPages);
    const formattedFull = await format(fullMarkdown, {
      parser: "markdown",
      proseWrap: "preserve",
    });
    await writeFile(fullDocsPath, formattedFull, "utf-8");

    console.log(
      `\nDone! ${convertedPages.length} files + full-docs.md written to pine-script-docs/`,
    );
  } finally {
    await browser.close();
  }
}

async function reference() {
  console.log("Pine Script v6 Language Reference Scraper\n");

  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Scrape the reference page (single page with all entries)
    console.log("\n[1/2] Scraping reference entries...");
    const entries = await scrapeReference(page);

    if (entries.length === 0) {
      console.error(
        "No entries found. The site structure may have changed.",
      );
      process.exitCode = 1;
      return;
    }

    // Step 2: Convert to Markdown
    console.log(`\n[2/2] Converting ${entries.length} entries to Markdown...`);
    const convertedEntries = await convertAllReferenceEntries(entries);

    // Format and write output files
    console.log(`\nFormatting and writing ${convertedEntries.length} files...`);
    let lastCategory = "";
    for (const converted of convertedEntries) {
      const category = converted.info.section || "";
      if (category !== lastCategory) {
        console.log(`  Writing ${category}...`);
        lastCategory = category;
      }
      const filePath = join(DOCS_OUTPUT_DIR, converted.outputPath);
      await mkdir(dirname(filePath), { recursive: true });
      const formatted = await format(converted.markdown, {
        parser: "markdown",
        proseWrap: "preserve",
      });
      await writeFile(filePath, formatted, "utf-8");
    }

    // Build combined full-reference.md
    console.log("  Writing full-reference.md...");
    const fullRefPath = join(DOCS_OUTPUT_DIR, "pine-script-reference/full-reference.md");
    const fullMarkdown = buildFullReference(convertedEntries);
    const formattedFull = await format(fullMarkdown, {
      parser: "markdown",
      proseWrap: "preserve",
    });
    await writeFile(fullRefPath, formattedFull, "utf-8");

    console.log(
      `\nDone! ${convertedEntries.length} files + full-reference.md written to pine-script-reference/`,
    );
  } finally {
    await browser.close();
  }
}

import type { ConvertedPage } from "./types.js";

/**
 * Formats a section slug (e.g. "migration-guides") into a display title.
 */
function formatSectionTitle(section: string): string {
  const ACRONYMS = new Set(["faq"]);
  return section
    .split("-")
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/**
 * Builds a single combined Markdown file from all User Manual pages.
 * Downgrades headings (h1→h3, h2→h4, h3→h5) and groups pages under h2 section headers.
 */
function buildFullDocs(pages: ConvertedPage[]): string {
  const frontmatter = [
    "---",
    'title: "Pine Script v6 User Manual"',
    'source: "https://www.tradingview.com/pine-script-docs/"',
    "---",
  ].join("\n");

  const sections: string[] = [];
  let currentSection = "";

  for (const page of pages) {
    const section = page.info.section || "";
    if (section !== currentSection) {
      if (section) {
        const sectionTitle = formatSectionTitle(section);
        sections.push(`## ${sectionTitle}`);
      }
      currentSection = section;
    }

    // Strip per-page frontmatter and downshift headings by 2 levels
    const body = page.markdown
      .replace(/^---[\s\S]*?---\n*/, "")
      .replace(/^##### /gm, "###### ")
      .replace(/^#### /gm, "##### ")
      .replace(/^### /gm, "#### ")
      .replace(/^## /gm, "#### ")
      .replace(/^# /gm, "### ")
      .trim();

    sections.push(body);
  }

  return `${frontmatter}\n\n# Pine Script v6 User Manual\n\n${sections.join("\n\n---\n\n")}\n`;
}

/**
 * Builds a single combined Markdown file from all converted reference entries.
 * Downgrades headings (h1→h3, h2→h4) and groups entries under h2 category headers.
 */
function buildFullReference(entries: ConvertedPage[]): string {
  const frontmatter = [
    "---",
    'title: "Pine Script v6 Language Reference Manual"',
    'source: "https://www.tradingview.com/pine-script-reference/v6/"',
    "---",
  ].join("\n");

  const sections: string[] = [];
  let currentCategory = "";

  for (const entry of entries) {
    const category = entry.info.section || "";
    if (category !== currentCategory) {
      sections.push(`## ${category}`);
      currentCategory = category;
    }

    // Strip the per-entry frontmatter and downshift headings
    const body = entry.markdown
      .replace(/^---[\s\S]*?---\n*/, "")
      .replace(/^#### /gm, "##### ")
      .replace(/^### /gm, "#### ")
      .replace(/^## /gm, "#### ")
      .replace(/^# /gm, "### ")
      .trim();

    sections.push(body);
  }

  return `${frontmatter}\n\n# Pine Script v6 Language Reference Manual\n\n${sections.join("\n\n---\n\n")}\n`;
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
