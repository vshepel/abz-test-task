import classes from './UserList.module.scss'
import Card from '@/components/Card/Card.tsx'
import Loader from '@/components/Loader/Loader.tsx'
import Button from '@/components/Button/Button.tsx'
import type { User } from '@/types/User.ts'

interface Props {
  users: User[]
  currentPage: number
  isLoading?: boolean
  hasMore?: boolean
  onLoadMore: (page: number) => void
}

function UserList({ users, currentPage, isLoading, hasMore, onLoadMore }: Props) {
  return (
    <>
      <div className={classes.users__list}>
        {users.length > 0 && users.map(user => (<Card user={user} key={user.id} />))}
        {isLoading && <div className={classes.users__loader}><Loader /></div>}
      </div>
      {hasMore && (
        <Button
          className={classes.users__button}
          onClick={() => onLoadMore(currentPage + 1)}
          disabled={isLoading}
        >
          Show more
        </Button>
      )}
    </>
  )
}

export default UserList
