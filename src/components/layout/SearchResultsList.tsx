'use client'

import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import {
  flattenSearchResults,
  getSearchGroupLabel,
  getSearchGroupOrder,
  MIN_GLOBAL_SEARCH_LENGTH,
  type GroupedSearchResults,
  type SearchResult,
} from '@/shared/search/global-search'

type SearchResultsListProps = {
  groupedResults: GroupedSearchResults
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  onSelect: (result: SearchResult) => void
  query: string
  debouncedQuery: string
  compact?: boolean
}

export default function SearchResultsList({
  groupedResults,
  activeIndex,
  onActiveIndexChange,
  onSelect,
  query,
  debouncedQuery,
  compact = false,
}: SearchResultsListProps) {
  const flatResults = flattenSearchResults(groupedResults)
  const resultCount = flatResults.length
  const showHint = query.trim().length < MIN_GLOBAL_SEARCH_LENGTH
  const showEmpty = !showHint && resultCount === 0

  if (showHint) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ px: compact ? 1.25 : 1.5, py: compact ? 1.5 : 2 }}>
        Escribe al menos {MIN_GLOBAL_SEARCH_LENGTH} caracteres para buscar tickets, clientes, usuarios o rutas.
      </Typography>
    )
  }

  if (showEmpty) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ px: compact ? 1.25 : 1.5, py: compact ? 1.5 : 2 }}>
        Sin resultados para “{debouncedQuery}”.
      </Typography>
    )
  }

  let runningIndex = -1

  return (
    <Box sx={{ py: compact ? 0.5 : 1 }}>
      {getSearchGroupOrder().map((group) => {
        const items = groupedResults[group]
        if (items.length === 0) return null

        return (
          <Box key={group} sx={{ mt: compact ? 0.5 : 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                px: compact ? 1.25 : 1.5,
                py: 0.75,
                display: 'block',
                fontWeight: 750,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {getSearchGroupLabel(group)}
            </Typography>
            <List dense disablePadding role="listbox" aria-label="Resultados de búsqueda">
              {items.map((item) => {
                runningIndex += 1
                const index = runningIndex
                const selected = index === activeIndex

                return (
                  <ListItemButton
                    key={item.id}
                    className="sd-command-result"
                    selected={selected}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => onActiveIndexChange(index)}
                    onFocus={() => onActiveIndexChange(index)}
                    onClick={() => onSelect(item)}
                    sx={{
                      borderRadius: compact ? '12px' : '14px',
                      mx: 0.5,
                      mb: 0.25,
                      py: compact ? 0.75 : 1,
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      secondary={item.description}
                      primaryTypographyProps={{ fontWeight: selected ? 700 : 600, fontSize: compact ? 13.5 : 14 }}
                      secondaryTypographyProps={{ fontSize: compact ? 12 : 12.5 }}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          </Box>
        )
      })}
    </Box>
  )
}

export function useSearchResultsFlat(groupedResults: GroupedSearchResults) {
  return flattenSearchResults(groupedResults)
}
