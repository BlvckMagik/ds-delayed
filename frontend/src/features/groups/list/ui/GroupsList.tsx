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
import { useGetGroupsQuery } from '@/shared/store/api'

export function GroupsList() {
  const { data: groups, isLoading, error } = useGetGroupsQuery()

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
                secondary={`Meet: ${group.meetLink}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Групи не знайдено
        </Typography>
      )}
    </Paper>
  )
} 