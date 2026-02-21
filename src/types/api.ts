/**
 * GoldRisk AI / Synorq — API types
 * Backend NUMERIC fields arrive as string; FE only formats, never computes.
 */

/** Backend NUMERIC → FE display only (gram) */
export type GramString = string;

/** Backend NUMERIC → FE display only (TRY) */
export type MoneyString = string;

/** API error shape (FTDD §5.2) */
export interface ApiError {
  code: 'VALIDATION_ERROR' | 'RBAC_DENIED' | 'CONFLICT' | 'RATE_LIMIT' | string;
  message: string;
  details?: unknown;
  traceId?: string;
}

/** Auth response */
export interface AuthResponse {
  accessToken: string;
  user: { id: string; email: string; role: string };
  branch?: { id: string; name: string };
}

/** Daily metrics (GET /metrics/daily) */
export interface DailyMetrics {
  profitTry: MoneyString;
  exposureGram: GramString;
  exposureTry: MoneyString;
  deltas?: Record<string, string>;
  breakdown?: {
    salesTotal?: MoneyString;
    purchasesTotal?: MoneyString;
    laborTotal?: MoneyString;
    fireCost?: MoneyString;
    returnEffect?: MoneyString;
  };
}

/** Transaction (list item) */
export interface Transaction {
  id: string;
  created_at: string;
  type: string;
  quantity_g: GramString;
  unit_price_g: MoneyString;
  total_amount: MoneyString;
  daily_price_id?: string;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
