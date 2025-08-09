'use client'

import { Box, Typography } from '@mui/material'
import { CreateGroupForm } from '@/features/groups/create'
import { GroupsList } from '@/features/groups/list'

export function GroupsWidget() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Групи
      </Typography>
      <CreateGroupForm />
      <GroupsList />
    </Box>
  )
} 