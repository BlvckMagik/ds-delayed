'use client'

import { Box, Typography } from '@mui/material'
import { CreateLessonForm } from '@/features/lessons/create'
import { LessonsList } from '@/features/lessons/list'

export function LessonsWidget() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Заняття
      </Typography>
      <CreateLessonForm />
      <LessonsList />
    </Box>
  )
} 