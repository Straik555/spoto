import * as yup from 'yup'
import YupPassword from 'yup-password'

import { DEFAULT_PHONE_CODE } from '@components/Form/Input/PhoneInput/constants'

YupPassword(yup)

const createValidationSchema = (value = {}) => yup.object().shape(value)

const requiredStringField = yup.string().required(({ path }) => {
  const letters = path.replace(/([A-Z])/g, ' $1')
  const [firstLetter, ...restLetters] = letters
  return `${firstLetter.toUpperCase()}${restLetters.join(
    ''
  )} is a required field`
})

export const VERIFY_PHONE_VALIDATION_SCHEMA = createValidationSchema({
  phone: requiredStringField
    .test({
      message: 'Number must begin with a “0” or “4”',
      test: function () {
        const { phone } = this.parent
        const isAustralia = phone.slice(0, 2) === DEFAULT_PHONE_CODE
        if (isAustralia) {
          const thirdChar = phone.at(2)
          if (!thirdChar) {
            return true
          }
          return thirdChar === '0' || thirdChar === '4'
        }
        return true
      },
    })
    .test({
      message: 'Number must contain 9 digits',
      test: function () {
        const { phone } = this.parent
        const isAustralia = phone.slice(0, 2) === DEFAULT_PHONE_CODE
        if (isAustralia) {
          const thirdChar = phone.at(2)
          if (!thirdChar) {
            return false
          }
          const isFourth = thirdChar === '4'
          if (!isFourth) {
            return true
          }
          return phone.length === 11
        }
        return true
      },
    })
    .test({
      message: 'Number must contain 10 digits',
      test: function () {
        const { phone } = this.parent
        const isAustralia = phone.slice(0, 2) === DEFAULT_PHONE_CODE
        if (isAustralia) {
          const thirdChar = phone.at(2)
          if (!thirdChar) {
            return false
          }
          const isZero = thirdChar === '0'
          if (!isZero) {
            return true
          }
          return phone.length === 12
        }
        return true
      },
    }),
})
