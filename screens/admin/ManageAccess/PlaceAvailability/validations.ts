import * as Yup from 'yup'

export const placeAvailabilityValidationSchema = Yup.object().shape({
  weekdays: Yup.array()
    .required('Weekdays field must have at least 1 item')
    .min(1),
  startDate: Yup.string().required('Start Date is a required field'),
  endDate: Yup.string().required('End Date is a required field'),
  timeFrom: Yup.string().required(),
  timeTo: Yup.string().required(),
})
