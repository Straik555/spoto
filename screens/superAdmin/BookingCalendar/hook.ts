import { AdminBookingInfo } from '@api/booking/types'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import {
  BookingType,
  GridCell,
  GridCellSetHeader,
  GridCellSpotHeader,
  GridCellType,
} from '@screens/superAdmin/BookingCalendar/BookingCalendar.model'
import _groupBy from 'lodash/groupBy'
import _uniq from 'lodash/uniq'
import { useMemo } from 'react'

export const useBookingCalendarIntervals = () => {
  const dateUtil = useDateUtil()

  return useMemo(
    () =>
      Array.from(Array(25).keys()).flatMap((v, hour) => {
        if (hour === 24) {
          return dateUtil().hour(24).minute(0).format(dateFormats.timeDisplay0)
        }

        return [0, 15, 30, 45].map((minute) => {
          return dateUtil()
            .hour(hour)
            .minute(minute)
            .format(dateFormats.timeDisplay0)
        })
      }),
    [dateUtil]
  )
}

export const useBookingToGridData = (data: AdminBookingInfo[]) => {
  const dateUtil = useDateUtil()
  const intervals = useBookingCalendarIntervals()

  return useMemo(() => {
    const sets = (
      Object.values(_groupBy(data, 'setId')) as AdminBookingInfo[][]
    ).map((bookings) => {
      return Object.values(_groupBy(bookings, 'spotId')) as AdminBookingInfo[][]
    })

    return sets.flatMap((spots) => {
      const setName = spots[0][0].setName

      return spots.map((bookings, colIndex) => {
        const spotName = bookings[0].spotName
        const hasSetCell = colIndex === 0
        const timeSlotCells: GridCell[] = []

        for (let rowIndex = 0; rowIndex < intervals.length; rowIndex++) {
          const interval = intervals[rowIndex]
          const booking = bookings.find((v) => {
            return (
              dateUtil(v.booking.starts)
                .tz(v.booking.timeZone)
                .format(dateFormats.timeDisplay0) === interval
            )
          })

          if (booking) {
            const finishRowIndex = intervals.indexOf(
              dateUtil(booking.booking.ends)
                .tz(booking.booking.timeZone)
                .format(dateFormats.timeDisplay0)
            )
            const skipNRows = finishRowIndex - rowIndex

            timeSlotCells.push({
              type: GridCellType.TIMESLOT,
              span: skipNRows + 1,
              bookingType: BookingType.BOOKED,
              idx: `${colIndex}|${rowIndex + 2}`,
              data: booking,
            })

            for (let i = 0; i < skipNRows; i++) {
              timeSlotCells.push({
                type: GridCellType.HIDDEN_TIMESLOT,
                idx: `${colIndex}|${rowIndex + 2}`,
              })
              rowIndex++
            }

            continue
          }

          timeSlotCells.push({
            span: 1,
            type: GridCellType.TIMESLOT,
            idx: `${colIndex}|${rowIndex + 2}`,
            bookingType: BookingType.FREE,
          })
        }

        const spotHeaderCell: GridCellSpotHeader = {
          title: spotName,
          type: GridCellType.SPOT_HEADER,
          idx: `${colIndex}|1`,
        }
        const setHeaderCells: GridCellSetHeader[] = []

        if (hasSetCell) {
          setHeaderCells.push({
            title: setName,
            span: spots.length,
            type: GridCellType.SET_HEADER,
            idx: `${colIndex}|0`,
          } as GridCellSetHeader)
        }

        return [...setHeaderCells, ...[spotHeaderCell, ...timeSlotCells]]
      })
    })
  }, [data, intervals, dateUtil])
}
