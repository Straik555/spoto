import * as Yup from 'yup'
import {
  requiredEmailField,
  requiredNameField,
} from '@screens/auth/Register/validation'

export const invitePersonValidationSchema = Yup.object().shape({
  email: requiredEmailField,
  firstName: requiredNameField,
  lastName: requiredNameField,
})
