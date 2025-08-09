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
import { useGetGroupsQuery, useDeleteGroupMutation } from '@/shared/store/api'
import { EditGroupDialog } from '@/features/groups/edit'
import { Group } from '@/entities/group'

export function GroupsList() {
  const { data: groups, isLoading, error } = useGetGroupsQuery()
  const [deleteGroup] = useDeleteGroupMutation()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null)

  const handleDeleteClick = (groupId: string) => {
    setGroupToDelete(groupId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (groupToDelete) {
      try {
        await deleteGroup(groupToDelete).unwrap()
        setDeleteDialogOpen(false)
        setGroupToDelete(null)
      } catch (error) {
        console.error('Помилка видалення групи:', error)
      }
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setGroupToDelete(null)
  }

  const handleEditClick = (group: Group) => {
    setGroupToEdit(group)
    setEditDialogOpen(true)
  }

  const handleEditClose = () => {
    setEditDialogOpen(false)
    setGroupToEdit(null)
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
          Помилка завантаження груп
        </Alert>
      </Paper>
    )
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Список груп
        </Typography>
        
        {groups && groups.length > 0 ? (
          <List>
            {groups.map((group) => (
              <ListItem key={group.id} divider>
                <ListItemText
                  primary={group.name}
                  secondary={`Meet: ${group.meetLink} | Chat ID: ${group.chatId}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="редагувати"
                    onClick={() => handleEditClick(group)}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="видалити"
                    onClick={() => handleDeleteClick(group.id)}
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
            Групи не знайдено
          </Typography>
        )}
      </Paper>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Підтвердження видалення</DialogTitle>
        <DialogContent>
          Ви впевнені, що хочете видалити цю групу? Це також видалить всі пов&apos;язані заняття.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Скасувати</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Видалити
          </Button>
        </DialogActions>
      </Dialog>

      <EditGroupDialog
        open={editDialogOpen}
        group={groupToEdit}
        onClose={handleEditClose}
      />
    </>
  )
} 