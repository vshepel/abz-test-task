import React, { useState } from 'react'

import classNames from 'classnames'
import classes from './Avatar.module.scss'

import noImage from '@/assets/images/no-photo.svg'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

function Avatar({ className, src, ...props }: Props) {
  const [image, setImage] = useState<string>(src || noImage)

  function onError() {
    setImage(noImage)
  }

  return (
    <img
      className={classNames(classes.avatar, className)}
      src={image}
      onError={onError}
      {...props}
    />
  )
}

export default Avatar
