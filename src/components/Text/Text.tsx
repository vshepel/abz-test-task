import React from 'react'

import classNames from 'classnames'

import classes from './Text.module.scss'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function Text({ children, className, ...props }: Props) {
  return (
    <div className={classNames(classes.text, className)} {...props}>
      {children}
    </div>
  )
}

export default Text
