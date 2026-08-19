/**
 * Utilidades para filtrar mocks por tenant.
 * En Supabase, el equivalente será `.eq('tenant_id', tenantId)` con RLS activo.
 */
export function filterByTenant<T extends { tenantId: string }>(
  items: readonly T[],
  tenantId: string,
): T[] {
  return items.filter((item) => item.tenantId === tenantId)
}

export function countByTenant<T extends { tenantId: string }>(
  items: readonly T[],
  tenantId: string,
): number {
  return items.filter((item) => item.tenantId === tenantId).length
}
