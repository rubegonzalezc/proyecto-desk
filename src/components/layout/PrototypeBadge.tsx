import { Box, Typography } from '@mui/material'

export default function PrototypeBadge() {
  return (
    <Box
      sx={{
        px: 1.25,
        py: 0.65,
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.04)',
      }}
    >
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 650,
          letterSpacing: '0.02em',
          color: 'rgba(248,250,252,0.62)',
          lineHeight: 1.3,
        }}
      >
        SynchroDev Platform · Google tenant
      </Typography>
    </Box>
  )
}
