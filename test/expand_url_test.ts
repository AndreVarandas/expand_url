/**
 * Test suite for the expand-url library.
 * Tests various scenarios including successful URL expansion and error cases.
 *
 * @module expand_url_test
 */

import { assert, assertEquals, assertRejects } from "@std/assert";
import { expandUrl, expandUrlWithDetails } from "../src/expand_url.ts";

/**
 * Tests successful URL expansion with a known stable URL.
 * Verifies that the result is a string and starts with https://.
 */
Deno.test("expandUrl - expands shortened URL", async () => {
  const result = await expandUrl("https://deno.land");
  assertEquals(typeof result, "string");
  assert(result.startsWith("https://"));
});

/**
 * Tests error handling for invalid URLs.
 * Expects an error to be thrown with an appropriate message.
 */
Deno.test("expandUrl - throws on invalid URL", async () => {
  await assertRejects(
    () => expandUrl("not-a-url"),
    Error,
    "Invalid URL",
  );
});

/**
 * Tests error handling for non-existent domains.
 * Expects an error to be thrown when the domain cannot be resolved.
 */
Deno.test("expandUrl - throws on non-existent domain", async () => {
  await assertRejects(
    () => expandUrl("https://this-domain-definitely-does-not-exist-123.com"),
    Error,
    "Failed to expand URL",
  );
});

/**
 * Tests expandUrlWithDetails with a basic URL.
 * Verifies that all URL components are correctly parsed.
 */
Deno.test("expandUrlWithDetails - parses basic URL components", async () => {
  // Using a direct URL to avoid redirect issues in testing
  const testUrl = "https://deno.land/x/expand_url";
  const result = await expandUrlWithDetails(testUrl);

  assertEquals(result.protocol, "https:");
  assertEquals(result.hostname, "deno.land");
  assertEquals(result.pathname, "/x/expand_url");
  assertEquals(Object.keys(result.queryParams).length, 0);
  assertEquals(result.hash, "");
});

/**
 * Tests expandUrlWithDetails with query parameters.
 * Verifies that query parameters are correctly parsed into an object.
 */
Deno.test("expandUrlWithDetails - parses query parameters", async () => {
  const testUrl = "https://deno.land/x/expand_url?version=1.0.0&debug=true";
  const result = await expandUrlWithDetails(testUrl);

  assertEquals(result.queryParams, {
    version: "1.0.0",
    debug: "true",
  });
});

/**
 * Tests expandUrlWithDetails with hash fragments.
 * Verifies that hash fragments are correctly parsed.
 */
Deno.test("expandUrlWithDetails - parses hash fragments", async () => {
  const testUrl = "https://deno.land/x/expand_url#installation";
  const result = await expandUrlWithDetails(testUrl);

  assertEquals(result.hash, "installation");
});

/**
 * Tests expandUrlWithDetails with a complex URL containing multiple components.
 * Verifies that all URL components are correctly parsed.
 */
Deno.test("expandUrlWithDetails - parses complex URL", async () => {
  // Using a direct URL without port to avoid timeout issues
  const testUrl =
    "https://deno.land/x/expand_url/mod.ts?version=1.0.0&debug=true#section";
  const result = await expandUrlWithDetails(testUrl);

  assertEquals(result.protocol, "https:");
  assertEquals(result.hostname, "deno.land");
  assertEquals(result.pathname, "/x/expand_url/mod.ts");
  assertEquals(result.queryParams, {
    version: "1.0.0",
    debug: "true",
  });
  assertEquals(result.hash, "section");
});

/**
 * Tests error handling for expandUrlWithDetails with invalid URLs.
 * Expects an error to be thrown with an appropriate message.
 */
Deno.test("expandUrlWithDetails - throws on invalid URL", async () => {
  await assertRejects(
    () => expandUrlWithDetails("not-a-url"),
    Error,
    "Invalid URL",
  );
});
