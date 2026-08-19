import type { Metadata } from 'next'
import TenantSettingsForm from '@/components/settings/TenantSettingsForm'

export const metadata: Metadata = {
  title: 'Configuración',
}

export default function SettingsPage() {
  return <TenantSettingsForm />
}
