'use client'

import Link from 'next/link'
import { Chip, Stack, Typography } from '@mui/material'
import type { KnowledgeArticle } from '@/shared/types/knowledge'
import AppCard from '@/components/ui/AppCard'

type KnowledgeArticleCardProps = {
  article: KnowledgeArticle
}

export default function KnowledgeArticleCard({ article }: KnowledgeArticleCardProps) {
  return (
    <Link
      href={`/conocimiento/${article.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      <AppCard
        sx={{
          height: '100%',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
          },
        }}
      >
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
    </Link>
  )
}
