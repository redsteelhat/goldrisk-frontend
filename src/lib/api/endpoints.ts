/**
 * GoldRisk AI / Synorq — Typed API endpoints (FTDD §5.1)
 * Backend may differ; FE adapter layer maps accordingly.
 */

export const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  prices: {
    latest: '/prices/latest',
    range: '/prices/range',
  },
  imports: {
    presign: '/imports/presign',
    upload: '/imports/upload',
    validate: '/imports/validate',
    commit: '/imports/commit',
    status: (id: string) => `/imports/${id}/status`,
  },
  metrics: {
    daily: '/metrics/daily',
  },
  alerts: '/alerts',
  transactions: '/transactions',
  transaction: (id: string) => `/transactions/${id}`,
  ledger: {
    balance: '/ledger/balance',
    entries: '/ledger/entries',
  },
  reports: {
    daily: '/reports/daily',
    download: (id: string) => `/reports/${id}/download`,
  },
  audit: '/audit',
} as const;
