'use client'

import { Box } from '@mui/material'
import { SkeletonLine, SkeletonPill } from './SkeletonPrimitives'

export default function PageHeaderSkeleton({ withAction = true }: { withAction?: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'flex-end' },
        justifyContent: 'space-between',
        gap: 2.5,
        mb: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 720, width: '100%' }}>
        <SkeletonLine width={140} height={12} />
        <Box sx={{ mt: 1.25, mb: 1 }}>
          <SkeletonLine width="min(420px, 90%)" height={34} />
        </Box>
        <SkeletonLine width="min(520px, 100%)" height={14} />
        <Box sx={{ mt: 0.75 }}>
          <SkeletonLine width="min(380px, 80%)" height={14} />
        </Box>
      </Box>
      {withAction ? <SkeletonPill width={148} height={42} /> : null}
    </Box>
  )
}
