import React, { forwardRef } from 'react'

import classNames from 'classnames'
import type { FieldError } from 'react-hook-form'
import classes from './Input.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  caption?: string
  error?: FieldError
}

const Input = forwardRef<HTMLInputElement, Props>(({ className, label, caption, error, minLength, maxLength, ...props }, ref) => {
  return (
    <label className={classNames(className, classes.input)}>
      <input ref={ref} type="text" {...props} aria-invalid={!!error} className={classes.input__field} placeholder=" " />
      {label && <span className={classes.input__label}>{label}</span>}
      {(error || caption) && <div className={classes.input__caption}>{error?.message || caption}</div>}
    </label>
  )
})

export default Input
