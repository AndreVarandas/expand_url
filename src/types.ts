/**
 * Type representing parsed URL components
 */
export type ExpandedUrl = {
  /** The complete expanded URL */
  fullUrl: string;
  /** The URL protocol (e.g., 'https:') */
  protocol: string;
  /** The hostname (e.g., 'example.com') */
  hostname: string;
  /** The pathname (e.g., '/path/to/resource') */
  pathname: string;
  /** Parsed query parameters as key-value pairs */
  queryParams: Record<string, string>;
  /** The hash fragment without the # symbol */
  hash: string;
  /** The port number if specified, or empty string */
  port: string;
};
