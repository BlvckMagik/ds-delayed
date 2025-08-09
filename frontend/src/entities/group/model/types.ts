export interface Group {
  id: string
  name: string
  meetLink: string
  token: string
}

export interface CreateGroupRequest {
  name: string
  meetLink: string
  token: string
} 