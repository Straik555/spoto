import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)

const createValidationSchema = (value = {}) => yup.object().shape(value)

const requiredStringField = yup.string().required(({ path }) => {
  const letters = path.replace(/([A-Z])/g, ' $1')
  const [firstLetter, ...restLetters] = letters
  return `${firstLetter.toUpperCase()}${restLetters.join(
    ''
  )} is a required field`
})

const requiredPasswordField = requiredStringField.min(6, 'Minimum 6 characters')

export const RESET_PASSWORD_VALIDATION_SCHEMA = createValidationSchema({
  newPassword: requiredPasswordField,
  confirmNewPassword: requiredPasswordField.oneOf(
    [yup.ref('newPassword'), null],
    'Passwords do not match'
  ),
})
