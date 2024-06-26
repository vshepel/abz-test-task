import React from 'react'
import classes from './Container.module.scss'

interface Props {
  children: React.ReactNode
}

function Container({ children }: Props) {
  return (
    <div className={classes.container}>{children}</div>
  )
}

export default Container
