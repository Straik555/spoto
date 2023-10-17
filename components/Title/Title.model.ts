import { HTMLAttributes } from 'react'

export type TitleProps = {
  as?: string
  className?: string
  noCap?: boolean
} & HTMLAttributes<
  HTMLSpanElement | HTMLParagraphElement | HTMLHeadingElement | HTMLLabelElement
>
