/**
 * The function logs the given text to the console.
 * @param text - The `text` parameter is a string that represents the message or information that you
 * want to log.
 */

export function log(text) {
  // eslint-disable-next-line no-console
  console.log(text);
}

/**
 * The function `error` logs an error message along with additional information to the console.
 * @param text - The `text` parameter is a string that represents the error message. It is the main
 * information that will be displayed when the error is logged.
 * @param [additionalInfo] - An optional object that contains additional information about the error.
 * This information will be logged along with the error message.
 */
export function logError(text, additionalInfo = {}) {
  // eslint-disable-next-line no-console
  console.error(`Error: ${text}`, additionalInfo);
}
