/**
 * Date utilities for activity grid calendar
 */

export interface GridCell {
  date: string; // YYYY-MM-DD
  hasLog: boolean;
  isToday: boolean;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
}

/**
 * Format date to YYYY-MM-DD string
 */
export function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get number of weeks for a time range
 */
export function getWeeksInRange(timeRange: 'week' | 'month' | 'quarter'): number {
  switch (timeRange) {
    case 'week':
      return 1;
    case 'month':
      return 5;
    case 'quarter':
      return 13;
    default:
      return 5;
  }
}

/**
 * Generate grid data with 7 columns (days) and N rows (weeks)
 * Returns a flat array of cells ordered row by row (week by week)
 * Each row has 7 cells (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
 */
export function generateActivityGrid(
  logs: string[],
  timeRange: 'week' | 'month' | 'quarter'
): GridCell[] {
  const logSet = new Set(logs);
  const today = new Date();
  const todayKey = getDateKey(today);
  const numWeeks = getWeeksInRange(timeRange);

  // Calculate start date - go back enough weeks and align to Sunday
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - ((numWeeks - 1) * 7));
  // Align to Sunday of that week
  const startDayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDayOfWeek);

  // Generate cells row by row (week by week)
  const cells: GridCell[] = [];

  for (let week = 0; week < numWeeks; week++) {
    for (let day = 0; day < 7; day++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + (week * 7) + day);

      const dateKey = getDateKey(cellDate);
      const isFuture = cellDate > today;

      cells.push({
        date: dateKey,
        hasLog: isFuture ? false : logSet.has(dateKey),
        isToday: dateKey === todayKey,
        dayOfWeek: day
      });
    }
  }

  return cells;
}

/**
 * Get day labels for the grid header
 */
export function getDayLabels(): string[] {
  return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
}
