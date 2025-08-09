'use client'

import { Container, Typography, Grid } from '@mui/material'
import { GroupsWidget } from '@/widgets/groups'
import { LessonsWidget } from '@/widgets/lessons'

export function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Відкладені повідомлення Telegram
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <GroupsWidget />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <LessonsWidget />
        </Grid>
      </Grid>
    </Container>
  )
} 