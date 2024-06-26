import React from 'react'
import classNames from 'classnames'
import classes from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

function Button({ children, className, ...props }: Props) {
  return (
    <button className={classNames(classes.button, className)} {...props}>{children}</button>
  )
}

export default Button
