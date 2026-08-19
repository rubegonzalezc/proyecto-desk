'use client'

import { Box, Stack } from '@mui/material'
import PageHeaderSkeleton from './PageHeaderSkeleton'
import { SkeletonCard, SkeletonLine, SkeletonPill } from './SkeletonPrimitives'

type TableBoardSkeletonProps = {
  rows?: number
  withAction?: boolean
  withFilterChips?: boolean
}

export default function TableBoardSkeleton({
  rows = 8,
  withAction = true,
  withFilterChips = false,
}: TableBoardSkeletonProps) {
  return (
    <Box>
      <PageHeaderSkeleton withAction={withAction} />
      <Box className="fade-up">
        <Box className="liquid-glass" sx={{ p: 1.5, mb: 1.5, borderRadius: '20px' }}>
          <Stack spacing={1.5}>
            <Box sx={{ width: '100%' }}>
              <SkeletonPill width={320} height={42} />
            </Box>
            {withFilterChips ? (
              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonPill key={index} width={index % 2 === 0 ? 88 : 112} height={32} />
                ))}
              </Stack>
            ) : null}
          </Stack>
        </Box>
        <SkeletonCard sx={{ p: 0, overflow: 'hidden' }}>
          <Box
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: 'repeat(5, 1fr)',
              px: 2.25,
              py: 1.4,
              bgcolor: 'rgba(238, 243, 250, 0.7)',
              borderBottom: '1px solid',
              borderColor: 'divider',
              gap: 2,
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLine key={index} width={`${60 + (index % 3) * 10}%`} height={12} />
            ))}
          </Box>
          {Array.from({ length: rows }).map((_, index) => (
            <Box
              key={index}
              sx={{
                px: 2.25,
                py: 1.5,
                borderBottom: index === rows - 1 ? 0 : '1px solid',
                borderColor: 'divider',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.4fr 1.3fr 1fr 120px 140px' },
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Stack direction="row" spacing={1.25} alignItems="center">
                <SkeletonLine width={36} height={36} />
                <Box sx={{ flex: 1 }}>
                  <SkeletonLine width="75%" height={16} />
                  <Box sx={{ mt: 0.75 }}>
                    <SkeletonLine width="50%" height={12} />
                  </Box>
                </Box>
              </Stack>
              <SkeletonLine width="85%" height={14} />
              <SkeletonLine width="70%" height={14} />
              <SkeletonLine width={72} height={26} />
              <SkeletonLine width={88} height={12} />
            </Box>
          ))}
          <Box
            sx={{
              px: 2.25,
              py: 1.25,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(238, 243, 250, 0.45)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <SkeletonPill width={132} height={36} />
              <SkeletonLine width={96} height={14} />
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <SkeletonLine width={110} height={14} />
              <SkeletonLine width={32} height={32} />
              <SkeletonLine width={32} height={32} />
            </Stack>
          </Box>
        </SkeletonCard>
      </Box>
    </Box>
  )
}
