import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import CrossIcon from '@assets/icons/close-10.svg'
import { dateFormats } from '@constants/global'
import { getDateUtil, useDateUtil } from '@hooks/useDateUtil'
import { weekdaysEnumToShortLabel } from '@screens/admin/Users/constants'
import {
  BookingSettingsScheduleCardProps,
  BookingSettingsType,
} from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import classNames from 'classnames'
import React, { FC, useMemo } from 'react'

export const isTimeDefined = (schedule: PlaceAccessSchedule): boolean => {
  return Boolean(schedule.dayTime?.end || schedule.dayTime?.start)
}

export const deriveBookingSettingsType = (
  schedule: PlaceAccessSchedule
): BookingSettingsType => {
  if (schedule.weekDays?.length) {
    return BookingSettingsType.WEEKDAY
  }

  if (!schedule.to) {
    return BookingSettingsType.PERMANENT_ACCESS
  }

  const dateUtil = getDateUtil()
  const from = dateUtil(schedule.from)
  const to = dateUtil(schedule.to)

  if (from.isSame(to)) {
    return BookingSettingsType.SINGLE_DAY
  }

  // Faulty way to derive that times are not set since API always returns 0 for these values
  if (!isTimeDefined(schedule)) {
    return BookingSettingsType.PERMANENT_ACCESS
  }

  return BookingSettingsType.RANGE
}

const BookingSettingsScheduleCard: FC<BookingSettingsScheduleCardProps> = ({
  schedule,
  onDelete,
  className,
  disabled,
  children,
  hideDeleteAction,
}) => {
  const dateUtil = useDateUtil()
  const from = dateUtil(schedule.from)
  const to = schedule.to && dateUtil(schedule.to)
  const fromFormatted = from.format(dateFormats.display0)
  const fromFormatted5 = from.format(dateFormats.display5)
  const toFormatted = to && to.format(dateFormats.display0)
  const bookingType = useMemo(
    () => deriveBookingSettingsType(schedule),
    [schedule]
  )
  const weekday = from.format(dateFormats.day)
  const accessAllDay = useMemo(() => !isTimeDefined(schedule), [schedule])
  const startTime = schedule.dayTime?.start || ''
  const endTime = schedule.dayTime?.end || ''
  const weekdays = schedule.weekDays
    ?.map((wd) => weekdaysEnumToShortLabel[wd])
    .join(', ')

  return (
    <div
      className={classNames(
        className,
        'inline-flex px-2 py-1 bg-blue-4 rounded-md'
      )}
    >
      <div className="block">
        {children}

        {bookingType === BookingSettingsType.PERMANENT_ACCESS && (
          <p className="mb-0 font-semibold text-blue-1 text-s-base">
            {toFormatted ? fromFormatted5 : fromFormatted} -{' '}
            {toFormatted || 'Ongoing'}
          </p>
        )}

        {bookingType === BookingSettingsType.SINGLE_DAY && (
          <div className="block">
            <p className="mb-1 font-semibold text-blue-1 text-s-base">
              {weekday} | {fromFormatted}
            </p>
            <p className="mb-0 text-blue-1 text-s-sm">
              {accessAllDay ? 'Access All Day' : `${startTime} - ${endTime}`}
            </p>
          </div>
        )}

        {bookingType === BookingSettingsType.WEEKDAY && (
          <div className="block">
            <p className="mb-1 font-semibold text-blue-1 text-s-base">
              Every: {weekdays}
            </p>
            <p className="mb-0 text-blue-1 text-s-sm">
              {accessAllDay ? 'Access All Day' : `${startTime} - ${endTime}`}
            </p>
          </div>
        )}

        {bookingType === BookingSettingsType.RANGE && (
          <div className="block">
            <p className="mb-0 font-semibold text-blue-1 text-s-base">
              {fromFormatted5} - {toFormatted || 'Ongoing'}
            </p>
            <p className="mb-0 text-blue-1 text-s-sm">
              {`${toFormatted} - ${endTime}`}
            </p>
          </div>
        )}
      </div>

      {!hideDeleteAction && (
        <CrossIcon
          className={classNames('ml-5 fill-blue-2')}
          onClick={() => !disabled && onDelete?.()}
        />
      )}
    </div>
  )
}

export default BookingSettingsScheduleCard
