import {
  CalendarDay,
  EmptyCalendarDay,
} from '@components/DatePicker/CalendarDay'
import React, { FC, useMemo } from 'react'
import cn from 'classnames'
import { Dayjs } from 'dayjs'
import { BaseDatePickerProps } from '@components/DatePicker/DatePicker.model'
import { useDateUtil } from '@hooks/useDateUtil'
import ArrowLeftBig from '@assets/icons/arrows/arrow-left.svg'
import ArrowRightBig from '@assets/icons/arrows/arrow-right.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const BaseDatePicker: FC<BaseDatePickerProps> = ({
  dayFrom,
  messages,
  calendarDay,
  moveAction,
}) => {
  const { isDesktop } = useDeviceInfo()
  const dateUtil = useDateUtil()

  const calendar = useMemo(() => {
    const startOfMonth = dateUtil(dayFrom).startOf('month')
    let difference = startOfMonth.get('day') * -1
    const calendar: (Dayjs | null)[][] = []
    let generated = false
    while (!generated) {
      const week = [...Array(7)].map(() => {
        const value = startOfMonth.add(difference, 'days')
        generated = calendar.length >= 4 && value.get('date') <= 7
        difference = difference + 1
        return difference <= 0 || generated ? null : value
      })
      calendar.push(week)
    }
    return calendar
  }, [dayFrom])

  return (
    <>
      <div className="flex justify-center items-center mb-[20px]">
        <div className="flex items-center">
          <button onClick={() => moveAction(-1, 'month')}>
            <ArrowLeftBig className="stroke-blue-3" />
          </button>
          <div className="font-semibold mx-[15px] text-s-lg text-primary">
            {dateUtil(dayFrom).format('MMMM')}
          </div>
          <button onClick={() => moveAction(1, 'month')}>
            <ArrowRightBig className="stroke-blue-3" />
          </button>
        </div>
        <div
          className={cn('flex items-center', {
            'ml-[25px]': !isDesktop,
            'ml-[60px]': isDesktop,
          })}
        >
          <button onClick={() => moveAction(-1, 'year')}>
            <ArrowLeftBig className="stroke-blue-3" />
          </button>
          <div className="font-semibold mx-[15px] text-s-lg text-primary">
            {dateUtil(dayFrom).format('YYYY')}
          </div>
          <button onClick={() => moveAction(1, 'year')}>
            <ArrowRightBig className="stroke-blue-3" />
          </button>
        </div>
      </div>
      <div className="bg-white">
        <div className="flex justify-between">
          {weekDays.map((item) => (
            <div
              key={item}
              className={cn(
                'flex items-center justify-center m-0 py-[3px] font-medium bg-transparent text-blue-3 font-semibold',
                {
                  'h-[45px] w-[45px] text-s-sm': !isDesktop,
                  'h-[50px] w-[71px] text-s-base uppercase': isDesktop,
                }
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          {calendar.map((week: (Dayjs | null)[], index: number) => (
            <div key={index} className="flex justify-between">
              {week.map((day: Dayjs | null, index: number) =>
                calendarDay ? (
                  calendarDay(day)
                ) : day ? (
                  <CalendarDay key={index} day={day} />
                ) : (
                  <EmptyCalendarDay key={index} />
                )
              )}
            </div>
          ))}
          {messages}
        </div>
      </div>
    </>
  )
}

export default BaseDatePicker
