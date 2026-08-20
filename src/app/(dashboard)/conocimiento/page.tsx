import type { Metadata } from 'next'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import KnowledgeBoard from '@/components/conocimiento/KnowledgeBoard'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Base de conocimiento',
}

export default function KnowledgePage() {
  return (
    <>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="self-service" />}
        title="Base de conocimiento"
        description="Artículos para agentes y solicitantes. Busca por título o filtra por categoría."
      />
      <KnowledgeBoard />
    </>
  )
}
