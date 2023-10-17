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

const requiredEmailField = requiredStringField.email(
  'Not valid email format. Example: example@email.com'
)

export const LOGIN_VALIDATION_SCHEMA = createValidationSchema({
  email: requiredEmailField,
  password: requiredStringField,
})
