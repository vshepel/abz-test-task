import { useEffect, useState } from 'react'
import type { Position } from '@/types/Position.ts'
import { getPositions } from '@/api/position.ts'

function usePositions() {
  const [isLoading, setIsLoading] = useState(true)

  const [positions, setPositions] = useState<Position[]>([])

  useEffect(() => {
    getPositions()
      .then(({ data }) => setPositions(data.positions))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }, [])

  return {
    isLoading,
    positions,
  }
}

export default usePositions
