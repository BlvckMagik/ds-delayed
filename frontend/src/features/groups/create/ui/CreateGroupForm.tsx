'use client'

import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from '@mui/material'
import { useCreateGroupMutation } from '@/shared/store/api'
import { CreateGroupRequest } from '@/entities/group'

export function CreateGroupForm() {
  const [formData, setFormData] = useState<CreateGroupRequest>({
    name: '',
    meetLink: '',
    token: '',
  })
  const [createGroup, { isLoading, error }] = useCreateGroupMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createGroup(formData).unwrap()
      setFormData({ name: '', meetLink: '', token: '' })
    } catch (err) {
      console.error('Failed to create group:', err)
    }
  }

  const handleChange = (field: keyof CreateGroupRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Створити групу
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Помилка створення групи
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Назва групи"
          value={formData.name}
          onChange={handleChange('name')}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Посилання на Meet"
          value={formData.meetLink}
          onChange={handleChange('meetLink')}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Telegram токен"
          value={formData.token}
          onChange={handleChange('token')}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Створення...' : 'Створити групу'}
        </Button>
      </Box>
    </Paper>
  )
} 