import { HTMLAttributes } from 'react'

export type ScrollbarContainerProps = {
  as?: string
  className?: string
  noCap?: boolean
} & HTMLAttributes<
  | HTMLSpanElement
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLLabelElement
  | HTMLButtonElement
>
