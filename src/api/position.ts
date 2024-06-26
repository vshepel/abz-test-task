import client from '@/utils/client'
import type { Position } from '@/types/Position.ts'

interface ApiResponse {
  success: boolean
  positions: Position[]
}

export function getPositions() {
  return client.get<ApiResponse>('/positions')
}
