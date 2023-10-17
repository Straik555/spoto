import * as yup from 'yup'
import { withForm } from '@components/Form/withForm'
import {
  createValidationSchema,
  requiredPasswordField,
} from '@screens/auth/Register/validation'

export const CHANGE_PASSWORD_VALIDATION_SCHEMA = createValidationSchema({
  currentPassword: requiredPasswordField,
  newPassword: requiredPasswordField.oneOf(
    [yup.ref('confirmNewPassword'), null],
    'Passwords do not match'
  ),
  confirmNewPassword: requiredPasswordField.oneOf(
    [yup.ref('newPassword'), null],
    'Passwords do not match'
  ),
})

const withChangePasswordForm = (Component) =>
  withForm(
    {
      initialValues: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      isInitialValid: false,
      validationSchema: CHANGE_PASSWORD_VALIDATION_SCHEMA,
      className: 'h-full',
    },
    Component
  )

export default withChangePasswordForm
