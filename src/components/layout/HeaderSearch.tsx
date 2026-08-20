'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { Box, InputAdornment, Paper, TextField } from '@mui/material'
import { useTenant } from '@/components/layout/TenantProvider'
import { useCommandPalette } from '@/components/layout/CommandPaletteProvider'
import SearchResultsList, { useSearchResultsFlat } from '@/components/layout/SearchResultsList'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { getUsersSeedSync, getTenantsSeedSync } from '@/lib/api'
import { searchGlobal, type SearchResult } from '@/shared/search/global-search'
import { getSystemById } from '@/shared/systems'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useWorkspace } from './WorkspaceProvider'

export default function HeaderSearch() {
  const router = useRouter()
  const { activeId } = useWorkspace()
  const { tenant } = useTenant()
  const { tickets } = useTicketsStore()
  const { openPalette } = useCommandPalette()
  const system = getSystemById(activeId)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const debouncedQuery = useDebouncedValue(query, 300)

  const users = useMemo(() => getUsersSeedSync(), [])
  const tenants = useMemo(() => getTenantsSeedSync(), [])

  const groupedResults = useMemo(
    () =>
      searchGlobal({
        query: debouncedQuery,
        tickets,
        users,
        tenants,
        tenantId: tenant.id,
      }),
    [debouncedQuery, tenant.id, tickets, users, tenants],
  )

  const flatResults = useSearchResultsFlat(groupedResults)
  const showDropdown = open && query.trim().length > 0

  useEffect(() => {
    setActiveIndex(0)
  }, [debouncedQuery])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const navigateTo = (result: SearchResult) => {
    setOpen(false)
    setQuery('')
    router.push(result.href)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      setOpen(false)
      openPalette()
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      setQuery('')
      inputRef.current?.blur()
      return
    }

    if (event.key === 'ArrowDown' && flatResults.length > 0) {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % flatResults.length)
      return
    }

    if (event.key === 'ArrowUp' && flatResults.length > 0) {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + flatResults.length) % flatResults.length)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const selected = flatResults[activeIndex] ?? flatResults[0]
      if (selected) navigateTo(selected)
    }
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        maxWidth: 520,
        width: '100%',
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <TextField
        inputRef={inputRef}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={system.searchPlaceholder}
        fullWidth
        autoComplete="off"
        inputProps={{ 'aria-label': 'Buscar en el sistema', 'aria-expanded': showDropdown }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                component="button"
                type="button"
                onClick={openPalette}
                aria-label="Abrir búsqueda rápida"
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  px: 0.75,
                  py: 0.25,
                  borderRadius: '8px',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: 'text.secondary',
                  bgcolor: 'action.hover',
                  border: 0,
                  cursor: 'pointer',
                }}
              >
                ⌘K
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '999px',
            height: 44,
            background: 'rgba(255, 255, 255, 0.55)',
          },
        }}
      />

      {showDropdown ? (
        <Paper
          className="liquid-glass"
          elevation={0}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 40,
            borderRadius: '20px',
            overflow: 'hidden',
            maxHeight: 380,
            overflowY: 'auto',
          }}
        >
          <SearchResultsList
            groupedResults={groupedResults}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            onSelect={navigateTo}
            query={query}
            debouncedQuery={debouncedQuery}
            compact
          />
        </Paper>
      ) : null}
    </Box>
  )
}
