import dayjs from 'dayjs'
import { Dispatch, SetStateAction } from 'react'
import { Weekdays } from '@api/types'
import { FormikContextType } from 'formik/dist/types'
import { PlaceAccessSchedule } from '@api/sharedPlaces/types'

export type PlaceAvailabilityProps = {
  onChange: (context: FormikContextType<PlaceAvailabilityFormValues>) => void
  schedule: PlaceAccessSchedule | null
}

export type PlaceAvailabilityFormValues = {
  weekdays?: Weekdays[]
  startDate: string
  endDate?: string
  timeFrom?: string
  timeTo?: string
  availableDayType: AvailableDayTypes | -1
}

export enum AvailableDayTypes {
  DAY = 'day',
  RANGE = 'range',
}

export type UsePlaceAvailabilityState = {
  dateUtil: typeof dayjs
  form: FormikContextType<PlaceAvailabilityFormValues>
  isDatePickerOpen: boolean
  isDesktop: boolean
}
export type UsePlaceAvailabilityActions = {
  setIsDatePickerOpen: Dispatch<SetStateAction<boolean>>
}
export type UsePlaceAvailability = (
  props: PlaceAvailabilityProps
) => [UsePlaceAvailabilityState, UsePlaceAvailabilityActions]
