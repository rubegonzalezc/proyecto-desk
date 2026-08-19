import type { Metadata } from 'next'
import TenantDashboardView from '@/components/dashboard/TenantDashboardView'
import { awaitDemoRouteDelay } from '@/shared/config/demo-loading'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  await awaitDemoRouteDelay()

  return <TenantDashboardView />
}
