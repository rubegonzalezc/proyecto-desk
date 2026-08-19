'use client'

import { Box, Skeleton, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import PageHeaderSkeleton from './PageHeaderSkeleton'
import { SkeletonAvatar, SkeletonCard, SkeletonLine } from './SkeletonPrimitives'

function StatCardSkeleton() {
  return (
    <SkeletonCard sx={{ minHeight: 132, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <SkeletonLine width="70%" height={14} />
          <Box sx={{ mt: 1.5, mb: 1 }}>
            <SkeletonLine width="55%" height={32} />
          </Box>
          <SkeletonLine width="45%" height={12} />
        </Box>
        <Skeleton variant="rounded" width={42} height={42} sx={{ borderRadius: '14px', transform: 'none' }} />
      </Box>
    </SkeletonCard>
  )
}

function ChartCardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonLine width={180} height={22} />
      <Box sx={{ mt: 0.75, mb: 2.5 }}>
        <SkeletonLine width="min(320px, 80%)" height={14} />
      </Box>
      <Skeleton variant="rounded" height={280} sx={{ borderRadius: '18px', transform: 'none' }} />
    </SkeletonCard>
  )
}

function TechniciansCardSkeleton() {
  return (
    <SkeletonCard sx={{ height: '100%' }}>
      <SkeletonLine width={200} height={22} />
      <Stack spacing={1.75} sx={{ mt: 2 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Stack key={index} direction="row" spacing={1.5} alignItems="center">
            <SkeletonAvatar size={40} />
            <Box sx={{ flex: 1 }}>
              <SkeletonLine width="70%" height={14} />
              <Box sx={{ mt: 0.5 }}>
                <SkeletonLine width="50%" height={12} />
              </Box>
            </Box>
            <SkeletonLine width={24} height={18} />
          </Stack>
        ))}
      </Stack>
    </SkeletonCard>
  )
}

function RecentTicketsSkeleton() {
  return (
    <SkeletonCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box sx={{ px: 2.5, py: 2 }}>
        <SkeletonLine width={180} height={22} />
      </Box>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            px: 2.25,
            py: 1.75,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '110px 1fr 140px 120px 160px 150px' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <SkeletonLine width={72} height={14} />
          <Box>
            <SkeletonLine width="80%" height={16} />
            <Box sx={{ mt: 0.75 }}>
              <SkeletonLine width="55%" height={12} />
            </Box>
          </Box>
          <SkeletonLine width={88} height={26} />
          <SkeletonLine width={64} height={26} />
          <Stack direction="row" spacing={1} alignItems="center">
            <SkeletonAvatar size={28} />
            <SkeletonLine width="70%" height={14} />
          </Stack>
          <SkeletonLine width={96} height={12} />
        </Box>
      ))}
    </SkeletonCard>
  )
}

export default function DashboardSkeleton() {
  return (
    <Box>
      <PageHeaderSkeleton />
      <Grid container spacing={2.25} sx={{ mb: 3.5 }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
            <StatCardSkeleton />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2.25} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCardSkeleton />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TechniciansCardSkeleton />
        </Grid>
      </Grid>
      <RecentTicketsSkeleton />
    </Box>
  )
}
