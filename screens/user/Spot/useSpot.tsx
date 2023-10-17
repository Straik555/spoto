/* eslint-disable react-hooks/exhaustive-deps */
import bookingApi from '@api/booking'
import {
  BookingBookDetailsForPayment,
  BookingPreBook,
} from '@api/booking/types'
import { placeApi } from '@api/place'
import { ApiError } from '@api/types'
import { vehicleApi } from '@api/vehicle'
import { EVType, VehicleModel } from '@api/vehicle/types'
import { dateFormats } from '@constants/global'
import {
  DateObject,
  msToHumanizedDuration,
  useDateUtil,
} from '@hooks/useDateUtil'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { convertDisplay0TimeToServer } from '@utils/convertTime'
import { PRE_BOOK_CACHE_KEY } from '@screens/user/Spot/constants'
import { ModalElectricVehicleVariant } from '@screens/user/Spot/ModalElectricVehicle/ModalElectricVehicle.model'
import {
  BookingType,
  ParsedPreBookInfo,
  SpotFormValues,
} from '@screens/user/Spot/Spot.model'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useSpot = (placeId: number) => {
  const dateUtil = useDateUtil()
  const { values, setFieldValue, resetForm } =
    useTypedFormikContext<SpotFormValues>()
  const { data: place, isLoading: placeIsLoading } =
    placeApi.endpoints.getPlaceById.useQuery(placeId)
  const [
    deleteFavourite,
    { isSuccess: isSuccessDeleteFavourite, isError: isErrorDeleteFavourite },
  ] = bookingApi.endpoints.favoritesDelete.useMutation()
  const [
    bookTrigger,
    { error: bookError, isSuccess: isBookSuccess, data: bookData },
  ] = bookingApi.endpoints.bookBooking.useMutation()
  const [preBookingTrigger, { data: prebookData, error: preBookError }] =
    bookingApi.endpoints.preBookBooking.useMutation({
      fixedCacheKey: PRE_BOOK_CACHE_KEY,
    })

  const [
    addFavourite,
    { isSuccess: isSuccessAddFavourite, isError: isErrorAddFavourite },
  ] = bookingApi.endpoints.favoritesAdd.useMutation()
  const { data: vehicles } = vehicleApi.endpoints.getVehicles.useQuery(null)
  const [bookingPeriodDialogVisible, setBookingPeriodDialogVisible] =
    useState(false)
  const [isOpenPaymentDialog, setIsOpenPaymentDialog] = useState(false)
  const [detailsForPayment, setDetailsForPayment] =
    useState<null | BookingBookDetailsForPayment>(null)
  const [showBookSuccess, setShowBookSuccess] = useState(false)
  const [evMismatchVariant, setEvMismatchVariant] =
    useState<ModalElectricVehicleVariant | void>()
  const [parsedPreBookInfo, setParsedPreBookInfo] =
    useState<ParsedPreBookInfo | void>()
  const [startDateCalendarValue, setStartDateCalendarValue] =
    useState<Date | void>()
  const [endDateCalendarValue, setEndDateCalendarValue] =
    useState<Date | void>()
  const preBookOrBookErrorMsg =
    ((bookError || preBookError) as ApiError)?.data?.message || ''

  useEffect(() => {
    if (isSuccessAddFavourite) {
      toast.success('Added this location to favourites')
    }
  }, [isSuccessAddFavourite])

  useEffect(() => {
    if (isSuccessDeleteFavourite) {
      toast.success('Deleted this location from favourites')
    }
  }, [isSuccessDeleteFavourite])

  useEffect(() => {
    if (isErrorAddFavourite || isErrorDeleteFavourite) {
      toast.error('Internal server error')
    }
  }, [isErrorAddFavourite, isErrorDeleteFavourite])

  const book = () => {
    if (!prebookData || !values.selectedVehicleId) return

    bookTrigger({
      bookingId: String(prebookData.bookingId),
      vehicleId: values.selectedVehicleId,
    })
  }

  const getFormStartDateTime = () => {
    if (!prebookData || !values.startTime || !values.startDate) return

    const { hours: startHours, minutes: startMinutes } =
      convertDisplay0TimeToServer(values.startTime)

    return dateUtil(values.startDate)
      .tz(prebookData.timeZone, true)
      .hour(startHours)
      .minute(startMinutes)
  }

  const getAvailabilityStartDateTime = () => {
    const startDate =
      getFormStartDateTime()?.utc().format(dateFormats.apiZ) || ''

    if (!startDate) return ''

    if (!startDateCalendarValue) return startDate

    if (
      !dateUtil(startDateCalendarValue).isSame(dateUtil(startDate), 'month')
    ) {
      const startOfMonth = dateUtil(startDateCalendarValue).startOf('month')
      const startOfDay = dateUtil().startOf('day')

      if (startOfMonth.isBefore(startOfDay)) {
        return startOfDay.format(dateFormats.apiZ)
      }

      return startOfMonth.format(dateFormats.apiZ)
    }

    return startDate
  }

  const getFormEndDateTime = () => {
    if (!prebookData) return

    const { hours: endHours, minutes: endMinutes } =
      convertDisplay0TimeToServer(values.endTime!)

    return dateUtil(values.endDate)
      .tz(prebookData.timeZone, true)
      .hour(endHours)
      .minute(endMinutes)
  }

  const updatePreBookWithFormValues = () => {
    if (!prebookData) return

    preBook({
      startDateTimeUtc: getFormStartDateTime()!.utc(),
      endDateTimeUtc: getFormEndDateTime()!.utc(),
    })
  }

  const preBook = (args: {
    startDateTimeUtc?: DateObject
    endDateTimeUtc?: DateObject
  }) => {
    const payload = {
      placeId,
      repeat: false,
    } as BookingPreBook

    if (args.startDateTimeUtc && args.endDateTimeUtc) {
      payload.from = args.startDateTimeUtc.format(dateFormats.apiZ)
      payload.end = args.endDateTimeUtc.format(dateFormats.apiZ)
    }

    if (values.selectedVehicleId) {
      payload.vehicleId = values.selectedVehicleId
    }
    preBookingTrigger(payload)
  }

  const handleFavorite = async () => {
    try {
      if (place?.isFavoritePlace) {
        deleteFavourite(placeId)
      } else {
        addFavourite({ placeId })
      }
    } catch (e) {
      toast.error('Internal server error.')
    }
  }

  const updateEndTime = (value: string) => {
    setFieldValue('endTime', value)
  }

  const updateStartTime = (value: string) => {
    setFieldValue('startTime', value)
    setFieldValue('endTime', null)
  }

  const selectVehicle = (vehicle: VehicleModel) => {
    const placeIsElectric =
      place?.electricCharger.type1 === true ||
      place?.electricCharger.type2 === true
    const placeAndVehicleEVTypeMatch =
      (place?.electricCharger?.type1 &&
        vehicle?.electricCarType === EVType.Type1) ||
      (place?.electricCharger?.type2 &&
        vehicle?.electricCarType === EVType.Type2)
    const vehicleNonEV = vehicle?.electricCarType == null

    if (!placeIsElectric || placeAndVehicleEVTypeMatch) {
      if (values.selectedVehicleId === vehicle.id) {
        setFieldValue('selectedVehicleId', undefined)
      } else {
        setFieldValue('selectedVehicleId', vehicle.id)
      }
      setEvMismatchVariant()
      return
    }

    if (vehicleNonEV) {
      setEvMismatchVariant(ModalElectricVehicleVariant.NonEV)
      return
    }

    setEvMismatchVariant(ModalElectricVehicleVariant.EVTypeMismatch)
  }

  const setFormDateTimeToPrebook = () => {
    if (!parsedPreBookInfo) return

    resetForm({
      values: {
        startDate: parsedPreBookInfo.startDate,
        startTime: parsedPreBookInfo.startTime,
        endDate: parsedPreBookInfo.endDate,
        endTime: parsedPreBookInfo.endTime,
        selectedVehicleId: values.selectedVehicleId,
      },
    })
  }

  const resetFormTime = () => {
    resetForm({
      values: {
        startDate: values.startDate,
        endDate: values.endDate,
        selectedVehicleId: values.selectedVehicleId,
      },
    })
  }

  useEffect(() => {
    if (isBookSuccess && bookData && bookData.paymentRequired) {
      setDetailsForPayment(bookData.detailsForPayment)
      setIsOpenPaymentDialog(true)
    } else {
      setShowBookSuccess(isBookSuccess)
    }
  }, [isBookSuccess, bookData])

  useEffect(() => {
    if (!prebookData) return

    const parsePreBookInfo = {
      startDateTime: dateUtil.utc(prebookData.start).tz(prebookData.timeZone),
      endDateTime: dateUtil.utc(prebookData.end).tz(prebookData.timeZone),
      preBookResponse: prebookData,
      openTimeStart: prebookData.openTimeStart.slice(0, 5),
      openTimeEnd: prebookData.openTimeEnd.slice(0, 5),
    } as ParsedPreBookInfo

    parsePreBookInfo.startDate = parsePreBookInfo.startDateTime.format(
      dateFormats.display0
    )
    parsePreBookInfo.startTime = parsePreBookInfo.startDateTime.format(
      dateFormats.timeDisplay0
    )
    parsePreBookInfo.endDate = parsePreBookInfo.endDateTime.format(
      dateFormats.display0
    )
    parsePreBookInfo.endTime = parsePreBookInfo.endDateTime.format(
      dateFormats.timeDisplay0
    )
    parsePreBookInfo.bookingType = parsePreBookInfo.startDateTime
      .startOf('day')
      .isSame(parsePreBookInfo.endDateTime.startOf('day'))
      ? BookingType.SingleDay
      : BookingType.MultipleDays

    parsePreBookInfo.bookingDurationMs = parsePreBookInfo.endDateTime.diff(
      parsePreBookInfo.startDateTime
    )
    parsePreBookInfo.bookingDurationHumanized = msToHumanizedDuration(
      parsePreBookInfo.bookingDurationMs
    )
    parsePreBookInfo.dateDisplay =
      parsePreBookInfo.bookingType === BookingType.SingleDay
        ? parsePreBookInfo.startDate
        : `${parsePreBookInfo.startDateTime.format(dateFormats.display5)} - ${
            parsePreBookInfo.endDate
          }`

    setParsedPreBookInfo(parsePreBookInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prebookData, dateUtil, setParsedPreBookInfo])

  return {
    place,
    vehicles,
    handleFavorite,
    book,
    updateStartTime,
    updateEndTime,
    bookingPeriodDialogVisible,
    setBookingPeriodDialogVisible,
    startDateCalendarValue,
    setStartDateCalendarValue,
    placeIsLoading,
    parsedPreBookInfo,
    preBookError,
    showBookSuccess,
    setShowBookSuccess,
    evMismatchVariant,
    setEvMismatchVariant,
    selectVehicle,
    setFormDateTimeToPrebook,
    resetFormTime,
    preBook,
    updatePreBookWithFormValues,
    getFormStartDateTime,
    getFormEndDateTime,
    endDateCalendarValue,
    setEndDateCalendarValue,
    preBookOrBookErrorMsg,
    detailsForPayment,
    isOpenPaymentDialog,
    setIsOpenPaymentDialog,
    getAvailabilityStartDateTime,
  }
}

export default useSpot
