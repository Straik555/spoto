import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { dateFormats } from '@constants/global'
import { tzOrUtc, useDateUtil } from '@hooks/useDateUtil'
import DatePickerDialog from '@components/DatePickerDialog'
import { ButtonMode } from '@components/Button/Button.model'
import { Button } from '@components/index'
import Input from '@components/Form/Input/Input'
import { PageHeaderMobile } from '@components/PageHeader'
import bookingApi from '@api/booking'
import { ROUTES } from '@constants/routes'
import Title from '@components/Title/Title'
import SuccessDialog from '@components/Dialog/SuccessDialog'
import Select, { Option } from '@components/Select/Select'
import { HousesApartmentsByUserResponse } from '@api/house/types'
import {
  VisitorsParkingFormValues,
  VisitorsParkingProps,
} from '@screens/user/MyVisitors/VisitorsParking/VisitorsParking.model'
import {
  AvailabilityCalendar,
  BookingForVisitorsResult,
} from '@api/booking/types'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { DatePickerVariant } from '@components/DatePickerDialog/DatePickerDialog.model'
import { withForm } from '@components/Form/withForm'
import { Nullable } from '@constants/types'
import { INVITE_EMAIL_VALIDATION_SCHEMA } from '@screens/user/MyVisitors/validation'
import TimeOptionsSelect from '@screens/admin/Sets/CreateEditSet/WorkingHours/TimeOptionsSelect'
import Loader from '@components/Loader/Loader'
import useVisitors from '@screens/user/MyVisitors/useVisitors'
import CalendarIcon from '@assets/icons/calendar.svg'

const VisitorsParking: FC<VisitorsParkingProps> = ({
  visitorsParkingId,
  appartmentId,
}) => {
  const {
    dataHousesApartments,
    isFetchingApartments,
    isFetchingVisitors,
    guests,
    intervalStart,
    calculateDate,
  } = useVisitors(Number(appartmentId))
  const [isErrorStart, setIsErrorStart] = useState<boolean>(false)
  const [intervalsStart, setIntervalsStart] = useState<string[] | []>([])
  const [intervalsEnd, setIntervalsEnd] = useState<string[] | []>([])
  const [isDailyLimitReached, setIsDailyLimitReached] = useState<boolean>(false)
  const [calendarIntervals, setCalendarIntervals] = useState<
    AvailabilityCalendar[] | []
  >([])
  const [visitor, setVisitor] = useState<null | BookingForVisitorsResult>(null)
  const [preBookId, setPreBookId] = useState<string>('')
  const [bookingReferenceId, setBookingReferenceId] = useState<string>('')
  const [inviteSendEmail, setInviteSendEmail] = useState<string>('')
  const [inviteSendLink, setInviteSendLink] = useState<string | null>(null)
  const [periodModalIsOpen, setPeriodModalIsOpen] = useState<boolean>(false)
  const [isStartDisabled, setIsStartDisabled] = useState<boolean>(false)
  const [isPreBook, setIsPreBook] = useState<boolean>(false)
  const [successfulModalIsOpen, seSuccessfulModalIsOpen] =
    useState<boolean>(false)
  const [apartments, setApartments] = useState<
    null | HousesApartmentsByUserResponse | undefined
  >(null)
  const { values, setFieldValue, isValid } =
    useTypedFormikContext<VisitorsParkingFormValues>()
  const router = useRouter()
  const dateUtil = useDateUtil()
  const linkCopied = (id: string) =>
    `${window.location.origin}${ROUTES.PARKING_INVITATION}?bookingReferenceId=${id}`
  const [
    bookingEmail,
    {
      isSuccess: isSuccessByEmail,
      isLoading: isFetchingBookingEmail,
      isError: isErrorByEmail,
    },
  ] = bookingApi.endpoints.bookingInviteGuest.useMutation()

  const {
    data: availabilityCalendarForVisitors = [],
    isFetching: isFetchingAvailabilityCalendarForVisitors,
  } = bookingApi.endpoints.availabilityCalendarForVisitors.useQuery(
    {
      startDate: dateUtil(values.dayFrom)
        .tz(apartments?.timezone)
        .startOf('month')
        .format(dateFormats.api),
      endDate: dateUtil(values.dayFrom)
        .tz(apartments?.timezone)
        .endOf('month')
        .format(dateFormats.api),
      apartmentId: String(apartments?.appartmentId),
    },
    {
      skip: !(apartments?.appartmentId && values.dayFrom),
    }
  )

  const {
    data: availabilityExtend = [],
    isFetching: isFetchingAvailabilityExtend,
  } = bookingApi.endpoints.getBookingAvailabilityExtend.useQuery(
    String(visitorsParkingId),
    {
      skip: !visitorsParkingId?.length,
    }
  )

  const {
    data: availabilityForVisitors,
    isFetching: isFetchingAvailabilityForVisitors,
  } = bookingApi.endpoints.availabilityForVisitors.useQuery(
    {
      startDate: dateUtil(
        calculateDate(values.dayFrom, values.startTime, apartments?.timezone)
      )
        .utc()
        .format(dateFormats.apiZ),
      apartmentId: String(apartments?.appartmentId),
    },
    {
      skip: !(apartments?.appartmentId && values.startTime && values.dayFrom),
    }
  )

  const [preBooking, { isLoading: isLoadingBook }] =
    bookingApi.endpoints.bookBooking.useMutation()
  const [extendBooking, { isLoading: isLoadingExtendBooking }] =
    bookingApi.endpoints.extendBooking.useMutation()
  const [preBookingTrigger, { isLoading: isLoadingPreBookVisitor }] =
    bookingApi.endpoints.preBookVisitorBooking.useMutation()

  const chooseApartments = useCallback(
    (selectedId: number) => {
      setApartments(
        dataHousesApartments?.find(
          (o: HousesApartmentsByUserResponse) => o.appartmentId === selectedId
        ) || null
      )
    },
    [dataHousesApartments]
  )

  const handleEmail = useCallback(() => {
    bookingEmail({
      bookingReferenceId: bookingReferenceId,
      email: inviteSendEmail,
    })
  }, [bookingReferenceId, inviteSendEmail])

  const book = useCallback(
    async (bookingId: string) => {
      const response: any = await preBooking({
        bookingId,
        vehicleId: 0,
      })

      if (response?.error?.data?.message) {
        toast.error(response?.error?.data?.message)
      } else {
        await setBookingReferenceId(response?.data?.bookingReferenceId)
        setInviteSendLink(linkCopied(response?.data?.bookingReferenceId))
        seSuccessfulModalIsOpen(true)
      }
    },
    [preBooking]
  )

  const preBookExtend = useCallback(
    async (bookingId: string, end: string) => {
      const payload = {
        bookingId,
        extendedEnd: dateUtil(end)
          .tz(apartments?.timezone)
          .utc()
          .format(dateFormats.apiZ),
      }
      const response: any = await extendBooking(payload)
      if (response.error?.data?.message) {
        toast.error(response.error.data.message)
      }
    },
    [extendBooking]
  )

  const preBook = useCallback(
    async (apartmentId: number, from: string, end: string) => {
      const payload = {
        apartmentId,
        from: dateUtil(from)
          .tz(apartments?.timezone)
          .utc()
          .format(dateFormats.apiZ),
        end: dateUtil(end)
          .tz(apartments?.timezone)
          .utc()
          .format(dateFormats.apiZ),
      }

      const response: any = await preBookingTrigger(payload)
      if (response?.data) {
        setPreBookId(response?.data?.bookingId)
      }

      if (response.error?.data?.message) {
        toast.error(response.error.data.message)
      }
    },
    [preBookingTrigger]
  )

  useEffect(() => {
    if (values.dayTo && values.endTime?.length && values.startTime?.length) {
      if (values.dayFrom) {
        preBook(
          Number(apartments?.appartmentId),
          String(
            calculateDate(
              values.dayFrom,
              values.startTime,
              apartments?.timezone
            )
          ),
          String(
            calculateDate(values.dayTo, values.endTime, apartments?.timezone)
          )
        )
      } else {
        if (!visitor || !isPreBook) return
        preBookExtend(
          String(visitorsParkingId),
          String(
            calculateDate(values.dayTo, values.endTime, apartments?.timezone)
          )
        )
      }
    }
  }, [values.endTime])

  useEffect(() => {
    if (Object.values(router.query).length) {
      if (guests.length) {
        const visitor = guests?.find(
          (guest: BookingForVisitorsResult) =>
            guest.bookingId === visitorsParkingId
        )
        setFieldValue(
          'dayTo',
          dateUtil(visitor?.ends)
            .tz(visitor?.timeZone)
            .format(dateFormats.iso8601Z)
        )
        setFieldValue(
          'startTime',
          dateUtil(visitor?.starts)
            .tz(visitor?.timeZone)
            .format(dateFormats.timeDisplay0)
        )
        setFieldValue(
          'endTime',
          dateUtil(visitor?.ends)
            .tz(visitor?.timeZone)
            .format(dateFormats.timeDisplay0)
        )
        setVisitor(visitor || null)
        setInviteSendEmail(visitor?.invitationEmail || '')
      }
    }
  }, [guests, visitorsParkingId, appartmentId])

  useEffect(() => {
    if (visitorsParkingId && appartmentId) return
    if (dataHousesApartments?.length === 1) {
      setApartments(dataHousesApartments[0])
    }
  }, [dataHousesApartments, visitorsParkingId, appartmentId])
  useEffect(() => {
    if (availabilityExtend.length && visitor) {
      setIntervalsEnd(intervalStart(availabilityExtend, values.dayTo))
      setCalendarIntervals(availabilityExtend)
    }
  }, [availabilityExtend, values.dayTo])
  useEffect(() => {
    if (availabilityCalendarForVisitors?.length > 0) {
      setIntervalsStart(
        intervalStart(
          availabilityCalendarForVisitors,
          values.dayFrom ? values.dayFrom : visitor?.starts
        )
      )
      setIsDailyLimitReached(
        availabilityCalendarForVisitors.filter(
          (extend) =>
            extend.date ===
            dateUtil(values.dayFrom)
              .utc()
              .tz(apartments?.timezone)
              .format(dateFormats.api)
        )[0]?.availability === 3
      )
    }
  }, [availabilityCalendarForVisitors, values.dayFrom])

  useEffect(() => {
    if (
      availabilityForVisitors &&
      availabilityForVisitors?.intervals.length > 0
    ) {
      const calendar = availabilityForVisitors?.intervals
        .map((day) =>
          dateUtil(day).tz(apartments?.timezone).format(dateFormats.api)
        )
        .filter((val, ind, arr) => arr.indexOf(val) === ind)
        .map((date) => ({
          date: dateUtil(date).tz(apartments?.timezone).format(dateFormats.api),
          availability: 0,
          intervals: {
            intervals: availabilityForVisitors?.intervals,
            timeZone: availabilityForVisitors?.timeZone,
            intervalLengthInMins: availabilityForVisitors?.intervalLengthInMins,
          },
        }))
      setCalendarIntervals(calendar)
    }
  }, [availabilityForVisitors])

  useEffect(() => {
    if (router.query?.appartmentId && dataHousesApartments.length) {
      setApartments(
        dataHousesApartments.find(
          (data: HousesApartmentsByUserResponse) =>
            data.appartmentId === Number(router.query?.appartmentId)
        )
      )
    }
  }, [router.query, dataHousesApartments])

  useEffect(() => {
    if (bookingReferenceId.length && inviteSendEmail?.length && isValid) {
      handleEmail()
    }
  }, [bookingReferenceId])

  useEffect(() => {
    if (!availabilityForVisitors) return
    if (isSame) {
      const newInterval = filterIntervals(
        dateUtil(values.dayFrom).toDate()
      )?.filter((day) =>
        dateUtil(day).isAfter(
          dateUtil(
            calculateDate(
              values.dayFrom,
              values.startTime,
              apartments?.timezone
            )
          ).startOf('minutes')
        )
      )

      setIntervalsEnd(newInterval || [])
    } else {
      setIntervalsEnd(filterIntervals(dateUtil(values.dayTo).toDate()) || [])
    }
  }, [values.startTime, values.dayTo])

  useEffect(() => {
    if (isSuccessByEmail) {
      toast.success('You successfully sent an invite.')
      seSuccessfulModalIsOpen(true)
    }
  }, [isSuccessByEmail])

  useEffect(() => {
    if (isErrorByEmail) {
      toast.error('Internal server error. Try again later.')
    }
  }, [isErrorByEmail])

  const isSame = dateUtil(values.dayFrom)
    .tz(apartments?.timezone)
    .isSame(
      dateUtil(dateUtil(values.dayTo).tz(apartments?.timezone)).startOf('day')
    )

  const filterIntervals = (day: Date) =>
    availabilityForVisitors?.intervals?.filter(
      (date) =>
        dateUtil(date).tz(apartments?.timezone).format(dateFormats.api) ===
        dateUtil(day).tz(apartments?.timezone).format(dateFormats.api)
    )

  return (
    <div className="h-screen bg-bg">
      <Loader
        loading={
          isLoadingPreBookVisitor ||
          isFetchingBookingEmail ||
          isLoadingBook ||
          isFetchingVisitors ||
          isFetchingApartments ||
          isFetchingAvailabilityForVisitors ||
          isFetchingAvailabilityCalendarForVisitors ||
          isFetchingAvailabilityExtend ||
          isLoadingExtendBooking
        }
      >
        <PageHeaderMobile
          title="Visitors Booking"
          backButtonLink={
            apartments
              ? {
                  pathname: ROUTES.MY_VISITORS,
                  query: { appartmentId: apartments?.appartmentId },
                }
              : { pathname: ROUTES.MY_VISITORS }
          }
          showBackButton
        />
        <div className="flex flex-col justify-between h-[calc(100vh_-_58px)] bg-bg">
          <div className="flex flex-col justify-start px-[16px] pt-[16px]">
            <Title noCap as="h4" className="font-semibold mb-[4px] text-s-lg">
              Select booking time
            </Title>
            <p className="font-normal text-s-sm text-blue-1">
              Select date and time below.
            </p>
            <p className="font-normal text-s-sm text-blue-1">
              Maximum booking length is 24 hours.
            </p>
            {dataHousesApartments?.length > 1 && (
              <div className="flex flex-col mb-[3px] mt-[6px]">
                <p className="font-normal capitalize text-s-base text-blue-1 mt-[15px]">
                  Apartment
                </p>
                <Select
                  value={apartments?.appartmentId}
                  placeholder="Select Apartment Number"
                  className="!text-primary !w-[311px] !mt-[5px]"
                  placeholderClassName={cn({
                    '!text-blue-3': !apartments?.appartmentId,
                    '!text-blue-1': apartments?.appartmentId,
                  })}
                  titleClassName="!text-primary"
                  onSelect={chooseApartments}
                  label={apartments?.appartmentNumber}
                >
                  {dataHousesApartments?.map(
                    (item: HousesApartmentsByUserResponse) => {
                      return (
                        <Option
                          key={item.appartmentId}
                          value={item.appartmentId}
                          text={item.appartmentNumber}
                          active={
                            apartments?.appartmentId === item.appartmentId
                          }
                        />
                      )
                    }
                  )}
                </Select>
              </div>
            )}
            <div>
              <Input<VisitorsParkingFormValues>
                label="From"
                labelClassName="!text-s-base !text-blue-1 !mt-[18px] !mb-0"
                name="dayFrom"
                containerClassName="!shadow-none !w-[311px]"
                inputClassName={cn(
                  'relative !h-[44px] !px-[12px] mt-[4px] mb-[16px] text-s-lg text-left border shadow rounded-md border-blue-2 text-blue-1 placeholder:text-blue-3',
                  {
                    '!border-red !text-red placeholder:text-red':
                      (values.dayFrom && !intervalsStart?.length) ||
                      (isErrorStart && !values.dayFrom),
                    '!border-blue-2 !text-blue-1': visitor,
                  }
                )}
                onClick={() => {
                  if (!visitor) {
                    setPeriodModalIsOpen(true)
                    setIsStartDisabled(false)
                  }
                }}
                value={
                  (values.dayFrom &&
                    apartments?.timezone &&
                    dateUtil(values.dayFrom)
                      .tz(apartments?.timezone)
                      .format(dateFormats.display0)) ||
                  (visitor?.starts &&
                    dateUtil(visitor?.starts)
                      .tz(visitor?.timeZone)
                      .format(dateFormats.display0))
                }
                placeholder="Select Date"
                trailingIcon={
                  <CalendarIcon
                    className={cn('fill-blue-3', {
                      '!fill-red':
                        (values.dayFrom && !intervalsStart?.length) ||
                        (isErrorStart &&
                          (visitor ? !visitor?.starts : !values.dayFrom)),
                    })}
                  />
                }
                trailingIconClassName="!-top-[12px] !right-[10px]"
                readOnly
              />
              {values.dayFrom && !intervalsStart?.length && (
                <p className="font-normal mb-[16px] text-red text-s-sm -mt-[11px] ml-[3px]">
                  {isDailyLimitReached
                    ? 'All time slots are booked.'
                    : 'Booking from this apartment created earlier.'}
                </p>
              )}
              {isErrorStart &&
                (visitor ? !visitor?.starts : !values.dayFrom) && (
                  <p className="font-normal mb-[16px] text-red text-s-sm -mt-[11px] ml-[3px]">
                    This is a required field.
                  </p>
                )}
              <small className="text-s-base text-blue-1">Start</small>
              <div className="mb-[16px] w-[152px] mt-[5px]">
                {intervalsStart && (
                  <TimeOptionsSelect
                    value={values.startTime}
                    placeholder="00:00"
                    onSelect={(value: string) => {
                      if (!visitor) {
                        setFieldValue('startTime', value)
                        setFieldValue('endTime', '')
                        setFieldValue('dayTo', '')
                      }
                    }}
                    selectClassName={cn({ '!hidden': visitor })}
                    className="w-full !z-[4] !mt-0 shadow-[4px_4px_12px_rgba(211,211,248,0.2)]"
                    optionClassName="hover:bg-blue-4 hover:text-primary z-10"
                    placeholderClassName={cn({
                      '!text-blue-3': !values.startTime,
                      '!text-blue-1': values.startTime,
                    })}
                    buttonClassName={cn('!z-[4]', {
                      '!border-blue-2': visitor,
                    })}
                    label={values.startTime}
                    intervals={visitor ? [] : intervalsStart}
                    timeZone={apartments?.timezone}
                    disabled={Boolean(visitor)}
                  />
                )}
              </div>
              <Input<VisitorsParkingFormValues>
                label="To"
                labelClassName="!text-s-base !text-blue-1 !mb-0"
                name="dayTo"
                containerClassName="!shadow-none !w-[311px]"
                inputClassName={cn(
                  'relative !h-[44px] !px-[12px] mt-[4px] mb-[16px] text-s-lg text-left border shadow rounded-md border-blue-2 text-blue-1 placeholder:text-blue-3',
                  {
                    '!border-red text-red':
                      values.dayTo &&
                      (visitor
                        ? !availabilityExtend[0]?.intervals?.intervals.length
                        : !availabilityForVisitors?.intervals?.length),
                  }
                )}
                onClick={() => {
                  if ((values.dayFrom && values.startTime) || visitor?.starts) {
                    setPeriodModalIsOpen(true)
                    setIsStartDisabled(true)
                  }
                }}
                value={
                  (values.dayTo &&
                    apartments?.timezone &&
                    dateUtil(values.dayTo)
                      .tz(apartments?.timezone)
                      .format(dateFormats.display0)) ||
                  ''
                }
                placeholder="Select Date"
                trailingIcon={
                  <CalendarIcon
                    className={cn('fill-blue-3', {
                      '!fill-red':
                        values.dayTo &&
                        (visitor
                          ? !availabilityExtend[0]?.intervals?.intervals.length
                          : !availabilityForVisitors?.intervals?.length),
                    })}
                  />
                }
                trailingIconClassName="!-top-[12px] !right-[10px]"
                readOnly
              />
              {values.dayTo &&
                (visitor
                  ? !availabilityExtend[0]?.intervals?.intervals.length
                  : !availabilityForVisitors?.intervals?.length) && (
                  <p className="font-normal mb-[16px] text-red text-s-sm -mt-[11px] ml-[3px]">
                    This is a required field.
                  </p>
                )}
              <small className="text-s-base text-blue-1">End</small>
              <div className="mb-[16px] w-[152px] mt-[5px]">
                <TimeOptionsSelect
                  value={values.endTime}
                  placeholder="00:00"
                  onSelect={(value: string) => {
                    if (visitor) {
                      setIsPreBook(true)
                    }
                    setFieldValue('endTime', value)
                  }}
                  className="w-full !z-[3] !mt-0 shadow-[4px_4px_12px_rgba(211,211,248,0.2)]"
                  buttonClassName="!z-[3]"
                  placeholderClassName={cn({
                    '!text-blue-3': !values.endTime,
                    '!text-blue-1': values.endTime,
                  })}
                  label={values.endTime}
                  intervals={intervalsEnd || []}
                  timeZone={apartments?.timezone}
                />
              </div>
              <Input
                name="inviteSendEmail"
                value={inviteSendEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInviteSendLink(null)
                  setInviteSendEmail(e.target.value)
                }}
                placeholder="Visitors Email"
                label="Email"
                labelClassName="!text-s-base !text-blue-1"
                inputClassName="focus:border-primary focus:text-primary !w-[311px] !px-[12px] !h-[44px] placeholder:text-blue-3"
              />
            </div>
          </div>
          <div className="px-[16px] py-[15px] h-max">
            <Button
              mode={ButtonMode.SMALL}
              className="w-full text-s-lg h-[44px]"
              type="button"
              onClick={() => {
                if (apartments) {
                  if (preBookId?.length) {
                    book(preBookId)
                  } else if (visitor) {
                    if (inviteSendEmail.length) {
                      bookingEmail({
                        bookingReferenceId: visitor?.bookingReferenceId,
                        email: inviteSendEmail,
                      })
                      setInviteSendLink(linkCopied(visitor?.bookingReferenceId))
                    } else {
                      seSuccessfulModalIsOpen(true)
                      setInviteSendLink(linkCopied(visitor?.bookingReferenceId))
                    }
                  } else {
                    setIsErrorStart(true)
                  }
                }
              }}
            >
              Book
            </Button>
          </div>
        </div>
        {periodModalIsOpen && (
          <DatePickerDialog
            dayFrom={dateUtil(
              dateUtil(values.dayFrom || visitor?.starts || new Date())
                .tz(apartments?.timezone)
                .format(dateFormats.iso8601)
            ).toDate()}
            dayTo={values.dayTo}
            modalIsOpen={periodModalIsOpen}
            isPeriod={false}
            timeZone={apartments?.timezone}
            closeModal={() => setPeriodModalIsOpen(false)}
            title={isStartDisabled ? 'Select End Date' : 'Select Start Date'}
            defaultTitle={isStartDisabled ? !values.dayTo : !values.dayFrom}
            onSubmit={(dayFrom) => {
              if (isStartDisabled) {
                setFieldValue('dayTo', dayFrom)
                setFieldValue('endTime', '')
                setIntervalsEnd(
                  (isSame
                    ? filterIntervals(dayFrom)?.slice(1)
                    : filterIntervals(dayFrom)) || []
                )
              } else {
                if (visitor) {
                  setVisitor(null)
                  setIntervalsEnd([])
                  setIsPreBook(false)
                }
                setIsErrorStart(false)
                setFieldValue('dayFrom', dayFrom)
                setFieldValue('startTime', '')
                setFieldValue('dayTo', '')
                setFieldValue('endTime', '')
              }
            }}
            calendarIntervals={isStartDisabled ? calendarIntervals : undefined}
            backBtnVisible={false}
            variant={DatePickerVariant.SEARCH}
            startDate={
              isStartDisabled
                ? dateUtil(
                    tzOrUtc(
                      dateUtil(values.dayFrom || visitor?.starts || new Date())
                    )
                      .tz(apartments?.timezone)
                      .format(dateFormats.iso8601)
                  ).toDate()
                : null
            }
          />
        )}
        <SuccessDialog
          buttonTitle="My Visitors"
          title="Success!"
          subTitle="You may share the link below"
          isOpen={successfulModalIsOpen}
          closeModal={() => {
            router.push({ pathname: ROUTES.MY_VISITORS })
            seSuccessfulModalIsOpen(false)
          }}
          onSubmit={() => {
            router.push({ pathname: ROUTES.MY_VISITORS })
            seSuccessfulModalIsOpen(false)
          }}
          link={inviteSendLink}
        />
      </Loader>
    </div>
  )
}

export default withForm<VisitorsParkingProps>(
  {
    initialValues: {
      startTime: '',
      endTime: '',
      dayFrom: null,
      dayTo: null,
    } as Nullable<VisitorsParkingFormValues>,
    validationSchema: INVITE_EMAIL_VALIDATION_SCHEMA,
  },
  VisitorsParking
)
