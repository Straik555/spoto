import {
  TimeAutocomplete,
  TimeAutocompletePair,
} from '@components/TimeAutocomplete'
import useFindSpotSelector from '@screens/user/FindSpot/FindSpotSelector/useFindSpotSelector'
import { FormikProps, FormikProvider, FormikValues, useFormik } from 'formik'
import React, { FC } from 'react'

export default {
  title: 'Reusable Components/TimeAutocomplete',
  component: TimeAutocomplete,
}

export const DefaultTimeAutocomplete: FC = () => {
  const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
    initialValues: {
      timeFrom: '',
    },
    onSubmit: (values: FormikValues) => console.log(values),
  })
  const [{ intervals }] = useFindSpotSelector()

  return (
    <FormikProvider value={formik}>
      <div className="w-40">
        <TimeAutocomplete
          name="From"
          intervals={intervals}
          endTime={formik.values.timeFrom}
        />
      </div>
    </FormikProvider>
  )
}

export const DefaultTimeAutocompletePair: FC = () => {
  const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
    initialValues: {
      timeFrom: null,
      timeTo: null,
    },
    onSubmit: (values: FormikValues) => console.log(values),
  })
  const [{ intervals }] = useFindSpotSelector()

  return (
    <FormikProvider value={formik}>
      <div className="w-80">
        <TimeAutocompletePair
          intervals={intervals}
          name1="timeFrom"
          label1="From"
          name2="timeTo"
          label2="To"
          classNameWrapper="mt-4"
        />
      </div>
    </FormikProvider>
  )
}
