'use client'

import { useMemo, useState } from 'react'
import { Box, Chip, Stack, TextField } from '@mui/material'
import type { Ticket, TicketStatus } from '@/shared/types/ticket'
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

const columns = [
  { key: 'id', label: 'ID', width: '110px' },
  { key: 'title', label: 'Asunto' },
  { key: 'status', label: 'Estado', width: '140px' },
  { key: 'priority', label: 'Prioridad', width: '120px' },
  { key: 'tech', label: 'Técnico', width: '160px' },
  { key: 'date', label: 'Creado', width: '150px' },
]

export default function TicketsBoard({ tickets }: { tickets: Ticket[] }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statuses)[number]>('Todos')

  const filtered = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = status === 'Todos' || ticket.status === status
      const haystack = `${ticket.id} ${ticket.title} ${ticket.technician} ${ticket.requester}`.toLowerCase()
      return matchesStatus && haystack.includes(query.toLowerCase())
    })
  }, [query, status, tickets])

  return (
    <AppTable
      columns={columns}
      toolbar={
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ md: 'center' }}>
          <TextField
            placeholder="Filtrar por ID, asunto o técnico"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '999px', height: 42 } }}
          />
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {statuses.map((item) => (
              <Chip
                key={item}
                label={item}
                onClick={() => setStatus(item)}
                color={status === item ? 'primary' : 'default'}
                variant={status === item ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Stack>
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
        filtered.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} />)
      )}
    </AppTable>
  )
}
