import {
  createValidationSchema,
  requiredNameField,
} from '@screens/auth/Register/validation'

export const EDIT_PROFILE_VALIDATION_SCHEMA = createValidationSchema({
  firstName: requiredNameField,
  lastName: requiredNameField,
})
