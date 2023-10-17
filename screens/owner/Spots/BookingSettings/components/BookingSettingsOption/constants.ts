import {
  BookingSettingsFormValues,
  BookingSettingsOptionPermanentFormValues,
  BookingSettingsOptionRangeFormValues,
  BookingSettingsOptionSingleFormValues,
  BookingSettingsOptionWeekdayFormValues,
  BookingSettingsTimeFormValues,
} from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import { Nullable } from '@constants/types'

export const initialOptionFormValues: Nullable<BookingSettingsFormValues> = {
  type: null,
}

export const initialOptionTimeFormValues: Nullable<BookingSettingsTimeFormValues> =
  {
    accessAllDay: true,
    timeFrom: null,
    timeTo: null,
  }

export const initialPermanentOptionFormValues: Nullable<BookingSettingsOptionPermanentFormValues> =
  {
    startDate: null,
    onGoing: true,
    endDate: null,
    ...initialOptionFormValues,
  }

export const initialSingleOptionFormValues: Nullable<BookingSettingsOptionSingleFormValues> =
  {
    startDate: null,
    ...initialOptionFormValues,
    ...initialOptionTimeFormValues,
  }

export const initialWeekdayOptionFormValues: Nullable<BookingSettingsOptionWeekdayFormValues> =
  {
    weekdays: [],
    ...initialOptionFormValues,
    ...initialOptionTimeFormValues,
  }

export const initialRangeOptionFormValues: Nullable<BookingSettingsOptionRangeFormValues> =
  {
    startDate: null,
    endDate: null,
    ...initialOptionFormValues,
    ...initialOptionTimeFormValues,
  }
