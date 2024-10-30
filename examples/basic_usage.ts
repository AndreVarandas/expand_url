/**
 * Basic example demonstrating how to use the expand-url library.
 * This example shows how to expand a shortened URL and handle potential errors.
 * It demonstrates both basic URL expansion and detailed URL parsing.
 *
 * @example
 * To run this example:
 * ```bash
 * deno task example
 * ```
 */

import { expandUrl, expandUrlWithDetails } from "../mod.ts";

/**
 * Demonstrates basic URL expansion using GitHub's URL shortener service.
 */
async function basicExample() {
  try {
    // GitHub's URL shortener
    const shortUrl = "https://git.io/typing-svg";
    console.log("\nBasic URL Expansion:");
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

/**
 * Demonstrates detailed URL expansion with parsed components.
 */
async function detailedExample() {
  try {
    // Example URL with query parameters and hash
    const shortUrl = "https://git.io/typing-svg?theme=dark#preview";
    console.log("\nDetailed URL Expansion:");
    console.log(`Expanding URL with details: ${shortUrl}`);

    const details = await expandUrlWithDetails(shortUrl);

    // Log all the parsed components
    console.log("\nParsed URL Components:");
    console.log(`Full URL: ${details.fullUrl}`);
    console.log(`Protocol: ${details.protocol}`);
    console.log(`Hostname: ${details.hostname}`);
    console.log(`Pathname: ${details.pathname}`);
    console.log(`Query Parameters:`, details.queryParams);
    console.log(`Hash Fragment: ${details.hash}`);

    // Example of working with query parameters
    if (Object.keys(details.queryParams).length > 0) {
      console.log("\nAccessing Query Parameters:");
      for (const [key, value] of Object.entries(details.queryParams)) {
        console.log(`${key}: ${value}`);
      }
    }
  } catch (error: unknown) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error),
    );
  }
}

if (import.meta.main) {
  // Run both examples
  await basicExample();
  await detailedExample();
}
