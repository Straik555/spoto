import { Dayjs } from 'dayjs'
import { AvailabilityCalendar } from '@api/booking/types'

export enum DatePickerVariant {
  BOOKING = 'booking',
  SEARCH = 'search',
  SETTINGS = 'settings',
}

export type DatePickerDialogProps = {
  dayFrom: Date | null
  startDate?: Date | null
  dayTo: Date | null
  modalIsOpen?: boolean
  isPeriod: boolean
  isFetching?: boolean
  closeText?: string
  closeModal: () => void
  onSubmit: (
    startDate: Date,
    dayTo: Date | null,
    startIntervals: string[],
    endIntervals: string[]
  ) => void
  variant: DatePickerVariant
  disabledCondition?: (day: Dayjs) => boolean
  setAvailabilityFromStartDate?: (day: Date | null) => void
  calendarIntervals?: AvailabilityCalendar[]
  title?: string
  timeZone?: string
  backBtnVisible?: boolean
  inline?: boolean
  defaultTitle?: boolean
  noCurrentDate?: boolean
  isDesktop?: boolean
  setIsCalendar?: (n: boolean) => void
  isDisabled?: (value: Dayjs) => boolean
}
