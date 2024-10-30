/**
 * A module for expanding shortened URLs to their full form.
 * @module expand_url
 */

/**
 * Expands a URL by following any redirects to get the final destination URL.
 * This function makes a HEAD request to efficiently follow redirects without downloading response bodies.
 *
 * @param url - The URL to expand. Must be a valid URL string including the protocol (e.g., "https://bit.ly/example")
 * @returns A promise that resolves to the expanded (final destination) URL
 * @throws {Error} If the URL is invalid (e.g., malformed URL, missing protocol)
 * @throws {Error} If there's a network error or the server is unreachable
 *
 * @example
 * ```ts
 * try {
 *   const expandedUrl = await expandUrl("https://bit.ly/example");
 *   console.log(expandedUrl); // https://example.com/full/path
 * } catch (error) {
 *   console.error("Failed to expand URL:", error.message);
 * }
 * ```
 */
export async function expandUrl(url: string): Promise<string> {
  try {
    // Validate URL
    new URL(url);

    // Make request and follow redirects
    const response = await fetch(url, {
      redirect: "follow",
      method: "HEAD", // We only need headers, not the body
    });

    // Return the final URL after following all redirects
    return response.url;
  } catch (error: unknown) {
    if (error instanceof TypeError && error.message.includes("Invalid URL")) {
      throw new Error(`Invalid URL: ${url}`);
    }
    throw new Error(
      `Failed to expand URL: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}
