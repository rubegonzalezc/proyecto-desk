'use client'

import { MenuItem, Stack, TextField, Typography } from '@mui/material'
import AppCard from '@/components/ui/AppCard'
import UserAvatar from '@/components/ui/UserAvatar'
import { useTenant } from '@/components/layout/TenantProvider'
import {
  getTechnicianOptions,
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from '@/shared/constants/ticket-form-options'
import type { TicketPriority, TicketStatus } from '@/shared/types/ticket'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useToast } from '@/stores/ToastProvider'
import type { UpdateTicketInput } from '@/stores/tickets-store'

type TicketManagementFieldsProps = {
  ticketId: string
}

export function TicketManagementFields({ ticketId }: TicketManagementFieldsProps) {
  const { tenant } = useTenant()
  const { getTicketById, updateTicket } = useTicketsStore()
  const { showSuccess } = useToast()
  const ticket = getTicketById(ticketId)

  if (!ticket) return null

  const technicians = getTechnicianOptions(tenant.id)

  const saveField = (patch: UpdateTicketInput) => {
    const updated = updateTicket(ticketId, patch)
    if (updated) showSuccess('Cambios guardados')
  }

  return (
    <Stack spacing={2}>
      <TextField
        select
        label="Estado"
        value={ticket.status}
        onChange={(event) => saveField({ status: event.target.value as TicketStatus })}
        fullWidth
      >
        {TICKET_STATUSES.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Prioridad"
        value={ticket.priority}
        onChange={(event) => saveField({ priority: event.target.value as TicketPriority })}
        fullWidth
      >
        {TICKET_PRIORITIES.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Técnico asignado"
        value={ticket.technician}
        onChange={(event) => saveField({ technician: event.target.value })}
        fullWidth
      >
        {technicians.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Categoría"
        value={ticket.category}
        onChange={(event) => saveField({ category: event.target.value })}
        fullWidth
      >
        {TICKET_CATEGORIES.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  )
}

type TicketManagementPanelProps = {
  ticketId: string
}

export default function TicketManagementPanel({ ticketId }: TicketManagementPanelProps) {
  const { getTicketById } = useTicketsStore()
  const ticket = getTicketById(ticketId)

  if (!ticket) return null

  return (
    <AppCard lift={false}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Gestión del ticket
      </Typography>
      <TicketManagementFields ticketId={ticketId} />
      <Stack spacing={2} sx={{ mt: 2.5, pt: 2.5, borderTop: 1, borderColor: 'divider' }}>
        <Meta label="Solicitante" value={ticket.requester} />
        <Stack direction="row" spacing={1.25} alignItems="center">
          <UserAvatar name={ticket.technician} />
          <BoxMeta label="Técnico" value={ticket.technician} />
        </Stack>
        <Meta label="Equipo" value={ticket.team} />
        <Meta label="Creado" value={ticket.createdAt} />
        <Meta label="Actualizado" value={ticket.updatedAt} />
      </Stack>
    </AppCard>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Stack>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 650 }}>{value}</Typography>
    </Stack>
  )
}

function BoxMeta({ label, value }: { label: string; value: string }) {
  return (
    <Stack>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Stack>
  )
}
