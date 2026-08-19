'use client'

import { useMemo, useState } from 'react'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined'
import {
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { TicketComment, TicketEvidence } from '@/shared/types/ticket'
import { platformOperator } from '@/shared/mock/tenants'
import AppCard from '@/components/ui/AppCard'
import UserAvatar from '@/components/ui/UserAvatar'
import { useTicketsStore } from '@/stores/TicketsProvider'
import { useToast } from '@/stores/ToastProvider'
import { simulateApiDelay } from '@/shared/utils/simulated-delay'
import ImageAttachField, { filesToLocalImages, type LocalImage } from './ImageAttachField'
import CommentTemplatesPicker from './CommentTemplatesPicker'

type TicketThreadProps = {
  ticketId: string
  comments: TicketComment[]
  evidences: TicketEvidence[]
}

export default function TicketThread({ ticketId, comments, evidences }: TicketThreadProps) {
  const { addComment } = useTicketsStore()
  const { showSuccess, showError } = useToast()

  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState<LocalImage[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)

  const addImages = (incoming: File[]) => {
    const next = filesToLocalImages(incoming)
    setPending((current) => {
      const ids = new Set(current.map((item) => item.id))
      return [...current, ...next.filter((item) => !ids.has(item.id))]
    })
  }

  const insertTemplate = (body: string) => {
    setDraft((current) => (current.trim() ? `${current.trim()}\n\n${body}` : body))
  }

  const publish = async () => {
    const message = draft.trim()
    if (!message && pending.length === 0) {
      showError('Escribe un comentario o adjunta al menos una imagen')
      return
    }
    if (publishing) return

    setPublishing(true)

    const attachments = pending.map((item) => ({
      id: item.id,
      name: item.name,
      previewUrl: item.previewUrl,
    }))

    const nextEvidences = pending.map((item) => ({
      id: item.id,
      name: item.name,
      type: 'imagen' as const,
      size: item.sizeLabel,
    }))

    try {
      await simulateApiDelay()

      addComment(ticketId, {
        author: platformOperator.adminName,
        role: 'Plataforma',
        message: message || 'Imágenes adjuntas',
        attachments: attachments.length > 0 ? attachments : undefined,
        evidences: nextEvidences.length > 0 ? nextEvidences : undefined,
      })

      setDraft('')
      setPending([])
      showSuccess('Comentario publicado')
    } finally {
      setPublishing(false)
    }
  }

  const imageFiles = useMemo(() => evidences.filter((item) => item.type === 'imagen'), [evidences])
  const otherFiles = useMemo(() => evidences.filter((item) => item.type !== 'imagen'), [evidences])

  return (
    <>
      <AppCard lift={false} sx={{ mb: 2.5 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Comentarios
        </Typography>
        {comments.length === 0 ? (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Aún no hay comentarios en este ticket.
          </Typography>
        ) : (
          <Stack spacing={2} divider={<Divider flexItem />} sx={{ mb: 2.5 }}>
            {comments.map((comment) => (
              <Stack key={comment.id} direction="row" spacing={1.5}>
                <UserAvatar name={comment.author} />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="baseline" flexWrap="wrap">
                    <Typography sx={{ fontWeight: 700 }}>{comment.author}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.role} · {comment.createdAt}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {comment.message}
                  </Typography>
                  {comment.attachments && comment.attachments.length > 0 ? (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.25 }}>
                      {comment.attachments.map((file) =>
                        file.previewUrl ? (
                          <Box
                            key={file.id}
                            component="button"
                            type="button"
                            onClick={() => setPreview(file.previewUrl ?? null)}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              p: 0,
                              borderRadius: '12px',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              bgcolor: 'background.paper',
                            }}
                          >
                            <Box
                              component="img"
                              src={file.previewUrl}
                              alt={file.name}
                              sx={{ width: 88, height: 66, objectFit: 'cover', display: 'block' }}
                            />
                          </Box>
                        ) : (
                          <MockThumb key={file.id} name={file.name} />
                        ),
                      )}
                    </Stack>
                  ) : null}
                </Box>
              </Stack>
            ))}
          </Stack>
        )}

        <CommentTemplatesPicker onSelect={insertTemplate} />

        <TextField
          placeholder="Escribe un comentario…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          fullWidth
          multiline
          minRows={3}
          sx={{ mb: 1.5 }}
        />
        <ImageAttachField
          images={pending}
          onAdd={addImages}
          onRemove={(id) => {
            const target = pending.find((item) => item.id === id)
            if (target) URL.revokeObjectURL(target.previewUrl)
            setPending((current) => current.filter((item) => item.id !== id))
          }}
        />
        <Button variant="contained" onClick={publish} sx={{ mt: 1.75 }} loading={publishing}>
          Publicar comentario
        </Button>
      </AppCard>

      <AppCard lift={false}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Evidencias
        </Typography>
        {evidences.length === 0 ? (
          <Typography color="text.secondary">Sin archivos adjuntos.</Typography>
        ) : (
          <Stack spacing={1.5}>
            {imageFiles.length > 0 ? (
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {imageFiles.map((file) => {
                  const live = comments
                    .flatMap((item) => item.attachments ?? [])
                    .find((item) => item.id === file.id)
                  if (live?.previewUrl) {
                    return (
                      <Box
                        key={file.id}
                        component="button"
                        type="button"
                        onClick={() => setPreview(live.previewUrl ?? null)}
                        sx={{
                          width: 120,
                          border: '1px solid',
                          borderColor: 'divider',
                          p: 0,
                          borderRadius: '14px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          bgcolor: 'background.paper',
                          textAlign: 'left',
                        }}
                      >
                        <Box
                          component="img"
                          src={live.previewUrl}
                          alt={file.name}
                          sx={{ width: '100%', height: 84, objectFit: 'cover', display: 'block' }}
                        />
                        <Typography noWrap sx={{ px: 1, py: 0.6, fontSize: 11, fontWeight: 650 }}>
                          {file.name}
                        </Typography>
                      </Box>
                    )
                  }
                  return <MockThumb key={file.id} name={file.name} wide />
                })}
              </Stack>
            ) : null}
            {otherFiles.map((file) => (
              <Stack
                key={file.id}
                direction="row"
                spacing={1.25}
                alignItems="center"
                sx={{
                  px: 1.75,
                  py: 1.25,
                  borderRadius: '16px',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <InsertDriveFileOutlined fontSize="small" color="action" />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 650 }} noWrap>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {file.type} · {file.size}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
      </AppCard>

      <Dialog open={Boolean(preview)} onClose={() => setPreview(null)} maxWidth="md">
        {preview ? (
          <Box component="img" src={preview} alt="Adjunto" sx={{ maxWidth: '100%', display: 'block' }} />
        ) : null}
      </Dialog>
    </>
  )
}

function MockThumb({ name, wide }: { name: string; wide?: boolean }) {
  return (
    <Box
      sx={{
        width: wide ? 120 : 88,
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          height: wide ? 84 : 66,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(160deg, rgba(37,99,235,0.16), rgba(15,23,42,0.08))',
        }}
      >
        <ImageOutlined color="primary" />
      </Box>
      <Typography noWrap sx={{ px: 1, py: 0.55, fontSize: 11, fontWeight: 650 }} title={name}>
        {name}
      </Typography>
    </Box>
  )
}
