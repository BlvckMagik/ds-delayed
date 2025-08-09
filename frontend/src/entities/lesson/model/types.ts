import { Group } from '@/entities/group'

export interface Lesson {
  id: string
  name: string
  dayOfWeek: number
  time: string
  groupId: string
  group?: Group
}

export interface CreateLessonRequest {
  name: string
  dayOfWeek: number
  time: string
  groupId: string
} 