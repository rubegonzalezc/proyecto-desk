import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

export interface AppTableColumn {
  key: string
  label: string
  width?: string | number
}

type AppTableProps = {
  columns: AppTableColumn[]
  children: ReactNode
  toolbar?: ReactNode
  footer?: ReactNode
}

export default function AppTable({ columns, children, toolbar, footer }: AppTableProps) {
  return (
    <Box className="fade-up">
      {toolbar ? (
        <Box className="liquid-glass" sx={{ p: 1.5, mb: 1.5, borderRadius: '20px' }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>{toolbar}</Box>
        </Box>
      ) : null}
      <Box
        className="liquid-glass-solid"
        sx={{
          overflow: 'hidden',
          borderRadius: '24px',
        }}
      >
        <Box sx={{ overflowX: 'auto' }} className="sd-scrollbar">
          <Box sx={{ minWidth: 860 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: columns.map((column) => column.width ?? '1fr').join(' '),
                px: 2.25,
                py: 1.4,
                bgcolor: 'rgba(238, 243, 250, 0.7)',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              {columns.map((column) => (
                <Typography
                  key={column.key}
                  variant="caption"
                  sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase' }}
                >
                  {column.label}
                </Typography>
              ))}
            </Box>
            {children}
          </Box>
        </Box>
        {footer ? (
          <Box
            sx={{
              px: 2.25,
              py: 1.25,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(238, 243, 250, 0.45)',
            }}
          >
            {footer}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
