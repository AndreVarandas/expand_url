/**
 * Basic example demonstrating how to use the expand-url library.
 * This example shows how to expand a shortened URL and handle potential errors.
 *
 * @example
 * To run this example:
 * ```bash
 * deno task example
 * ```
 */

import { expandUrl } from "../mod.ts";

/**
 * Demonstrates expanding a shortened URL from GitHub's URL shortener service.
 * Includes proper error handling and logging.
 */
async function main() {
  try {
    // GitHub's URL shortener
    const shortUrl = "https://git.io/typing-svg";
    console.log(`Expanding URL: ${shortUrl}`);

    const expandedUrl = await expandUrl(shortUrl);
    console.log(`Expanded URL: ${expandedUrl}`);
  } catch (error: unknown) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error),
    );
  }
}

if (import.meta.main) {
  main();
}
