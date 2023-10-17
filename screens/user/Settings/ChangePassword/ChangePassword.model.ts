import { ChangeProfilePasswordArgs } from '@api/profile/types'
import { FormikProps } from 'formik'

export type ChangePasswordFormValues = {
  currentPassword: string
} & ChangeProfilePasswordArgs

export type ChangePasswordState = {
  forgotPasswordModal: boolean
  disabled: boolean
}

export type ChangePasswordActions = {
  toggleForgotPasswordModal: () => void
} & Pick<FormikProps<ChangePasswordFormValues>, 'handleSubmit'>

export type UseChangePassword = () => [
  ChangePasswordState,
  ChangePasswordActions
]
