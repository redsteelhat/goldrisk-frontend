/**
 * GoldRisk AI — Timezone-safe tarih formatlama
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TZ = 'Europe/Istanbul';

/**
 * Format ISO string for display (locale-aware)
 */
export function formatDate(value: string | Date, format = 'DD.MM.YYYY'): string {
  return dayjs(value).tz(DEFAULT_TZ).format(format);
}

/**
 * Format for API (YYYY-MM-DD)
 */
export function toApiDate(value: string | Date): string {
  return dayjs(value).tz(DEFAULT_TZ).format('YYYY-MM-DD');
}

/**
 * Format date + time
 */
export function formatDateTime(value: string | Date, format = 'DD.MM.YYYY HH:mm'): string {
  return dayjs(value).tz(DEFAULT_TZ).format(format);
}
