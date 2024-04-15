/**
 * Wrappers around the logging APIs. This allows them to be
 * easily disabled in a production build, and mapped to a middleware
 * specific implementation if present
 */

export function log(...args) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

export function errorLog(...args) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}
