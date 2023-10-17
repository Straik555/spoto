import { CalendarDayAvailability } from '@api/booking/types'
import {
  CalendarDayDate,
  DatePickerProps,
} from '@components/DatePicker/DatePicker.model'
import { tzOrUtc, useDateUtil } from '@hooks/useDateUtil'
import { useState } from 'react'
import { Dayjs, ManipulateType } from 'dayjs'

export const useSingleSelection = (
  dayFrom: Date | string | null | undefined,
  onChange?: (startDate: Date, endDay: Date | null) => void
) => {
  const dateUtil = useDateUtil()
  const [startDay, setStartDay] = useState<Dayjs>(
    dateUtil(dayFrom).startOf('day')
  )

  const changeMonthOrYear = (step: number, type: ManipulateType) => {
    const newDate = startDay.add(step, type)
    setStartDay(newDate)
    onChange?.(newDate.toDate(), null)
  }

  const selectDay = (day) => {
    setStartDay(day)
    onChange?.(day.toDate(), null)
  }

  return {
    startDay,
    changeMonthOrYear,
    selectDay,
  }
}

export const usePeriodSelection = (
  dayFrom: Date | string | null | undefined,
  dayTo: Date | string | null | undefined,
  onChange?: (startDate: Date, endDay: Date | null) => void,
  isPeriod?: boolean,
  isStartDisabled?: boolean
) => {
  const dateUtil = useDateUtil()
  const [startDay, setStartDay] = useState<Dayjs>(
    dateUtil(dayFrom).startOf('day')
  )
  const [endDay, setEndDay] = useState<Dayjs | null>(
    dayTo ? dateUtil(dayTo) : null
  )
  const [endAvailable, setEndAvailable] = useState<boolean>(true)

  const changeMonthOrYear = (step: number, type: ManipulateType) => {
    setStartDay(startDay.add(step, type))
    setEndDay(null)
  }

  const selectDay = (day) => {
    if (
      !isStartDisabled &&
      isPeriod &&
      startDay &&
      endAvailable &&
      (day?.isAfter(startDay) || day?.isSame(startDay, 'day'))
    ) {
      setEndDay(day)
      setEndAvailable(false)
      onChange?.(startDay.toDate(), day.toDate())
    } else {
      if (!isStartDisabled && !isPeriod) {
        setStartDay(day)
        setEndDay(null)
        setEndAvailable(true)
        onChange?.(day.toDate(), null)
      } else {
        setEndDay(day)
        setEndAvailable(false)
        onChange?.(startDay.toDate(), day.toDate())
      }
    }
  }

  return {
    startDay,
    endDay,
    changeMonthOrYear,
    selectDay,
  }
}

export const useDayMetadata = (
  day: CalendarDayDate,
  calendarIntervals: DatePickerProps['calendarIntervals'],
  timeZone: DatePickerProps['timeZone'],
  startDate?: Date | null
) => {
  const dateUtil = useDateUtil()
  const availabilityCalendar = calendarIntervals?.find(({ date }) =>
    day?.isSame(dateUtil(date).startOf('day'))
  )
  const isTaken =
    availabilityCalendar?.availability === CalendarDayAvailability.Booked ||
    (calendarIntervals && !availabilityCalendar)
  const isBeforeStart = calendarIntervals?.length
    ? tzOrUtc(dateUtil(day), timeZone)
        .tz(timeZone)
        .startOf('day')
        .isBefore(tzOrUtc(dateUtil(), timeZone).tz(timeZone).startOf('day'))
    : day?.isBefore(dateUtil(startDate || new Date()).startOf('day'))
  const isHalf =
    availabilityCalendar?.availability ===
    CalendarDayAvailability.FreeStartOrEnd

  return {
    isTaken,
    isBeforeStart,
    isHalf,
  }
}
