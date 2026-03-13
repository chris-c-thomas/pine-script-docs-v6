#!/usr/bin/env node

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { discoverPages } from "./pages.js";
import { scrapeAllPages } from "./crawler.js";
import { convertAllPages } from "./converter.js";

const DOCS_OUTPUT_DIR = process.cwd();

async function main() {
  const command = process.argv[2] || "scrape";

  if (command === "scrape") {
    await scrape();
  } else {
    console.log("Usage: pine-docs scrape");
    console.log("  scrape  Crawl the Pine Script v6 docs and save as Markdown");
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

    // Write output files
    console.log(`\nWriting ${convertedPages.length} files...`);
    for (const converted of convertedPages) {
      const filePath = join(DOCS_OUTPUT_DIR, converted.outputPath);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, converted.markdown, "utf-8");
      console.log(`  Wrote: ${converted.outputPath}`);
    }

    console.log(`\nDone! ${convertedPages.length} files written to ${DOCS_OUTPUT_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
