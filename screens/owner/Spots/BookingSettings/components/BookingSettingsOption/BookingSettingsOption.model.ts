import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { Weekdays } from '@api/types'

export enum BookingSettingsType {
  PERMANENT_ACCESS,
  SINGLE_DAY,
  WEEKDAY,
  RANGE,
}

export type BookingSettingsFormValues = {
  type: BookingSettingsType
}

export type BookingSettingsTimeFormValues = {
  accessAllDay: boolean
  timeFrom: string
  timeTo: string
}

export type BookingSettingsOptionProps = {
  className?: string
  onSave?: (schedule: Omit<PlaceAccessSchedule, 'scheduleId'>) => void
  disabled?: boolean
}

export type BookingSettingsOptionPermanentProps = BookingSettingsOptionProps
export type BookingSettingsOptionPermanentFormValues = {
  startDate: string
  onGoing: boolean
  endDate: string
} & BookingSettingsFormValues

export type BookingSettingsOptionSingleProps = BookingSettingsOptionProps
export type BookingSettingsOptionSingleFormValues = {
  startDate: string
} & BookingSettingsFormValues &
  BookingSettingsTimeFormValues

export type BookingSettingsOptionWeekdayProps = BookingSettingsOptionProps
export type BookingSettingsOptionWeekdayFormValues = {
  weekdays: Weekdays[]
} & BookingSettingsFormValues &
  BookingSettingsTimeFormValues

export type BookingSettingsOptionRangeProps = BookingSettingsOptionProps
export type BookingSettingsOptionRangeFormValues = {
  startDate: string
  endDate: string
} & BookingSettingsFormValues &
  BookingSettingsTimeFormValues

export type BookingSettingsScheduleCardProps = {
  schedule: PlaceAccessSchedule
  onDelete?: () => void
  className?: string
  disabled?: boolean
  hideDeleteAction?: boolean
  placeName?: string
}
