import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useFormikContext } from 'formik'

import { BookingGuestResponse, CancellationReason } from '@api/booking/types'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { useDateUtil } from '@hooks/useDateUtil'
import { useRouter } from 'next/router'
import bookingApi from '@api/booking'
import { ROUTES } from '@constants/routes'

import { InvitationFormValues, UseInvitation } from './Invitation.model'

const useInvitation: UseInvitation = () => {
  const { values, isValid } = useTypedFormikContext<InvitationFormValues>()
  const dateUtil = useDateUtil()
  const router = useRouter()
  const form = useFormikContext()

  const {
    data: bookingGuest = {} as BookingGuestResponse,
    isFetching: isFetchingBookingGuest,
    isError: isErrorBookingGuest,
  } = bookingApi.endpoints.getBookingGuest.useQuery(
    String(router.query.bookingReferenceId),
    {
      skip: !router.query.bookingReferenceId,
    }
  )

  const {
    cancellationReason = '',
    ends = '',
    referenceId: bookingReferenceId = '',
    starts = '',
    timeZone = '',
    vehicleLP,
  } = bookingGuest

  const [
    cancelGuest,
    {
      isLoading: isLoadingCancelGuest,
      isError: isErrorCancelGuest,
      error: errorCancelGuest,
    },
  ] = bookingApi.endpoints.cancelGuest.useMutation()

  const [
    updateGuest,
    { isLoading: isLoadingUpdateGuest, isSuccess: isSuccessUpdateGuest },
  ] = bookingApi.endpoints.updateGuest.useMutation()

  useEffect(() => {
    const { isReady, query } = router
    if (isReady && !query.bookingReferenceId) {
      router.push({ pathname: ROUTES.HOME })
    }
  }, [router])

  useEffect(() => {
    if (isErrorCancelGuest) {
      toast.error((errorCancelGuest as any)?.data?.message)
    }
  }, [errorCancelGuest, isErrorCancelGuest])

  useEffect(() => {
    if (isSuccessUpdateGuest) {
      toast.success('Plate number successfully updated!')
    }
  }, [isSuccessUpdateGuest])

  const { startDate, endDate } = useMemo(() => {
    const startDate = dateUtil(starts).tz(timeZone)
    const endDate = dateUtil(ends).tz(timeZone)
    return {
      endDate,
      startDate,
    }
  }, [dateUtil, ends, starts, timeZone])

  const loading = useMemo(
    () =>
      isFetchingBookingGuest || isLoadingCancelGuest || isLoadingUpdateGuest,
    [isFetchingBookingGuest, isLoadingCancelGuest, isLoadingUpdateGuest]
  )

  const handleCancelGuest = useCallback(() => {
    cancelGuest(bookingReferenceId)
  }, [cancelGuest, bookingReferenceId])

  const handleSubmit = useCallback(() => {
    updateGuest({
      bookingReferenceId,
      vehicleLP: values.plateNumber.toUpperCase(),
    })
  }, [bookingReferenceId, updateGuest, values.plateNumber])

  const isInvitationCanceled = useMemo(
    () => cancellationReason === CancellationReason.Cancelled,
    [cancellationReason]
  )

  const isInvitationDeclined = useMemo(
    () => cancellationReason === CancellationReason.Declined,
    [cancellationReason]
  )

  const { todayUTC, startsUTC, endsUTC } = useMemo(
    () => ({
      todayUTC: dateUtil(new Date()).utc(),
      startsUTC: starts && dateUtil(starts).utc(),
      endsUTC: ends && dateUtil(ends).utc(),
    }),
    [dateUtil, ends, starts]
  )

  const isBookingOngoing = useMemo(() => {
    if (startsUTC && endsUTC) {
      return startsUTC.isBefore(todayUTC) && todayUTC.isBefore(endsUTC)
    }
    return false
  }, [endsUTC, startsUTC, todayUTC])

  const isBookingFinished = useMemo(() => {
    if (endsUTC) {
      return endsUTC.isBefore(todayUTC)
    }
    return false
  }, [endsUTC, todayUTC])

  const isBookingUpcoming = useMemo(
    () => !isBookingOngoing && !isBookingFinished,
    [isBookingFinished, isBookingOngoing]
  )

  const pageTitle = useMemo(() => {
    if (isBookingUpcoming) {
      return "Visitor's Parking Booking"
    }
    if (isBookingOngoing) {
      return 'Booking started'
    }
    if (isBookingFinished) {
      return 'Booking ended'
    }
    return ''
  }, [isBookingFinished, isBookingOngoing, isBookingUpcoming])

  useEffect(() => {
    if (startsUTC) {
      const minutesDiff = startsUTC.diff(todayUTC, 'minutes')
      const lessThan15Minutes = minutesDiff < 15 && minutesDiff > 0
      if (lessThan15Minutes && !vehicleLP) {
        router.push(ROUTES.ERROR)
      }
    }
  }, [router, startsUTC, todayUTC, vehicleLP])

  useEffect(() => {
    if (isErrorBookingGuest) {
      router.push(ROUTES.ERROR)
    }
  }, [isErrorBookingGuest, router])

  useEffect(() => {
    if (vehicleLP) {
      form.setFieldValue('plateNumber', vehicleLP)
    }
  }, [vehicleLP])

  const state = {
    ...bookingGuest,
    isInvitationCanceled,
    isInvitationDeclined,
    isValid,
    loading,
    plateNumber: values.plateNumber,
    startDate,
    endDate,
    isBookingFinished,
    isBookingUpcoming,
    pageTitle,
  }
  const actions = { handleCancelGuest, handleSubmit }
  return [state, actions]
}

export default useInvitation
