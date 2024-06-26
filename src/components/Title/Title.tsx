import React from 'react'

import classNames from 'classnames'
import classes from './Title.module.scss'

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
}

function Title({ tag: Tag = 'h1', className, children, ...props }: Props) {
  return (
    <Tag className={classNames(classes.title, className)} {...props}>
      {children}
    </Tag>
  )
}

export default Title
