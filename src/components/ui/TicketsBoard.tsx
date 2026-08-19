'use client'

import { useMemo, useState } from 'react'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import type { TicketStatus } from '@/shared/types/ticket'
import { getStatusDisplayLabel } from '@/shared/labels/ticket-display'
import { useTicketsStore } from '@/stores/TicketsProvider'
import AppTable from '@/components/ui/AppTable'
import EmptyState from '@/components/ui/EmptyState'
import TicketRow from '@/components/ui/TicketRow'

const statuses: Array<TicketStatus | 'Todos'> = [
  'Todos',
  'Nuevo',
  'En progreso',
  'Pendiente',
  'Resuelto',
  'Cerrado',
]

const pageSizes = [10, 25, 50] as const

const columns = [
  { key: 'id', label: 'ID', width: '110px' },
  { key: 'title', label: 'Asunto' },
  { key: 'status', label: 'Estado', width: '140px' },
  { key: 'priority', label: 'Prioridad', width: '120px' },
  { key: 'tech', label: 'Técnico', width: '160px' },
  { key: 'date', label: 'Creado', width: '150px' },
]

export default function TicketsBoard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { tickets } = useTicketsStore()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statuses)[number]>('Todos')
  const [pageSize, setPageSize] = useState<(typeof pageSizes)[number]>(25)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = status === 'Todos' || ticket.status === status
      const haystack = `${ticket.id} ${ticket.title} ${ticket.technician} ${ticket.requester}`.toLowerCase()
      return matchesStatus && haystack.includes(query.toLowerCase())
    })
  }, [query, status, tickets])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, filtered.length)
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <AppTable
      columns={columns}
      toolbar={
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ md: 'center' }}>
          <TextField
            placeholder="Filtrar por ID, asunto o técnico"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '999px', height: 42 } }}
          />
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ width: '100%' }}>
            {statuses.map((item) => (
              <Chip
                key={item}
                size="small"
                label={getStatusDisplayLabel(item, isMobile)}
                title={item}
                onClick={() => {
                  setStatus(item)
                  setPage(1)
                }}
                color={status === item ? 'primary' : 'default'}
                variant={status === item ? 'filled' : 'outlined'}
                sx={{
                  maxWidth: '100%',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>
      }
      footer={
        filtered.length === 0 ? undefined : (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <FormControl size="small">
                <Select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(event.target.value as (typeof pageSizes)[number])
                    setPage(1)
                  }}
                  sx={{
                    borderRadius: '999px',
                    height: 36,
                    minWidth: 132,
                    fontWeight: 600,
                    bgcolor: 'background.paper',
                  }}
                >
                  {pageSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      Mostrar {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary">
                {from}–{to} de {filtered.length}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end">
              <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
                Página {currentPage} de {pageCount}
              </Typography>
              <IconButton
                size="small"
                aria-label="Página anterior"
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                <ChevronLeftRounded />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Página siguiente"
                disabled={currentPage >= pageCount}
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              >
                <ChevronRightRounded />
              </IconButton>
            </Stack>
          </Stack>
        )
      }
    >
      {filtered.length === 0 ? (
        <Box sx={{ p: 2 }}>
          <EmptyState
            title="Sin resultados"
            description="No hay tickets con ese criterio en la demo."
          />
        </Box>
      ) : (
        paged.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} />)
      )}
    </AppTable>
  )
}
