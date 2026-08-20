'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import { useTenant } from '@/components/layout/TenantProvider'
import ImageAttachField, { filesToLocalImages, type LocalImage } from '@/components/tickets/ImageAttachField'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useToast } from '@/stores/ToastProvider'
import type { TicketPriority } from '@/shared/types/ticket'
import {
  getTechnicianOptions,
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
} from '@/shared/constants/ticket-form-options'
import {
  hasBlockingErrors,
  validateNewTicketForm,
  type NewTicketFormErrors,
} from '@/shared/validation/new-ticket-form'
import { simulateApiDelay } from '@/shared/utils/simulated-delay'

export default function NewTicketForm() {
  const router = useRouter()
  const { tenant } = useTenant()
  const { createTicket } = useTicketsStore()
  const { showSuccess, showError } = useToast()
  const technicians = useMemo(() => getTechnicianOptions(tenant.id), [tenant.id])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Conectividad')
  const [priority, setPriority] = useState<TicketPriority>('Media')
  const [requester, setRequester] = useState('Elena Ruiz')
  const [technician, setTechnician] = useState('Sin asignar')
  const [team, setTeam] = useState('Mesa de ayuda')
  const [images, setImages] = useState<LocalImage[]>([])
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fieldErrors = useMemo(
    () => validateNewTicketForm(title, description),
    [description, title],
  )
  const blocking = hasBlockingErrors(fieldErrors)
  const visibleErrors: NewTicketFormErrors = showErrors ? fieldErrors : {}

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    setShowErrors(true)

    if (blocking) {
      showError('Revisa los campos obligatorios antes de continuar')
      return
    }

    setSubmitting(true)

    try {
      await simulateApiDelay()

      const created = createTicket({
        title: title.trim(),
        description: description.trim(),
        priority,
        requester: requester.trim(),
        category,
        technician,
        team: team.trim(),
        tenantId: tenant.id,
        evidences: images.map((item) => ({
          id: item.id,
          name: item.name,
          type: 'imagen' as const,
          size: item.sizeLabel,
        })),
      })

      showSuccess(`Ticket ${created.id} creado correctamente`)
      router.push(`/tickets/${created.id}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="tickets" />}
        title="Crear ticket"
        description="Completa el formulario para registrar un ticket en la demo."
        extra={
          <Button component={Link} href="/tickets" variant="outlined">
            Volver a la cola
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2.5 }}>
              Detalle de la solicitud
            </Typography>
            <Stack component="fieldset" spacing={2} sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
              <Box component="legend" className="sd-sr-only">
                Detalle de la solicitud
              </Box>
              <TextField
                label="Asunto"
                placeholder="Ej. No hay acceso a internet en planta 3"
                fullWidth
                required
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onBlur={() => setShowErrors(true)}
                error={Boolean(visibleErrors.title)}
                helperText={visibleErrors.title}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.title) }}
              />
              <TextField
                label="Descripción"
                placeholder="Describe el impacto, desde cuándo ocurre y qué se intentó."
                fullWidth
                required
                multiline
                minRows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                onBlur={() => setShowErrors(true)}
                error={Boolean(visibleErrors.description)}
                helperText={visibleErrors.description}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.description) }}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Categoría"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    fullWidth
                  >
                    {TICKET_CATEGORIES.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Prioridad"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value as TicketPriority)}
                    fullWidth
                  >
                    {TICKET_PRIORITIES.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Stack>
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <AppCard lift={false} sx={{ mb: 2.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Asignación
            </Typography>
            <Stack component="fieldset" spacing={2} sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
              <Box component="legend" className="sd-sr-only">
                Asignación del ticket
              </Box>
              <TextField
                label="Solicitante"
                value={requester}
                onChange={(event) => setRequester(event.target.value)}
                fullWidth
              />
              <TextField
                select
                label="Técnico"
                value={technician}
                onChange={(event) => setTechnician(event.target.value)}
                fullWidth
              >
                {technicians.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Equipo"
                value={team}
                onChange={(event) => setTeam(event.target.value)}
                fullWidth
              />
            </Stack>
          </AppCard>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Evidencias
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Adjunta capturas. En el prototipo no se suben al servidor.
            </Typography>
            <ImageAttachField
              images={images}
              onAdd={(incoming) => {
                const next = filesToLocalImages(incoming)
                setImages((current) => {
                  const ids = new Set(current.map((item) => item.id))
                  return [...current, ...next.filter((item) => !ids.has(item.id))]
                })
              }}
              onRemove={(id) => {
                const target = images.find((item) => item.id === id)
                if (target) URL.revokeObjectURL(target.previewUrl)
                setImages((current) => current.filter((item) => item.id !== id))
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              loading={submitting}
              disabled={submitting || (showErrors && blocking)}
            >
              Crear ticket
            </Button>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}
