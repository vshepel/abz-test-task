import React, { forwardRef } from 'react'

import classNames from 'classnames'
import classes from './Radio.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
}

const Radio = forwardRef<HTMLInputElement, Props>(({ className, label, ...props }, ref) => {
  return (
    <label className={classNames(className, classes.input)}>
      <input ref={ref} type="radio" {...props} className={classes.input__field} />
      <span className={classes.input__label}>{label}</span>
    </label>
  )
})

export default Radio
