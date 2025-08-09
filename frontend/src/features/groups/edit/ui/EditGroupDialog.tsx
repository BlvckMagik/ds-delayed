'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useUpdateGroupMutation } from '@/shared/store/api'
import { Group } from '@/entities/group'

interface EditGroupDialogProps {
  open: boolean
  group: Group | null
  onClose: () => void
}

export function EditGroupDialog({ open, group, onClose }: EditGroupDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    meetLink: '',
    chatId: '',
  })
  const [updateGroup, { isLoading, error }] = useUpdateGroupMutation()

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        meetLink: group.meetLink,
        chatId: group.chatId,
      })
    }
  }, [group])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!group) return

    try {
      await updateGroup({ id: group.id, data: formData }).unwrap()
      onClose()
    } catch (err) {
      console.error('Failed to update group:', err)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редагувати групу</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Помилка оновлення групи
            </Alert>
          )}
          
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
            label="Chat ID"
            value={formData.chatId}
            onChange={handleChange('chatId')}
            margin="normal"
            required
            placeholder="-1001234567890"
            helperText="ID чату або групи в Telegram"
          />
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