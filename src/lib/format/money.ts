/**
 * GoldRisk AI — TRY/para formatlama
 * Backend NUMERIC string → display only. No float math.
 */

import Decimal from 'decimal.js';

/**
 * Format MoneyString (backend NUMERIC) for display
 */
export function formatMoney(
  value: string,
  options?: { decimals?: number; currency?: string }
): string {
  const decimals = options?.decimals ?? 2;
  const currency = options?.currency ?? 'TRY';
  try {
    const d = new Decimal(value);
    const formatted = d.toFixed(decimals);
    return `${formatted} ${currency}`;
  } catch {
    return `— ${currency}`;
  }
}

/**
 * Format for compact display (e.g. tables)
 */
export function formatMoneyShort(value: string, decimals = 2): string {
  try {
    return new Decimal(value).toFixed(decimals);
  } catch {
    return '—';
  }
}
