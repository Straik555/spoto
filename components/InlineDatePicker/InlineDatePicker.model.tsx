import { FC } from 'react'
import { Dayjs } from 'dayjs'

import { DatePickerDialogProps } from '@components/DatePickerDialog/DatePickerDialog.model'
import { StaticActiveSetFocusFn } from '@hooks/useDetectClickOutside/useDetectClickOutside.model'

export type InlineDatePickerProps = Pick<
  DatePickerDialogProps,
  | 'timeZone'
  | 'calendarIntervals'
  | 'setAvailabilityFromStartDate'
  | 'startDate'
  | 'title'
> & {
  onChange: (value: any) => void
  value?: string
  name: string
  isDisabled?: (value: Dayjs) => boolean
}

export type InlineDatePickerFn = FC<InlineDatePickerProps> &
  StaticActiveSetFocusFn
