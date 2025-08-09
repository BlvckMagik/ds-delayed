import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Group {
  id: string
  name: string
  meetLink: string
  token: string
}

export interface Lesson {
  id: string
  name: string
  time: string
  groupId: string
  group?: Group
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
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
    getLessons: builder.query<Lesson[], void>({
      query: () => 'lessons',
      providesTags: ['Lessons'],
    }),
    createLesson: builder.mutation<Lesson, Omit<Lesson, 'id'>>({
      query: (lesson) => ({
        url: 'lessons',
        method: 'POST',
        body: lesson,
      }),
      invalidatesTags: ['Lessons'],
    }),
  }),
})

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useGetLessonsQuery,
  useCreateLessonMutation,
} = api 