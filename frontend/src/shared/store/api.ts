import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Group {
  id: string
  name: string
  meetLink: string
  chatId: string
}

export interface Lesson {
  id: string
  name: string
  dayOfWeek: number
  time: string
  groupId: string
  group?: Group
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api`
      : 'http://localhost:3001/api'
  }),
  tagTypes: ['Groups', 'Lessons'],
  endpoints: (builder) => ({
    getGroups: builder.query<Group[], void>({
      query: () => 'groups',
      providesTags: ['Groups'],
    }),
    createGroup: builder.mutation<Group, Omit<Group, 'id'>>({
      query: (group) => ({
        url: 'groups',
        method: 'POST',
        body: group,
      }),
      invalidatesTags: ['Groups'],
    }),
    deleteGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Groups'],
    }),
    updateGroup: builder.mutation<Group, { id: string; data: Omit<Group, 'id'> }>({
      query: ({ id, data }) => ({
        url: `groups/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Groups'],
    }),
    getLessons: builder.query<Lesson[], void>({
      query: () => 'lessons',
      providesTags: ['Lessons'],
    }),
    createLesson: builder.mutation<Lesson, Omit<Lesson, 'id' | 'group'>>({
      query: (lesson) => ({
        url: 'lessons',
        method: 'POST',
        body: lesson,
      }),
      invalidatesTags: ['Lessons'],
    }),
    deleteLesson: builder.mutation<void, string>({
      query: (id) => ({
        url: `lessons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lessons'],
    }),
    updateLesson: builder.mutation<Lesson, { id: string; data: Omit<Lesson, 'id' | 'group'> }>({
      query: ({ id, data }) => ({
        url: `lessons/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Lessons'],
    }),
  }),
})

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = api 