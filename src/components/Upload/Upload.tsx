import React, { forwardRef } from 'react'

import classNames from 'classnames'
import type { FieldError } from 'react-hook-form'
import classes from './Upload.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  caption?: string
  error?: FieldError
}

const Upload = forwardRef<HTMLInputElement, Props>(({ className, caption, error, ...props }, ref) => {
  let errorMessage: string | undefined = ''

  switch (error?.type) {
    case 'required':
      errorMessage = 'Field is required'
      break
    default:
      errorMessage = error?.message
      break
  }

  return (
    <label className={classNames(className, classes.input)}>
      <input ref={ref} type="file" {...props} aria-invalid={!!error} className={classes.input__field} />
      <div className={classes.input__button}>Upload</div>
      {(error || caption) && <div className={classes.input__caption}>{errorMessage || caption}</div>}
    </label>
  )
})

export default Upload
