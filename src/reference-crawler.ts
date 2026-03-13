import type { Page } from "playwright";
import type { ReferenceEntry } from "./types.js";

const REFERENCE_URL = "https://www.tradingview.com/pine-script-reference/v6/";

/**
 * Scrapes all reference entries from the Pine Script Language Reference Manual.
 * This is a single-page site with 941 entries rendered in the DOM.
 */
export async function scrapeReference(page: Page): Promise<ReferenceEntry[]> {
  console.log(`  Navigating to ${REFERENCE_URL}`);
  await page.goto(REFERENCE_URL, { waitUntil: "domcontentloaded" });

  // Wait for the content container to load
  await page.waitForSelector(".js-content", {
    state: "attached",
    timeout: 30000,
  });

  console.log("  Extracting reference entries...");

  const entries: ReferenceEntry[] = await page.evaluate(() => {
    const content = document.querySelector(
      ".tv-script-reference__content-container.js-content",
    );
    if (!content) return [];

    const results: {
      id: string;
      name: string;
      category: string;
      html: string;
    }[] = [];
    let currentCategory = "";

    /**
     * Extracts plain text from a code element, converting <br> to newlines
     * and decoding &nbsp; to regular spaces.
     */
    function extractCodeText(code: Element): string {
      let text = "";
      function walk(node: Node) {
        if (node.nodeName === "BR") {
          text += "\n";
        } else if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent;
        } else {
          node.childNodes.forEach(walk);
        }
      }
      walk(code);
      // Replace non-breaking spaces with regular spaces
      return text.replace(/\u00A0/g, " ");
    }

    for (const child of Array.from(content.children)) {
      // H2 elements are category headers (Variables, Constants, etc.)
      if (child.tagName === "H2") {
        currentCategory = child.textContent?.trim() || "";
        continue;
      }

      // Wrapper div containing entries for this category
      const items = child.querySelectorAll(".tv-pine-reference-item");
      for (const entry of Array.from(items)) {
        const id = entry.id;
        const contentEl = entry.querySelector(
          ".tv-pine-reference-item__content",
        );
        if (!contentEl) continue;

        const clone = contentEl.cloneNode(true) as HTMLElement;

        // Remove unwanted elements
        clone
          .querySelectorAll("svg, button, .tv-pine-reference-item__button")
          .forEach((el) => el.remove());

        // Replace the header wrapper with a clean h1
        const headerWrapper = clone.querySelector(
          ".tv-pine-reference-item__header-wrapper",
        );
        const name =
          headerWrapper
            ?.querySelector("h3.tv-pine-reference-item__header")
            ?.textContent?.trim() || "";
        if (headerWrapper) {
          const h1 = document.createElement("h1");
          h1.textContent = name;
          headerWrapper.replaceWith(h1);
        }

        // Convert sub-headers to h2
        clone
          .querySelectorAll(".tv-pine-reference-item__sub-header")
          .forEach((subHeader) => {
            const h2 = document.createElement("h2");
            const span = subHeader.querySelector("span");
            h2.textContent =
              span?.textContent?.trim() ||
              subHeader.textContent?.trim() ||
              "";
            subHeader.replaceWith(h2);
          });

        // Make argument type spans bold (trim trailing space from inside the
        // span and add it as a separate text node so remark-stringify doesn't
        // produce invalid bold markers that Prettier escapes to HTML entities)
        clone
          .querySelectorAll(".tv-pine-reference-item__arg-type")
          .forEach((argType) => {
            const strong = document.createElement("strong");
            strong.textContent = (argType.textContent || "").trim();
            argType.replaceWith(strong, document.createTextNode(" "));
          });

        // Convert "See also" section to a bullet list
        clone
          .querySelectorAll(".tv-pine-reference-item__see-also")
          .forEach((seeAlso) => {
            const links = Array.from(seeAlso.querySelectorAll("a"));
            const ul = document.createElement("ul");
            links.forEach((link) => {
              const li = document.createElement("li");
              li.appendChild(link.cloneNode(true));
              ul.appendChild(li);
            });
            seeAlso.replaceWith(ul);
          });

        // Fix code blocks: convert <br> to newlines, strip syntax spans
        clone
          .querySelectorAll("pre.tv-pine-reference-item__example code")
          .forEach((code) => {
            const text = extractCodeText(code);
            code.textContent = text;
            code.className = "language-pine";
          });

        results.push({
          id,
          name,
          category: currentCategory,
          html: clone.innerHTML,
        });
      }
    }

    return results;
  });

  console.log(`  Extracted ${entries.length} reference entries`);
  return entries;
}

export { REFERENCE_URL };
