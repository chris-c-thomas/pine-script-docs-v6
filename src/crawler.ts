import type { Page } from "playwright";
import type { PageInfo, ScrapedPage } from "./types.js";
import { BASE_URL } from "./pages.js";

/**
 * Scrapes the main content HTML from a single documentation page.
 * Strips sidebar, header, footer, breadcrumbs, and navigation elements.
 */
export async function scrapePage(
  page: Page,
  pageInfo: PageInfo,
): Promise<ScrapedPage> {
  const url = `${BASE_URL}${pageInfo.path}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Wait for the content container to load
  await page.waitForSelector("#slot-container", {
    state: "attached",
    timeout: 15000,
  });

  // Extract the main content HTML, cleaning out navigation artifacts
  const html = await page.evaluate(() => {
    const container = document.querySelector("#slot-container");
    if (!container) return "";

    // Clone so we don't modify the live DOM
    const clone = container.cloneNode(true) as HTMLElement;

    // Remove elements we don't want in the output
    const selectorsToRemove = [
      ".icon-link",           // Heading anchor link icons
      "[data-pagefind-ignore]", // Search/pagefind elements
      "svg",                  // SVG icons within headings
      ".copy-button",         // Copy buttons on code blocks
      ".copy-button-wrapper", // Copy button wrappers
      "button",               // Any remaining buttons (copy, etc.)
      ".code-title",          // Code block title bars
    ];

    selectorsToRemove.forEach((selector) => {
      clone.querySelectorAll(selector).forEach((el) => el.remove());
    });

    // Add language class to code blocks for proper fencing
    clone.querySelectorAll("pre > code").forEach((code) => {
      const pre = code.parentElement;
      if (pre) {
        // Check if the code block contains Pine Script code
        const text = code.textContent || "";
        if (text.includes("//@version=")) {
          code.setAttribute("data-language", "pine");
          pre.setAttribute("data-language", "pine");
        }
      }
    });

    // Handle note/tip/warning callout containers
    clone.querySelectorAll(".aside, .callout, [role='note']").forEach((aside) => {
      const type = aside.getAttribute("data-type") || aside.className.match(/\b(note|tip|warning|caution|important)\b/i)?.[1] || "Note";
      const label = document.createElement("strong");
      label.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      aside.insertBefore(label, aside.firstChild);
      aside.insertBefore(document.createElement("br"), label.nextSibling);
    });

    return clone.innerHTML;
  });

  return { info: pageInfo, html };
}

/**
 * Scrapes all pages sequentially with a delay to be respectful to the server.
 */
export async function scrapeAllPages(
  page: Page,
  pages: PageInfo[],
  delayMs = 500,
): Promise<ScrapedPage[]> {
  const results: ScrapedPage[] = [];

  for (let i = 0; i < pages.length; i++) {
    const pageInfo = pages[i];
    console.log(
      `  [${i + 1}/${pages.length}] Scraping: ${pageInfo.title} (${pageInfo.path})`,
    );

    try {
      const scraped = await scrapePage(page, pageInfo);
      results.push(scraped);
    } catch (err) {
      console.error(`  Failed to scrape ${pageInfo.path}: ${err}`);
    }

    // Delay between requests
    if (i < pages.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
