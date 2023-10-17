import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import CrossIcon from '@assets/icons/close-10.svg'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { isTimeDefined } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsScheduleCard'
import React, { FC, useMemo } from 'react'

const BookingInfo: FC<PlaceAccessSchedule> = (props) => {
  const { from, to, dayTime } = props

  const dateUtil = useDateUtil()

  const accessAllDay = useMemo(() => !isTimeDefined(props), [])

  const { startDate, startDay, startWeekday, endDate } = useMemo(() => {
    const dateFrom = dateUtil(from)
    const dateTo = dateUtil(to)
    return {
      startDate: dateFrom.format(dateFormats.display0),
      startDay: dateFrom.format(dateFormats.display4),
      startWeekday: dateFrom.format(dateFormats.day),
      endDate: dateTo.format(dateFormats.display0),
    }
  }, [from, to])

  return (
    <div className="relative inline-block px-2 mb-1 py-2.5 bg-blue-4 rounded-[5px] min-w-[198px]">
      <span className="absolute top-2.5 right-2.5">
        <CrossIcon />
      </span>
      <div className="flex flex-col justify-between">
        <p className="m-0 font-semibold text-s-base text-blue-1">
          {from === to
            ? `${startWeekday} | ${startDate}`
            : `${startDay} - ${endDate}`}
        </p>
        <p className="m-0 font-medium text-s-sm text-blue-1">
          {accessAllDay
            ? 'Access All Day'
            : `${dayTime?.start || ''} - ${dayTime?.start || ''}`}
        </p>
      </div>
    </div>
  )
}

export default BookingInfo
