/**
 * GoldRisk AI — Gram formatlama
 * Backend NUMERIC string → display only. No float math.
 */

import Decimal from 'decimal.js';

/**
 * Format GramString (backend NUMERIC) for display
 */
export function formatGram(value: string, options?: { decimals?: number; unit?: string }): string {
  const decimals = options?.decimals ?? 3;
  const unit = options?.unit ?? 'g';
  try {
    const d = new Decimal(value);
    const formatted = d.toFixed(decimals);
    return `${formatted} ${unit}`;
  } catch {
    return `— ${unit}`;
  }
}

/**
 * Format for compact display (e.g. tables)
 */
export function formatGramShort(value: string, decimals = 3): string {
  try {
    return new Decimal(value).toFixed(decimals);
  } catch {
    return '—';
  }
}
