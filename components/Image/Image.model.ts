import * as React from 'react'

export type ImageProps = {
  srcKey?: string
  downloadUrl?: string
  className?: string
} & React.ImgHTMLAttributes<HTMLImageElement>
