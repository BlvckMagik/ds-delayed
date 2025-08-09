export interface Group {
  id: string
  name: string
  meetLink: string
  chatId: string
}

export interface CreateGroupRequest {
  name: string
  meetLink: string
  chatId: string
} 