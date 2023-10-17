import * as yup from 'yup'

export const createValidationSchema = (value = {}) => yup.object().shape(value)

export const INVITATION_VALIDATION_SHEMA = createValidationSchema({
  plateNumber: yup
    .string()
    .required('Plate Number is a required field')
    .matches(/^[A-Za-z0-9 ]+$/, 'Only alphabets and numbers are allowed')
    .min(6, 'Minimum 6 characters')
    .max(7, 'Maximum 7 characters'),
})
