import BaseDatePicker from '@components/DatePicker/BaseDatePicker'
import {
  CalendarDay,
  CalendarDayProps,
  EmptyCalendarDay,
} from '@components/DatePicker/CalendarDay'
import { BookingDatepickerProps } from '@components/DatePicker/DatePicker.model'
import {
  useDayMetadata,
  useSingleSelection,
} from '@components/DatePicker/hooks'
import { compareDay } from '@components/DatePicker/utils'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { DateObject, useDateUtil } from '@hooks/useDateUtil'
import cn from 'classnames'
import React, { FC } from 'react'

const BookingDatepicker: FC<BookingDatepickerProps> = ({
  dayFrom,
  onChange,
  calendarIntervals,
  timeZone,
  onClickMonth,
}) => {
  const { isDesktop } = useDeviceInfo()
  const { startDay, changeMonthOrYear, selectDay } = useSingleSelection(
    dayFrom,
    onChange
  )

  return (
    <BaseDatePicker
      dayFrom={startDay}
      moveAction={(step, type) => {
        changeMonthOrYear(step, type)
        onClickMonth?.(startDay.add(step, type).toDate())
      }}
      calendarDay={(day) =>
        day ? (
          <BookingCalendarDay
            day={day}
            calendarIntervals={calendarIntervals}
            timeZone={timeZone}
            selectedStartDay={startDay}
            onClick={() => selectDay(day)}
          />
        ) : (
          <EmptyCalendarDay />
        )
      }
      messages={
        <>
          <div className="flex items-center mt-[20px] text-green">
            <span className="mr-[8px] rounded-full w-[10px] h-[10px] bg-green" />
            <p
              className={cn('mb-0 text-base font-medium font-semibold', {
                '!text-xs': !isDesktop,
              })}
            >
              All Times Available
            </p>
          </div>
          <div className="flex items-center mt-[5px] text-orange">
            <span className="mr-[8px] rounded-full w-[10px] h-[10px] bg-orange" />
            <p
              className={cn('mb-0 text-s-lg font-medium font-semibold', {
                '!text-s-sm': !isDesktop,
              })}
            >
              Partial Availability
            </p>
          </div>
          <div className="flex items-center mt-[5px] text-red">
            <span className="mr-[8px] rounded-full w-[10px] h-[10px] bg-red" />
            <p
              className={cn('mb-0 text-s-lg font-medium font-semibold', {
                '!text-s-sm': !isDesktop,
              })}
            >
              No Availability
            </p>
          </div>
        </>
      }
    />
  )
}

export const BookingCalendarDay: FC<
  {
    selectedStartDay: DateObject | null | undefined
  } & Pick<BookingDatepickerProps, 'calendarIntervals' | 'timeZone'> &
    CalendarDayProps
> = ({
  day,
  calendarIntervals,
  timeZone,
  selectedStartDay: start,
  onClick,
}) => {
  const dateUtil = useDateUtil()
  const { isTaken, isBeforeStart, isHalf } = useDayMetadata(
    day,
    calendarIntervals,
    timeZone
  )
  const { isSameAsStart } = compareDay(dateUtil, day, start, null)
  const isDisabled = isBeforeStart
  const isAvailable = !isTaken && !isHalf && !isDisabled
  const isHalfAvailable = isHalf && !isAvailable
  const isUnavailable = isDisabled || (!isAvailable && !isHalfAvailable)

  return (
    <CalendarDay
      day={day}
      className={cn({
        'border border-solid': isSameAsStart,
        'border-green': isAvailable,
        'border-orange': isHalfAvailable,
        '!bg-light-green text-green': isAvailable,
        'bg-light-orange text-orange': isHalfAvailable,
        '!bg-light-red text-red': isUnavailable,
      })}
      disabled={isDisabled}
      onClick={onClick}
    />
  )
}

export default BookingDatepicker
