/**
 * GoldRisk AI / Synorq — Typed HTTP client
 * Uses Axios with base URL from env, auth header injection, traceId capture.
 */

import axios, { type AxiosError } from 'axios';
import type { ApiError } from '@/types/api';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.synorq.com';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor: inject auth + branch headers (Phase 1)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('accessToken');
    const branchId = sessionStorage.getItem('activeBranchId');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (branchId) config.headers['X-Branch-Id'] = branchId;
  }
  return config;
});

// Response interceptor: normalize errors, capture traceId
apiClient.interceptors.response.use(
  (res) => res,
  (err: AxiosError<ApiError>) => {
    const apiError = err.response?.data;
    if (apiError?.traceId) {
      (err as AxiosError & { traceId?: string }).traceId = apiError.traceId;
    }
    return Promise.reject(err);
  }
);

export function getTraceId(err: unknown): string | undefined {
  return (err as { traceId?: string })?.traceId;
}
