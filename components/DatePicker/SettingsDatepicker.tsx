import React, { FC } from 'react'
import cn from 'classnames'
import { DatePickerProps } from '@components/DatePicker/DatePicker.model'
import BaseDatePicker from '@components/DatePicker/BaseDatePicker'
import { useDateUtil } from '@hooks/useDateUtil'
import { Dayjs } from 'dayjs'
import {
  CalendarDay,
  CalendarDayProps,
  EmptyCalendarDay,
} from '@components/DatePicker/CalendarDay'
import {
  useDayMetadata,
  usePeriodSelection,
} from '@components/DatePicker/hooks'
import { compareDay } from '@components/DatePicker/utils'

const SettingsDatepicker: FC<DatePickerProps> = ({
  dayFrom,
  dayTo,
  isPeriod,
  onChange,
  calendarIntervals,
  timeZone,
  isDisabled,
}) => {
  const { startDay, endDay, changeMonthOrYear, selectDay } = usePeriodSelection(
    dayFrom,
    dayTo,
    onChange,
    isPeriod
  )

  return (
    <BaseDatePicker
      dayFrom={startDay}
      moveAction={changeMonthOrYear}
      calendarDay={(day) =>
        day ? (
          <SettingsCalendarDay
            day={day}
            calendarIntervals={calendarIntervals}
            timeZone={timeZone}
            selectedStartDay={dayFrom}
            selectedEndDay={endDay}
            onClick={() => selectDay(day)}
            isDisabled={isDisabled}
          />
        ) : (
          <EmptyCalendarDay />
        )
      }
    />
  )
}

export const SettingsCalendarDay: FC<
  {
    selectedStartDay: Date | string | null | undefined
    selectedEndDay: Dayjs | null
    isDisabled?: (value: Dayjs) => boolean
  } & Pick<DatePickerProps, 'calendarIntervals' | 'timeZone'> &
    CalendarDayProps
> = ({
  day,
  calendarIntervals,
  timeZone,
  selectedStartDay: start,
  selectedEndDay: end,
  onClick,
  isDisabled,
}) => {
  const dateUtil = useDateUtil()
  const { isTaken, isBeforeStart } = useDayMetadata(
    day,
    calendarIntervals,
    timeZone
  )

  const disabled = !!isTaken || isBeforeStart || isDisabled?.(day)
  const { isSameAsStart, isSameAsEnd, isAfterStart, isBeforeEnd } = compareDay(
    dateUtil,
    day,
    start,
    end
  )

  return (
    <CalendarDay
      day={day}
      className={cn({
        'opacity-50': disabled,
        '!bg-primary !rounded-full !text-white': isSameAsStart && !end,
        'relative text-white rounded-r-[100%] !bg-blue-3 z-[1] after:content-[" "] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:!bg-primary after:z-[-1] after:rounded-full':
          isSameAsEnd,
        'relative text-white rounded-l-[100%] !bg-blue-3 z-[1] after:content-[" "] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:!bg-primary after:z-[-1] after:rounded-full':
          isSameAsStart && end,
        '!bg-blue-3 text-black': isAfterStart && isBeforeEnd,
      })}
      onClick={onClick}
      disabled={disabled}
    />
  )
}

export default SettingsDatepicker
