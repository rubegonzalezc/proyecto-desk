'use client'

import { useRef, type DragEvent } from 'react'
import CloseRounded from '@mui/icons-material/CloseRounded'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import { Box, IconButton, Stack, Typography } from '@mui/material'

export type LocalImage = {
  id: string
  name: string
  sizeLabel: string
  previewUrl: string
}

type ImageAttachFieldProps = {
  images: LocalImage[]
  onAdd: (files: File[]) => void
  onRemove: (id: string) => void
  hint?: string
}

export function filesToLocalImages(files: File[]): LocalImage[] {
  return files
    .filter((file) => file.type.startsWith('image/'))
    .map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      sizeLabel: file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`,
      previewUrl: URL.createObjectURL(file),
    }))
}

export default function ImageAttachField({
  images,
  onAdd,
  onRemove,
  hint = 'PNG o JPG · máximo visual, no se sube al servidor',
}: ImageAttachFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const takeFiles = (list: FileList | null) => {
    if (!list?.length) return
    onAdd(Array.from(list))
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    takeFiles(event.dataTransfer.files)
  }

  return (
    <Box>
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        sx={{
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: '18px',
          py: 2.5,
          px: 2,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: 'rgba(238,243,250,0.55)',
          transition: 'border-color 280ms cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': { borderColor: 'primary.main' },
        }}
      >
        <ImageOutlined color="primary" sx={{ mb: 0.5 }} />
        <Typography variant="body2" sx={{ fontWeight: 650 }}>
          Adjuntar imágenes
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          hidden
          onChange={(event) => {
            takeFiles(event.target.files)
            event.target.value = ''
          }}
        />
      </Box>

      {images.length > 0 ? (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.5 }}>
          {images.map((image) => (
            <Box
              key={image.id}
              sx={{
                width: 92,
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Box
                component="img"
                src={image.previewUrl}
                alt={image.name}
                sx={{ width: '100%', height: 72, objectFit: 'cover', display: 'block' }}
              />
              <IconButton
                size="small"
                aria-label={`Quitar ${image.name}`}
                onClick={(event) => {
                  event.stopPropagation()
                  onRemove(image.id)
                }}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 22,
                  height: 22,
                  bgcolor: 'rgba(15,23,42,0.72)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(15,23,42,0.88)' },
                }}
              >
                <CloseRounded sx={{ fontSize: 14 }} />
              </IconButton>
              <Typography
                noWrap
                sx={{ px: 0.75, py: 0.4, fontSize: 10, fontWeight: 650 }}
                title={image.name}
              >
                {image.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      ) : null}
    </Box>
  )
}
