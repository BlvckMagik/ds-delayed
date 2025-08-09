'use client'

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useState } from 'react'
import { useGetLessonsQuery, useDeleteLessonMutation } from '@/shared/store/api'
import { EditLessonDialog } from '@/features/lessons/edit'
import { Lesson } from '@/entities/lesson'

const dayNames = [
  'Неділя',
  'Понеділок', 
  'Вівторок',
  'Середа',
  'Четвер',
  'П&apos;ятниця',
  'Субота'
]

export function LessonsList() {
  const { data: lessons, isLoading, error } = useGetLessonsQuery()
  const [deleteLesson] = useDeleteLessonMutation()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null)

  const handleDeleteClick = (lessonId: string) => {
    setLessonToDelete(lessonId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (lessonToDelete) {
      try {
        await deleteLesson(lessonToDelete).unwrap()
        setDeleteDialogOpen(false)
        setLessonToDelete(null)
      } catch (error) {
        console.error('Помилка видалення заняття:', error)
      }
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setLessonToDelete(null)
  }

  const handleEditClick = (lesson: Lesson) => {
    setLessonToEdit(lesson)
    setEditDialogOpen(true)
  }

  const handleEditClose = () => {
    setEditDialogOpen(false)
    setLessonToEdit(null)
  }

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
    <>
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
                  secondary={`${dayNames[lesson.dayOfWeek]} | Час: ${lesson.time} | Група: ${lesson.group?.name || 'Без групи'}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="редагувати"
                    onClick={() => handleEditClick(lesson)}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="видалити"
                    onClick={() => handleDeleteClick(lesson.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Заняття не знайдено
          </Typography>
        )}
      </Paper>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Підтвердження видалення</DialogTitle>
        <DialogContent>
          Ви впевнені, що хочете видалити це заняття?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Скасувати</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Видалити
          </Button>
        </DialogActions>
      </Dialog>

      <EditLessonDialog
        open={editDialogOpen}
        lesson={lessonToEdit}
        onClose={handleEditClose}
      />
    </>
  )
} 