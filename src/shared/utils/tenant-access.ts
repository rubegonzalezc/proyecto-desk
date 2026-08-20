export function tenantHasInventoryAccess(tenant: { systems: string[] }): boolean {
  return tenant.systems.some((system) => system.toLowerCase().includes('inventario'))
}
