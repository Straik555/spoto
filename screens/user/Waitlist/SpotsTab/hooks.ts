import { dateFormats } from '@constants/global'
import { DateObject, useDateUtil } from '@hooks/useDateUtil'
import { WaitListSpots } from '@api/waitlist/types'
import _groupBy from 'lodash/groupBy'
import { useMemo } from 'react'

export const useGroupedWaitList = (
  spots: WaitListSpots[] | undefined = [],
  sortingComparator?: (a: DateObject, b: DateObject) => number
) => {
  const dateUtil = useDateUtil()

  return useMemo(() => {
    if (!spots.length) return []

    const mappedBookings = spots
      .map((spot) => {
        const startsDateObj = dateUtil(
          dateUtil(spot.from).format(dateFormats.iso8601)
        )
        return {
          ...spot,
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
      _groupBy(mappedBookings, (spot) => {
        return spot.startsDateObj.format(dateFormats.display0)
      })
    )
  }, [dateUtil, sortingComparator, spots])
}
