/**
 * A module for expanding shortened URLs to their full form.
 * @module expand_url
 */

import type { ExpandedUrl } from "./types.ts";

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

/**
 * Parses URL query parameters into a key-value object
 *
 * @param {URLSearchParams} searchParams - The URLSearchParams object containing the query parameters
 * @returns {Record<string, string>} An object where keys are parameter names and values are parameter values
 *
 * @example
 * const url = new URL('https://example.com?foo=bar&baz=qux');
 * const params = parseQueryParams(url.searchParams);
 * // Result: { foo: 'bar', baz: 'qux' }
 */
function parseQueryParams(
  searchParams: URLSearchParams,
): Record<string, string> {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * Expands a URL and returns detailed information about its components.
 * This function follows redirects and provides parsed URL components for easier manipulation.
 *
 * @param url - The URL to expand. Must be a valid URL string including the protocol
 * @returns A promise that resolves to an ExpandedUrl object containing parsed URL components
 * @throws {Error} If the URL is invalid or if there's a network error
 *
 * @example
 * ```ts
 * try {
 *   const details = await expandUrlWithDetails("https://bit.ly/example?key=value#section");
 *   console.log(details.fullUrl); // https://example.com/full/path?key=value#section
 *   console.log(details.queryParams); // { key: "value" }
 *   console.log(details.hash); // "section"
 * } catch (error) {
 *   console.error("Failed to expand URL:", error.message);
 * }
 * ```
 */
export async function expandUrlWithDetails(url: string): Promise<ExpandedUrl> {
  // Parse the original URL first to preserve query params and hash
  const originalUrl = new URL(url);
  const queryParams = parseQueryParams(originalUrl.searchParams);
  const hash = originalUrl.hash.replace(/^#/, "");

  // Get the expanded base URL
  const expandedUrl = await expandUrl(url);
  const expandedParsedUrl = new URL(expandedUrl);

  // Reconstruct the full URL with original query params and hash
  const searchString = new URLSearchParams(queryParams).toString();
  const fullUrl = expandedUrl +
    (searchString ? `?${searchString}` : "") +
    (hash ? `#${hash}` : "");

  return {
    fullUrl,
    protocol: expandedParsedUrl.protocol,
    hostname: expandedParsedUrl.hostname,
    pathname: expandedParsedUrl.pathname,
    queryParams,
    hash,
    port: expandedParsedUrl.port,
  };
}
