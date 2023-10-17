import { useMemo, useState } from 'react'

import { msToHumanizedDuration, useDateUtil } from '@hooks/useDateUtil'
import bookingApi from '@api/booking'
import { dateFormats } from '@constants/global'

import { UseMyBookingsCard } from './MyBookingsCard.model'

const useMyBookingsCard: UseMyBookingsCard = (props) => {
  const { ends, id, isDesktop, starts, timeZone, vehicle } = props
  const dateUtil = useDateUtil()
  const { isFetching } =
    bookingApi.endpoints.getBookingAvailabilityExtend.useQueryState(id)
  const [open, setOpen] = useState<boolean>(Boolean(isDesktop))

  const startDate = useMemo(() => dateUtil(starts), [dateUtil, starts])
  const endDate = useMemo(() => dateUtil(ends), [dateUtil, ends])
  const currentMoment = useMemo(() => dateUtil(new Date()), [dateUtil])

  const isInThePast = useMemo(
    () => endDate.isBefore(currentMoment),
    [currentMoment, endDate]
  )

  const isOnGoing = useMemo(
    () => startDate.isBefore(currentMoment) && endDate.isAfter(currentMoment),
    [currentMoment, endDate, startDate]
  )

  const startDateInTimezone = useMemo(
    () => startDate.tz(timeZone),
    [startDate, timeZone]
  )

  const endDateInTimezone = useMemo(
    () => endDate.tz(timeZone),
    [endDate, timeZone]
  )

  const isTheSameDay = useMemo(
    () => startDateInTimezone.isSame(endDateInTimezone, 'day'),
    [endDateInTimezone, startDateInTimezone]
  )

  const formattedStartDate = useMemo(
    () =>
      startDateInTimezone.format(
        isTheSameDay ? dateFormats.display0 : dateFormats.display5
      ),
    [isTheSameDay, startDateInTimezone]
  )

  const formattedEndDate = useMemo(
    () => endDateInTimezone.format(dateFormats.display0),
    [endDateInTimezone]
  )

  const bookingPeriod = useMemo(
    () =>
      isTheSameDay
        ? formattedStartDate
        : `${formattedStartDate} - ${formattedEndDate}`,
    [formattedEndDate, formattedStartDate, isTheSameDay]
  )

  const formattedStartTime = useMemo(
    () => startDateInTimezone.format(dateFormats.timeDisplay0),
    [startDateInTimezone]
  )

  const formattedEndDateTime = useMemo(
    () => endDateInTimezone.format(dateFormats.timeDisplay0),
    [endDateInTimezone]
  )

  const submitDisabled = useMemo(
    () => isFetching || isInThePast,
    [isFetching, isInThePast]
  )

  const humanizedBookingDuration = useMemo(
    () => msToHumanizedDuration(endDate.diff(startDate)),
    [endDate, startDate]
  )

  const vehicleLabel = useMemo(() => {
    if (vehicle) {
      const { brand, licensePlate } = vehicle
      if (brand) {
        return `${licensePlate} - ${brand}`
      }
      return licensePlate
    }
    return ''
  }, [vehicle])

  const state = {
    bookingPeriod,
    formattedStartTime,
    formattedEndDateTime,
    humanizedBookingDuration,
    isOnGoing,
    open,
    submitDisabled,
    vehicleLabel,
  }
  const actions = { setOpen }
  return [state, actions]
}

export default useMyBookingsCard
