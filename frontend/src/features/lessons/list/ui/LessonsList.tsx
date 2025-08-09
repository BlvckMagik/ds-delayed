'use client'

import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { useGetLessonsQuery } from '@/shared/store/api'

export function LessonsList() {
  const { data: lessons, isLoading, error } = useGetLessonsQuery()

  if (isLoading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Alert severity="error">
          Помилка завантаження занять
        </Alert>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Список занять
      </Typography>
      
      {lessons && lessons.length > 0 ? (
        <List>
          {lessons.map((lesson) => (
            <ListItem key={lesson.id} divider>
              <ListItemText
                primary={lesson.name}
                secondary={`${lesson.group?.name || 'Без групи'} - ${format(new Date(lesson.time), 'PPp', { locale: uk })}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Заняття не знайдено
        </Typography>
      )}
    </Paper>
  )
} 