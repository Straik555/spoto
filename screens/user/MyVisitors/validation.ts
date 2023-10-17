import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)

const createValidationSchema = (value = {}) => yup.object().shape(value)

const EMAIL_ERROR_MESSAGE = 'Not valid email format. Example: example@email.com'

export const INVITE_EMAIL_VALIDATION_SCHEMA = createValidationSchema({
  inviteSendEmail: yup.string().email(EMAIL_ERROR_MESSAGE),
})
