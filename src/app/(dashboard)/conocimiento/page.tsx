import type { Metadata } from 'next'
import { Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { knowledgeArticles } from '@/shared/mock/knowledge'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Base de conocimiento',
}

export default function KnowledgePage() {
  return (
    <>
      <PageHeader
        eyebrow="Self-service"
        title="Base de conocimiento"
        description="Artículos para agentes y solicitantes. Contenido estático de demostración."
      />
      <Grid container spacing={2.25} className="stagger">
        {knowledgeArticles.map((article) => (
          <Grid key={article.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <AppCard sx={{ height: '100%' }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1.25 }}>
                <Chip size="small" label={article.category} />
                <Chip size="small" label={article.id} variant="outlined" />
              </Stack>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, minHeight: 48 }}>
                {article.excerpt}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Actualizado {article.updatedAt} · {article.views} vistas · {article.helpful}% útil
              </Typography>
            </AppCard>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
