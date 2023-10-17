import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)

yup.addMethod(yup.mixed, 'defined', function () {
  return this.test(
    'defined',
    'Please select an option above',
    (value) => value !== undefined
  )
})

const createValidationSchema = (value = {}) => yup.object().shape(value)

export const VEHICLE_VALIDATION_SCHEMA = createValidationSchema({
  brandId: yup.string().required('Brand is required field'),
  licensePlate: yup
    .string()
    .required('License plate is required field')
    .matches(/^[A-Za-z0-9 ]+$/, 'Only alphabets and numbers are allowed')
    .min(6, 'Minimum 6 characters')
    .max(7, 'Maximum 7 characters'),
  electricCarType: yup.string().nullable(true).defined(),
})
