'use client'

import { Box, Chip, Stack, Typography } from '@mui/material'
import type { KnowledgeArticle } from '@/shared/types/knowledge'
import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'
import AppCard from '@/components/ui/AppCard'
import LinkButton from '@/components/ui/LinkButton'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import PageHeader from '@/components/ui/PageHeader'

type KnowledgeArticleViewProps = {
  article: KnowledgeArticle
}

export default function KnowledgeArticleView({ article }: KnowledgeArticleViewProps) {
  return (
    <Box>
      <AppBreadcrumbs
        showActiveTenant
        items={[
          { label: 'Conocimiento', href: '/conocimiento' },
          { label: article.id },
        ]}
      />
      <PageHeader
        eyebrow={<TenantEyebrow suffix={article.id} />}
        title={article.title}
        description={article.excerpt}
        extra={
          <LinkButton href="/conocimiento" variant="outlined">
            Volver
          </LinkButton>
        }
      />

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
        <Chip size="small" label={article.category} color="primary" />
        <Chip size="small" label={`Actualizado ${article.updatedAt}`} variant="outlined" />
        <Chip size="small" label={`${article.views} vistas`} variant="outlined" />
        <Chip size="small" label={`${article.helpful}% útil`} variant="outlined" />
      </Stack>

      <AppCard lift={false}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Procedimiento
        </Typography>
        <ArticleContent content={article.content} />
      </AppCard>
    </Box>
  )
}

function ArticleContent({ content }: { content: string }) {
  const blocks = content.trim().split('\n\n')

  return (
    <Stack spacing={1.5}>
      {blocks.map((block, index) => {
        if (block.startsWith('## ')) {
          return (
            <Typography key={index} variant="h4" sx={{ mt: index > 0 ? 1 : 0 }}>
              {block.replace('## ', '')}
            </Typography>
          )
        }

        if (/^\d+\./.test(block)) {
          return (
            <Box
              key={index}
              component="ol"
              sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}
            >
              {block.split('\n').map((line) => (
                <Box component="li" key={line} sx={{ mb: 0.75 }}>
                  <Typography variant="body2" component="span">
                    {line.replace(/^\d+\.\s*/, '')}
                  </Typography>
                </Box>
              ))}
            </Box>
          )
        }

        return (
          <Typography key={index} variant="body2" color="text.secondary">
            {block}
          </Typography>
        )
      })}
    </Stack>
  )
}
