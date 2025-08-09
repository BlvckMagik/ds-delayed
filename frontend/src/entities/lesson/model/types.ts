import { Group } from '@/entities/group'

export interface Lesson {
  id: string
  name: string
  time: string
  groupId: string
  group?: Group
}

export interface CreateLessonRequest {
  name: string
  time: string
  groupId: string
} 