# @varandas/expand-url

[![JSR Version](https://jsr.io/badges/@varandas/expand-url)](https://jsr.io/@varandas/expand-url)
[![Build Status](https://github.com/AndreVarandas/expand_url/actions/workflows/test.yml/badge.svg)](https://github.com/AndreVarandas/expand_url/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deno](https://shield.deno.dev/deno/^2.0.4)](https://deno.land)

A Deno library for expanding shortened URLs to their full form. This library
provides a simple and efficient way to resolve shortened URLs to their final
destination.

## Features

- Expands shortened URLs to their full form
- Follows all redirects to get the final destination
- Efficient HEAD requests (doesn't download response bodies)
- Full TypeScript support
- Proper error handling for invalid URLs and network issues

## Installation

```ts
import { expandUrl } from "jsr:@varandas/expand-url";
```

## Usage

```ts
import { expandUrl } from "jsr:@varandas/expand-url";

try {
  const fullUrl = await expandUrl("https://bit.ly/example");
  console.log(fullUrl); // https://example.com/very/long/url
} catch (error) {
  console.error("Failed to expand URL:", error.message);
}
```

Check out the [examples](./examples) directory for more usage examples.

## API

### `expandUrl(url: string): Promise<string>`

Expands a URL by following any redirects to get the final destination URL.

#### Parameters

- `url` (string): The URL to expand

#### Returns

- `Promise<string>`: The expanded (final destination) URL

#### Throws

- `Error`: If the URL is invalid or if there's an error following redirects

## Development

```bash
# Run tests
deno task test

# Type checking
deno task check

# Development mode (watch for changes)
deno task dev

# Run example
deno task example
```

## Project Structure

```
.
├── src/           # Source code
├── test/          # Test files
├── examples/      # Example usage
├── mod.ts         # Main entry point
└── deno.json      # Project configuration
```

## License

MIT
