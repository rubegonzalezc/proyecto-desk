'use client'

import { Chip, Stack, Typography } from '@mui/material'
import { commentTemplates } from '@/shared/mock/comment-templates'

type CommentTemplatesPickerProps = {
  onSelect: (body: string) => void
}

export default function CommentTemplatesPicker({ onSelect }: CommentTemplatesPickerProps) {
  return (
    <Stack spacing={1} sx={{ mb: 1.5 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 650 }}>
        Plantillas de respuesta
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {commentTemplates.map((template) => (
          <Chip
            key={template.id}
            size="small"
            label={template.label}
            onClick={() => onSelect(template.body)}
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Stack>
    </Stack>
  )
}
