import type { Metadata } from 'next'
import Grid from '@mui/material/Grid2'
import { knowledgeArticles } from '@/shared/mock/knowledge'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import KnowledgeArticleCard from '@/components/conocimiento/KnowledgeArticleCard'
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
        description="Artículos para agentes y solicitantes. Contenido estático de demostración."
      />
      <Grid container spacing={2.25} className="stagger">
        {knowledgeArticles.map((article) => (
          <Grid key={article.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <KnowledgeArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
