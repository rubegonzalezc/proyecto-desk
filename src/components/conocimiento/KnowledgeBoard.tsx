'use client'

import { useMemo, useState } from 'react'
import { Chip, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { knowledgeArticles } from '@/shared/mock/knowledge'
import {
  filterKnowledgeArticles,
  getKnowledgeCategories,
  hasActiveKnowledgeFilters,
  type KnowledgeCategoryFilter,
} from '@/shared/utils/knowledge-filters'
import KnowledgeArticleCard from '@/components/conocimiento/KnowledgeArticleCard'
import AppCard from '@/components/ui/AppCard'
import EmptyState from '@/components/ui/EmptyState'
import { TableSearchField, TableToolbar } from '@/components/ui/TableToolbar'

const categories: KnowledgeCategoryFilter[] = ['Todas', ...getKnowledgeCategories()]

export default function KnowledgeBoard() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<KnowledgeCategoryFilter>('Todas')

  const filtered = useMemo(
    () => filterKnowledgeArticles(knowledgeArticles, query, category),
    [category, query],
  )

  const hasActiveFilters = hasActiveKnowledgeFilters(query, category)

  const clearFilters = () => {
    setQuery('')
    setCategory('Todas')
  }

  return (
    <>
      <AppCard lift={false} sx={{ mb: 2.5 }}>
        <TableToolbar stacked>
          <TableSearchField
            value={query}
            onChange={setQuery}
            placeholder="Buscar por título o extracto"
            flex={false}
            fullWidth
          />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((item) => (
              <Chip
                key={item}
                size="small"
                label={item}
                onClick={() => setCategory(item)}
                color={category === item ? 'primary' : 'default'}
                variant={category === item ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </TableToolbar>
      </AppCard>

      {filtered.length === 0 ? (
        <AppCard lift={false}>
          <EmptyState
            title="Sin resultados"
            description="No hay artículos con ese criterio. Prueba con otra búsqueda o categoría."
            actionLabel={hasActiveFilters ? 'Limpiar filtros' : undefined}
            onAction={hasActiveFilters ? clearFilters : undefined}
          />
        </AppCard>
      ) : (
        <Grid container spacing={2.25} className="stagger">
          {filtered.map((article) => (
            <Grid key={article.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <KnowledgeArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}
