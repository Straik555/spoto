import { dateFormats } from '@constants/global'
import { DateObject, useDateUtil } from '@hooks/useDateUtil'
import { MyBookingEntity } from '@screens/admin/Sets/ServerEntities.model'
import _groupBy from 'lodash/groupBy'
import { useMemo } from 'react'

export const useGroupedBooking = (
  bookings: MyBookingEntity[] = [],
  sortingComparator?: (a: DateObject, b: DateObject) => number
) => {
  const dateUtil = useDateUtil()

  return useMemo(() => {
    if (!bookings.length) return []

    const mappedBookings = bookings
      .map((booking) => {
        const startsDateObj = dateUtil(
          dateUtil(booking.starts)
            .tz(booking.timeZone)
            .format(dateFormats.iso8601)
        )
        return {
          ...booking,
          // treat local time of each booking as local time of the user to sort entries based on local time
          startsDateObj,
        }
      })
      .sort((a, b) => {
        if (sortingComparator)
          return sortingComparator(a.startsDateObj, b.startsDateObj)

        return a.startsDateObj.isAfter(b.startsDateObj) ? -1 : 1
      })

    return Object.entries(
      _groupBy(mappedBookings, (booking) => {
        return booking.startsDateObj.format(dateFormats.display0)
      })
    )
  }, [bookings])
}
