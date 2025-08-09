'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useUpdateLessonMutation, useGetGroupsQuery } from '@/shared/store/api'
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

interface EditLessonDialogProps {
  open: boolean
  lesson: Lesson | null
  onClose: () => void
}

export function EditLessonDialog({ open, lesson, onClose }: EditLessonDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    dayOfWeek: 1,
    time: '',
    groupId: '',
  })
  const [updateLesson, { isLoading, error }] = useUpdateLessonMutation()
  const { data: groups } = useGetGroupsQuery()

  useEffect(() => {
    if (lesson) {
      setFormData({
        name: lesson.name,
        dayOfWeek: lesson.dayOfWeek,
        time: lesson.time,
        groupId: lesson.groupId,
      })
    }
  }, [lesson])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lesson) return

    try {
      await updateLesson({ id: lesson.id, data: formData }).unwrap()
      onClose()
    } catch (err) {
      console.error('Failed to update lesson:', err)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редагувати заняття</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Помилка оновлення заняття
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Назва заняття"
            value={formData.name}
            onChange={handleChange('name')}
            margin="normal"
            required
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>День тижня</InputLabel>
            <Select
              value={formData.dayOfWeek}
              label="День тижня"
              onChange={(e) => setFormData(prev => ({ ...prev, dayOfWeek: e.target.value as number }))}
            >
              {dayNames.map((day, index) => (
                <MenuItem key={index} value={index}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Час (HH:MM)"
            value={formData.time}
            onChange={handleChange('time')}
            margin="normal"
            required
            placeholder="14:30"
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Група</InputLabel>
            <Select
              value={formData.groupId}
              label="Група"
              onChange={(e) => setFormData(prev => ({ ...prev, groupId: e.target.value }))}
            >
              {groups?.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Скасувати</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Оновлення...' : 'Оновити'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
} 