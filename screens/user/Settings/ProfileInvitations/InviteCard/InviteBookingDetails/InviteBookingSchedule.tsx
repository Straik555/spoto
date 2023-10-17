import React, { useMemo } from 'react'
import cn from 'classnames'

import { PlaceAccessSchedule } from '@api/sharedPlaces/types'
import { isTimeDefined } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsScheduleCard'
import { dateFormats } from '@constants/global'
import { weekdaysEnumToShortLabel } from '@screens/admin/Users/constants'
import { useDateUtil } from '@hooks/useDateUtil'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

import { BookingScheduleDataCellProps } from './InviteBookingDetails.model'

const BookingScheduleDataCell: React.FC<BookingScheduleDataCellProps> = ({
  containerClassName,
  isDesktop,
  label,
  value,
}) => (
  <div
    className={cn(
      'flex justify-between w-full px-4',
      {
        'py-1': isDesktop,
        'py-[11px]': !isDesktop,
      },
      containerClassName
    )}
  >
    <div className="text-blue-1">{label}</div>
    <div className="font-semibold text-blue-1">{value}</div>
  </div>
)

const InviteBookingSchedule: React.FC<PlaceAccessSchedule> = (props) => {
  const { dayTime, to, weekDays, from } = props
  const dateUtil = useDateUtil()
  const { isDesktop } = useDeviceInfo()
  const accessAllDay = useMemo(() => !isTimeDefined(props), [props])

  const weekdaysList = useMemo(() => {
    if (weekDays?.length) {
      return weekDays.reduce(
        (acc, day, index) =>
          index
            ? `${acc}, ${weekdaysEnumToShortLabel[day]}`
            : weekdaysEnumToShortLabel[day],
        ''
      )
    }
    return ''
  }, [weekDays])

  const time = useMemo(
    () =>
      accessAllDay
        ? 'Access All Day'
        : `${dayTime?.start}-${dayTime?.end || 'Ongoing'}`,
    [accessAllDay, dayTime?.end, dayTime?.start]
  )

  return (
    <div
      className={cn('mx-4 mb-4 border bg-blue-4 border-blue-2 rounded-[5px]', {
        'pb-[10px]': isDesktop,
      })}
    >
      <div
        className={cn('flex justify-center font-semibold py-[10px]', {
          'text-s-lg': isDesktop,
          'tex-s-base text-blue-1 border-b border-b-blue-2': !isDesktop,
        })}
      >
        {dateUtil(from || undefined).format(
          to ? dateFormats.display5 : dateFormats.display0
        )}
        &nbsp;-&nbsp;
        {to ? dateUtil(to).format(dateFormats.display0) : 'Ongoing'}
      </div>
      <div className="flex flex-wrap">
        {!!weekDays?.length && (
          <BookingScheduleDataCell
            containerClassName={isDesktop ? '' : 'border-b border-b-blue-2'}
            isDesktop={isDesktop}
            label="Every: "
            value={weekdaysList}
          />
        )}
        <BookingScheduleDataCell
          isDesktop={isDesktop}
          label="Time: "
          value={time}
        />
      </div>
    </div>
  )
}

export default InviteBookingSchedule
