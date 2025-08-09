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
import { DateTimePicker } from '@/shared/ui/DateTimePicker'
import { useCreateLessonMutation, useGetGroupsQuery } from '@/shared/store/api'
import { CreateLessonRequest } from '@/entities/lesson'

export function CreateLessonForm() {
  const [formData, setFormData] = useState<CreateLessonRequest>({
    name: '',
    time: '',
    groupId: '',
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  const [createLesson, { isLoading, error }] = useCreateLessonMutation()
  const { data: groups } = useGetGroupsQuery()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate) return
    
    try {
      await createLesson({
        ...formData,
        time: selectedDate.toISOString(),
      }).unwrap()
      setFormData({ name: '', time: '', groupId: '' })
      setSelectedDate(null)
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
        
        <DateTimePicker
          label="Час заняття"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          required
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
          disabled={isLoading || !selectedDate}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Створення...' : 'Створити заняття'}
        </Button>
      </Box>
    </Paper>
  )
} 