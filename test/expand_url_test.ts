/**
 * Test suite for the expand-url library.
 * Tests various scenarios including successful URL expansion and error cases.
 *
 * @module expand_url_test
 */

import { assert, assertEquals, assertRejects } from "@std/assert";
import { expandUrl } from "../src/expand_url.ts";

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
