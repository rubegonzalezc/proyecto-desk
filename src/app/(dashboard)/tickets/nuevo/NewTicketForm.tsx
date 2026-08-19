'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import ImageAttachField, { filesToLocalImages, type LocalImage } from '@/components/tickets/ImageAttachField'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useToast } from '@/stores/ToastProvider'
import type { TicketPriority } from '@/shared/types/ticket'

const categories = ['Conectividad', 'Hardware', 'Correo', 'Acceso remoto', 'Solicitud', 'Seguridad', 'Licencias']
const priorities: TicketPriority[] = ['Baja', 'Media', 'Alta', 'Crítica']
const technicians = ['Sin asignar', 'Carlos Soto', 'Elena Ruiz', 'Sofía Vega', 'Andrés Silva']

type FormErrors = {
  title?: string
  description?: string
}

export default function NewTicketForm() {
  const router = useRouter()
  const { createTicket } = useTicketsStore()
  const { showSuccess, showError } = useToast()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Conectividad')
  const [priority, setPriority] = useState<TicketPriority>('Media')
  const [requester, setRequester] = useState('Elena Ruiz')
  const [technician, setTechnician] = useState('Sin asignar')
  const [team, setTeam] = useState('Mesa de ayuda')
  const [images, setImages] = useState<LocalImage[]>([])
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!title.trim()) next.title = 'El asunto es obligatorio'
    if (!description.trim()) next.description = 'La descripción es obligatoria'
    return next
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      showError('Revisa los campos obligatorios antes de continuar')
      return
    }

    const created = createTicket({
      title: title.trim(),
      description: description.trim(),
      priority,
      requester: requester.trim(),
      category,
      technician,
      team: team.trim(),
    })

    showSuccess(`Ticket ${created.id} creado correctamente`)
    router.push(`/tickets/${created.id}`)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <PageHeader
        eyebrow="Tickets"
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
            <Stack spacing={2}>
              <TextField
                label="Asunto"
                placeholder="Ej. No hay acceso a internet en planta 3"
                fullWidth
                required
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value)
                  if (errors.title) setErrors((current) => ({ ...current, title: undefined }))
                }}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
              <TextField
                label="Descripción"
                placeholder="Describe el impacto, desde cuándo ocurre y qué se intentó."
                fullWidth
                required
                multiline
                minRows={5}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                  if (errors.description) setErrors((current) => ({ ...current, description: undefined }))
                }}
                error={Boolean(errors.description)}
                helperText={errors.description}
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
                    {categories.map((item) => (
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
                    {priorities.map((item) => (
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
            <Stack spacing={2}>
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
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Crear ticket
            </Button>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}
