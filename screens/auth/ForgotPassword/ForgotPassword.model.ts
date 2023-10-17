import { Dispatch, SetStateAction } from 'react'

import { DialogProps } from '@components/Dialog/Dialog.model'

export type ForgotPasswordModalProps = Pick<DialogProps, 'onClose'>
export type ForgotPasswordSuccessProps = {
  isDesktop: boolean
  userEmail: string
}

export type UseForgotPasswordState = {
  disabled: boolean
  isDesktop: boolean
  isSuccess: boolean
  userEmail: string
  submitFailed: boolean
}
export type UseForgotPasswordActions = {
  handleSubmit: () => void
  setSubmitFailed: Dispatch<SetStateAction<boolean>>
}
export type UseForgotPassword = () => [
  UseForgotPasswordState,
  UseForgotPasswordActions
]
