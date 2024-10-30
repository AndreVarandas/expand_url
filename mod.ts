/**
 * A Deno library for expanding shortened URLs to their full form.
 *
 * This library provides a simple and efficient way to resolve shortened URLs
 * to their final destination by following redirects.
 *
 * @module
 *
 * @example
 * ```ts
 * import { expandUrl } from "@varandas/expand-url";
 *
 * try {
 *   const fullUrl = await expandUrl("https://bit.ly/example");
 *   console.log(fullUrl); // https://example.com/very/long/url
 * } catch (error) {
 *   console.error("Failed to expand URL:", error.message);
 * }
 * ```
 *
 * @see {@link https://github.com/andrevarandas/expand-url GitHub Repository}
 * @see {@link https://jsr.io/@varandas/expand-url JSR Package}
 */

export { expandUrl } from "./src/expand_url.ts";
