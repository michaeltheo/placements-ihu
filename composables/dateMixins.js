export const thisYear = new Date().getFullYear();

/**
 * Checks if a given date is within the specified range.
 *
 * @param {Date | string} dateFrom - The start date of the range.
 * @param {Date | string} dateTo - The end date of the range.
 * @param {Date | string} createdAt - The date to check.
 * @returns {boolean} - Returns true if the createdAt is within the range, false otherwise.
 */
export function isDateWithinRange(dateFrom, dateTo, createdAt) {
  return (
    (!dateFrom || new Date(createdAt) >= new Date(dateFrom)) &&
    (!dateTo || new Date(createdAt) <= new Date(dateTo))
  );
}
