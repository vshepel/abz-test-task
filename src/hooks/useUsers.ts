import { useEffect, useState } from 'react'
import { getUsers } from '@/api/user'
import type { User } from '@/types/User.ts'

function useUsers(initialPage = 1, initialCount = 6) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [countPerPage] = useState(initialCount)

  const loadUsers = (noStack = false) => {
    setIsLoading(true)

    getUsers(currentPage, countPerPage)
      .then(({ data }) => {
        setUsers(noStack ? data.users : [...users, ...data.users])

        if (!data.links.next_url) {
          setHasMore(false)
        }
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  const reloadList = () => {
    setCurrentPage(1)
    loadUsers(true)
  }

  useEffect(() => {
    loadUsers()
  }, [currentPage, countPerPage])

  return {
    isLoading,
    hasMore,
    users,
    currentPage,
    setCurrentPage,
    reloadList,
  }
}

export default useUsers
