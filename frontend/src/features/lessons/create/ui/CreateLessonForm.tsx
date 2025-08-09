'use client'

import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useCreateLessonMutation, useGetGroupsQuery } from '@/shared/store/api'
import { CreateLessonRequest } from '@/entities/lesson'

const dayNames = [
  'Неділя',
  'Понеділок', 
  'Вівторок',
  'Середа',
  'Четвер',
  'П\'ятниця',
  'Субота'
]

export function CreateLessonForm() {
  const [formData, setFormData] = useState<CreateLessonRequest>({
    name: '',
    dayOfWeek: 1,
    time: '',
    groupId: '',
  })
  
  const [createLesson, { isLoading, error }] = useCreateLessonMutation()
  const { data: groups } = useGetGroupsQuery()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await createLesson(formData).unwrap()
      setFormData({ name: '', dayOfWeek: 1, time: '', groupId: '' })
    } catch (err) {
      console.error('Failed to create lesson:', err)
    }
  }

  const handleChange = (field: keyof CreateLessonRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Створити заняття
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Помилка створення заняття
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
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
        
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Створення...' : 'Створити заняття'}
        </Button>
      </Box>
    </Paper>
  )
} 