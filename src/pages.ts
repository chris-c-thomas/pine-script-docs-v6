import type { Page } from "playwright";
import type { PageInfo } from "./types.js";

const BASE_URL = "https://www.tradingview.com";
const DOCS_ROOT = "/pine-script-docs";

/**
 * Discovers all documentation page URLs by reading the sidebar navigation.
 * Navigates to the welcome page and extracts all links from the sidebar.
 */
export async function discoverPages(page: Page): Promise<PageInfo[]> {
  await page.goto(`${BASE_URL}${DOCS_ROOT}/welcome`, {
    waitUntil: "domcontentloaded",
  });

  // Wait for sidebar links to be present in the DOM
  await page.waitForSelector('[aria-label="Docs sidebar"] a.page-link', {
    state: "attached",
  });

  // Extract all page links from the sidebar
  const pages = await page.evaluate((docsRoot: string) => {
    // Get all sidebar page links across any matching sidebar elements
    const links = document.querySelectorAll('[aria-label="Docs sidebar"] a.page-link');
    const results: { path: string; title: string; section?: string }[] = [];

    links.forEach((link) => {
      const href = link.getAttribute("href");
      const title = link.textContent?.trim() || "";
      if (!href || !href.startsWith(docsRoot)) return;

      // Normalize: strip trailing slashes (except the root itself)
      const normalizedPath =
        href.endsWith("/") && href !== docsRoot + "/"
          ? href.replace(/\/+$/, "")
          : href.replace(/\/+$/, "");

      // Determine section from normalized path
      const pathAfterRoot = normalizedPath.replace(docsRoot + "/", "");
      const section = pathAfterRoot.includes("/")
        ? pathAfterRoot.split("/")[0]
        : undefined;

      results.push({ path: normalizedPath, title, section });
    });

    // Deduplicate by path (there may be multiple sidebars: mobile + desktop)
    const seen = new Set<string>();
    return results.filter((r) => {
      if (seen.has(r.path)) return false;
      seen.add(r.path);
      return true;
    });
  }, DOCS_ROOT);

  console.log(`Discovered ${pages.length} documentation pages`);
  return pages;
}

export { BASE_URL, DOCS_ROOT };
