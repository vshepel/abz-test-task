import client from '@/utils/client'
import type { User } from '@/types/User.ts'

interface ApiGetUsersResponse {
  success: boolean
  page: number
  total_pages: number
  total_users: number
  count: number
  links: {
    next_url: string | null
    prev_url: string | null
  }
  users: User[]
}

interface ApiPostUsersResponse {
  success: boolean
  user_id: number
  message: string
}

export function getUsers(page = 1, count = 6) {
  return client.get<ApiGetUsersResponse>('/users', {
    params: {
      page,
      count,
    },
  })
}

export function postUser(formData: FormData) {
  return client.post<ApiPostUsersResponse>('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
