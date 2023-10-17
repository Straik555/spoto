import React, { ReactElement } from 'react'
import { TransitionEvents } from '@headlessui/react/dist/components/transitions/transition'

export type DialogProps = {
  title?: string
  className?: string
  classNameOverlay?: string
  actions?: ReactElement
  open?: boolean | undefined
  onClose(): void
  initialRef?: React.MutableRefObject<HTMLElement | null> | undefined
  closeIcon?: boolean
  titleClassName?: string
} & Pick<TransitionEvents, 'afterLeave'>

export type DeleteDialogProps = {
  onSubmit?: () => void
  message?: string
  disabled?: boolean
  className?: string
  classNameMessage?: string
  classNameButton?: string
  confirmTitle?: string
} & DialogProps

export type SuccessDialogProps = {
  buttonTitle: string
  title: string
  subTitle: string
  isOpen: boolean
  closeModal: () => void
  onSubmit: () => void
  link?: string | null
}
