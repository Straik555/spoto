import * as Yup from 'yup'
import { requiredNameField } from '@screens/auth/Register/validation'

export const changeNameGroupValidationSchema = Yup.object().shape({
  groupName: requiredNameField,
})
