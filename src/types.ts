export interface PageInfo {
  /** URL path relative to site root, e.g. /pine-script-docs/welcome */
  path: string;
  /** Page title extracted from sidebar or page heading */
  title: string;
  /** Section the page belongs to, e.g. "primer", "language" */
  section?: string;
}

export interface ScrapedPage {
  /** The page info */
  info: PageInfo;
  /** Raw HTML content from the main content area */
  html: string;
}

export interface ConvertedPage {
  /** The page info */
  info: PageInfo;
  /** Converted Markdown content */
  markdown: string;
  /** Output file path relative to docs root */
  outputPath: string;
}
