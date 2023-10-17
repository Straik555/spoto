import React, { FC } from 'react'
import cn from 'classnames'
import { Dayjs } from 'dayjs'

import { SearchDatepickerProps } from '@components/DatePicker/DatePicker.model'
import BaseDatePicker from '@components/DatePicker/BaseDatePicker'
import { useDateUtil } from '@hooks/useDateUtil'
import {
  CalendarDay,
  CalendarDayProps,
  EmptyCalendarDay,
} from '@components/DatePicker/CalendarDay'
import {
  useDayMetadata,
  useSingleSelection,
} from '@components/DatePicker/hooks'
import { compareDay } from '@components/DatePicker/utils'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const SearchDatepicker: FC<SearchDatepickerProps> = ({
  dayFrom,
  onChange,
  calendarIntervals,
  timeZone,
  startDate,
  isInline,
  isDisabled,
}) => {
  const { startDay, changeMonthOrYear, selectDay } = useSingleSelection(
    dayFrom,
    onChange
  )

  return (
    <BaseDatePicker
      dayFrom={startDay}
      moveAction={changeMonthOrYear}
      calendarDay={(day) =>
        day ? (
          <SearchCalendarDay
            day={day}
            calendarIntervals={calendarIntervals}
            timeZone={timeZone}
            selectedStartDay={dayFrom}
            onClick={(e) => {
              e.stopPropagation()
              selectDay(day)
            }}
            startDate={startDate}
            isInline={isInline}
            isDisabled={isDisabled}
          />
        ) : (
          <EmptyCalendarDay />
        )
      }
    />
  )
}

export const SearchCalendarDay: FC<
  {
    selectedStartDay: Date | string | null | undefined
    isDisabled?: (value: Dayjs) => boolean
  } & Pick<
    SearchDatepickerProps,
    'calendarIntervals' | 'timeZone' | 'startDate' | 'isInline'
  > &
    CalendarDayProps
> = ({
  day,
  calendarIntervals,
  timeZone,
  selectedStartDay: start,
  onClick,
  startDate,
  isInline,
  isDisabled,
}) => {
  const { isDesktop } = useDeviceInfo()
  const dateUtil = useDateUtil()
  const { isTaken, isBeforeStart } = useDayMetadata(
    day,
    calendarIntervals,
    timeZone,
    startDate
  )

  const { isSameAsStart, isSameAsEnd } = compareDay(dateUtil, day, start, null)

  const disabled = !!isTaken || isBeforeStart || isDisabled?.(day)

  return (
    <CalendarDay
      day={day}
      className={cn('text-primary bg-white text-s-lg font-semibold !p-0', {
        'opacity-50': disabled,
        '!h-[50px]': isDesktop && !isInline,
        '!h-[45px] !w-[45px]': isDesktop && isInline,
        '!text-blue-3': isBeforeStart,
        '!border !border-solid !border-primary':
          !isInline && (isSameAsEnd || isSameAsStart),
        '!bg-primary !text-white': isInline && (isSameAsEnd || isSameAsStart),
      })}
      onClick={onClick}
      disabled={disabled}
    />
  )
}

export default SearchDatepicker
