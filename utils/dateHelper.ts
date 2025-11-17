/**
 * Returns a date string in "DD-MM-YYYY" format
 * @param daysFromToday Number of days to add to today (can be negative)
 */
export function getDateFromToday(daysFromToday: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
