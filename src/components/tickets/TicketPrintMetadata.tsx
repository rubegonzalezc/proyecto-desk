'use client'

import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import type { Ticket } from '@/shared/types/ticket'
import PriorityBadge from '@/components/ui/PriorityBadge'
import StatusBadge from '@/components/ui/StatusBadge'

type TicketPrintMetadataProps = {
  ticket: Ticket
}

export default function TicketPrintMetadata({ ticket }: TicketPrintMetadataProps) {
  return (
    <Box className="print-only" sx={{ mb: 2.5 }}>
      <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 800 }}>
        Informe de ticket · {ticket.id}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 1,
          '@media print': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          },
        }}
      >
        <MetaItem label="Estado" value={<StatusBadge status={ticket.status} />} />
        <MetaItem label="Prioridad" value={<PriorityBadge priority={ticket.priority} />} />
        <MetaItem label="Categoría" value={ticket.category} />
        <MetaItem label="Equipo" value={ticket.team} />
        <MetaItem label="Solicitante" value={ticket.requester} />
        <MetaItem label="Técnico" value={ticket.technician} />
        <MetaItem label="Creado" value={ticket.createdAt} />
        <MetaItem label="Actualizado" value={ticket.updatedAt} />
        <MetaItem label="SLA" value={ticket.sla} />
      </Box>
    </Box>
  )
}

function MetaItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      {typeof value === 'string' ? (
        <Typography sx={{ fontWeight: 650 }}>{value}</Typography>
      ) : (
        <Box sx={{ mt: 0.25 }}>{value}</Box>
      )}
    </Box>
  )
}
