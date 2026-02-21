/**
 * GoldRisk AI — RBAC (FTDD §4.2)
 * owner, manager, cashier, auditor
 */

export type Role = 'owner' | 'manager' | 'cashier' | 'auditor';

export const ROLES: Record<Role, string> = {
  owner: 'Sahip',
  manager: 'Yönetici',
  cashier: 'Kasiyer',
  auditor: 'Denetçi',
};

/** Can switch branch (owner/HQ only; cashier = single branch) */
export function canSwitchBranch(role: Role): boolean {
  return role === 'owner' || role === 'manager';
}

/** Can access audit viewer */
export function canViewAudit(role: Role): boolean {
  return role === 'owner' || role === 'auditor';
}

/** Can import data */
export function canImport(role: Role): boolean {
  return role !== 'auditor';
}
