/**
 * A Deno library for expanding shortened URLs to their full form.
 *
 * This library provides a simple and efficient way to resolve shortened URLs
 * to their final destination by following redirects. It can return either just
 * the expanded URL or detailed information including parsed components.
 *
 * @module
 *
 * @example
 * ```ts
 * import { expandUrl, expandUrlWithDetails } from "@varandas/expand-url";
 *
 * // Basic usage
 * try {
 *   const fullUrl = await expandUrl("https://bit.ly/example");
 *   console.log(fullUrl); // https://example.com/very/long/url
 * } catch (error) {
 *   console.error("Failed to expand URL:", error.message);
 * }
 *
 * // Get detailed URL information
 * try {
 *   const details = await expandUrlWithDetails("https://bit.ly/example?key=value#section");
 *   console.log(details.fullUrl); // https://example.com/very/long/url?key=value#section
 *   console.log(details.queryParams); // { key: "value" }
 *   console.log(details.hash); // "section"
 * } catch (error) {
 *   console.error("Failed to expand URL:", error.message);
 * }
 * ```
 *
 * @see {@link https://github.com/andrevarandas/expand-url GitHub Repository}
 * @see {@link https://jsr.io/@varandas/expand-url JSR Package}
 */

export type { ExpandedUrl } from "./src/types.ts";
export { expandUrl, expandUrlWithDetails } from "./src/expand_url.ts";
