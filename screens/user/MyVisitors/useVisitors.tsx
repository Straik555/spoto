import { houseApi } from '@api/house'
import bookingApi from '@api/booking'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { AvailabilityCalendar } from '@api/booking/types'

const useVisitors = (appartmentId: number | undefined) => {
  const dateUtil = useDateUtil()
  const { data: guests = [], isFetching: isFetchingVisitors } =
    bookingApi.endpoints.bookingUpcomingForVisitors.useQuery(
      {
        filterByApartmentId: Number(appartmentId),
      },
      {
        skip: !appartmentId,
      }
    )
  const { data: dataHousesApartments = [], isFetching: isFetchingApartments } =
    houseApi.endpoints.getHousesApartmentsByUser.useQuery(null)

  const calculateDate = (
    day: Date | null,
    time: string,
    timeZone: string | undefined
  ) => {
    if (!timeZone?.length) return
    const timeFrom = `${dateUtil(day)
      .tz(timeZone)
      .format(dateFormats.api)}T${time}:00Z`
    return dateUtil(
      `${dateUtil(timeFrom).utc().format(dateFormats.iso8601)}${dateUtil(
        timeFrom
      )
        .tz(timeZone)
        .format('Z')}`
    )
      .utc()
      .format(dateFormats.iso8601Z)
  }

  const intervalStart = (
    calendar: AvailabilityCalendar[],
    day?: Date | string | null
  ): string[] | [] => {
    if (!day) return []
    return calendar?.filter(({ date, intervals }) => {
      if (
        dateUtil(
          `${dateUtil(day)
            .tz(intervals.timeZone)
            .format(dateFormats.api)}T00:00:00`
        ).isSame(dateUtil(date).startOf('day'))
      ) {
        return intervals?.intervals
      }
    })[0]?.intervals?.intervals
  }

  return {
    dataHousesApartments,
    isFetchingApartments,
    guests,
    isFetchingVisitors,
    intervalStart,
    calculateDate,
  }
}

export default useVisitors
