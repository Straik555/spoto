import * as Yup from 'yup'

export const optionTimeValidationSchema = Yup.object().shape({
  accessAllDay: Yup.boolean(),
  timeFrom: Yup.string().test({
    name: 'checkTimeFrom',
    message: 'Time must be selected',
    test: function () {
      return !this.parent.accessAllDay
    },
  }),
  timeTo: Yup.string().test({
    name: 'checkTimeTo',
    message: 'Time must be selected',
    test: function () {
      return !this.parent.accessAllDay
    },
  }),
})

export const permanentOptionValidationSchema = Yup.object().shape({
  startDate: Yup.string().required().nullable(),
  onGoing: Yup.boolean(),
  endDate: Yup.string()
    .test({
      name: 'checkEndDate',
      message: 'End date must be selected',
      test: function () {
        return this.parent.onGoing ? true : this.parent.endDate
      },
    })
    .nullable(),
})

export const singleOptionValidationSchema = optionTimeValidationSchema.shape({
  startDate: Yup.string().required().nullable(),
})
export const weekdayOptionValidationSchema = optionTimeValidationSchema.shape({
  weekdays: Yup.array().required(),
})
export const rangeOptionValidationSchema = optionTimeValidationSchema.shape({
  startDate: Yup.string().required().nullable(),
  endDate: Yup.string().required().nullable(),
})
