import * as Yup from 'yup'
import { requiredEmailField } from '@screens/auth/Register/validation'

export const inviteUserValidationSchema = Yup.object().shape({
  email: requiredEmailField,
})
