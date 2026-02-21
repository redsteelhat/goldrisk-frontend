/**
 * GoldRisk AI — Zod validation schemas
 * Used for form validation and API response parsing.
 */

import { z } from 'zod';

/** Login form */
export const loginSchema = z.object({
  email: z.string().email('Geçerli e-posta girin'),
  password: z.string().min(1, 'Şifre gerekli'),
});

/** Gram string (backend NUMERIC) */
export const gramStringSchema = z.string().regex(/^-?\d+(\.\d+)?$/, 'Geçerli gram değeri girin');

/** Money string (backend NUMERIC) */
export const moneyStringSchema = z.string().regex(/^-?\d+(\.\d+)?$/, 'Geçerli para değeri girin');

/** Date YYYY-MM-DD */
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export type LoginInput = z.infer<typeof loginSchema>;
