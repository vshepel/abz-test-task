import classes from './Card.module.scss'

import Text from '@/components/Text/Text.tsx'
import type { User } from '@/types/User.ts'
import Avatar from '@/components/Avatar/Avatar.tsx'
import Tooltip from '@/components/Tooltip/Tooltip.tsx'

interface Props {
  user: User
}

function Card({ user }: Props) {
  return (
    <div className={classes.card}>
      <Avatar src={user.photo} alt={user.name} />
      <Text className={classes.card__text}>
        <p>{user.name}</p>
      </Text>
      <Text className={classes.card__text}>
        <p>{user.position}</p>
        <Tooltip tag="p" content={user.email}>
          {user.email}
        </Tooltip>
        <p>{user.phone}</p>
      </Text>
    </div>
  )
}

export default Card
