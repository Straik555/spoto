import { DialogProps } from '@components/Dialog/Dialog.model'
import { Dayjs, ManipulateType } from 'dayjs'
import { AvailabilityCalendar } from '@api/booking/types'

export type CalendarDayDate = Dayjs | null

export type DatePickerProps = {
  dayFrom?: Date | null | string
  dayTo?: Date | null
  onChange?: (startDate: Date, endDay: Date | null) => void
  isPeriod?: boolean
  timeZone?: string
  calendarIntervals?: AvailabilityCalendar[] | []
  isDisabled?: (value: Dayjs) => boolean
}

export type BookingDatepickerProps = DatePickerProps & {
  onClickMonth?: (startDate: Date) => void
  isStartDisabled?: boolean
}

export type SearchDatepickerProps = DatePickerProps & {
  startDate?: Date | null
  isInline?: boolean
}

export type BaseDatePickerProps = {
  dayFrom: Dayjs | string
  moveAction: (step: number, type: ManipulateType) => void
  calendarDay?: (day: CalendarDayDate) => JSX.Element
  messages?: JSX.Element | undefined
}

export type DatePickerDialogProps = {
  onSubmit: () => void
  loading?: boolean
} & Omit<DialogProps, 'actions'>
