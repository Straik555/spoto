import * as Yup from 'yup'

export const manageSpotValidationSchema = Yup.object().shape({
  spotName: Yup.string().required(),
  location: Yup.string().required(),
  longitude: Yup.number().required(),
  latitude: Yup.number().required(),
  hourlyRate: Yup.number()
    .nullable()
    .test({
      message: 'Hourly rate must be set',
      test: function () {
        return this.parent.hasHourlyRate
          ? this.parent.hourlyRate !== null
          : true
      },
    }),
  dailyRate: Yup.number()
    .nullable()
    .test({
      message: 'Hourly rate must be set',
      test: function () {
        return this.parent.hasDailyRate
          ? Number(this.parent.hourlyRate) > 0
          : true
      },
    }),
  weeklyRate: Yup.number()
    .nullable()
    .test({
      message: 'Hourly rate must be set',
      test: function () {
        return this.parent.hasWeeklyRate
          ? Number(this.parent.hourlyRate) > 0
          : true
      },
    }),
  electricCharger: Yup.object().test({
    message: 'Electric charger must be selected',
    test: function () {
      return this.parent.hasElectricCharger
        ? this.parent.electricCharger.type1 || this.parent.electricCharger.type2
        : true
    },
  }),
  spollardId: Yup.number().nullable().required(),
  spotDescription: Yup.string().max(250),
  maximumVehicleHeight: Yup.number().nullable().required(),
})
