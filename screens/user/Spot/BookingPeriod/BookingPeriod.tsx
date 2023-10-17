import bookingApi from '@api/booking'
import CalendarIcon from '@assets/icons/calendar.svg'
import { ButtonMode } from '@components/Button/Button.model'
import BookingDatepicker from '@components/DatePicker/BookingDatepicker'
import DatePickerDialog from '@components/DatePicker/DatePickerDialog'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import Dialog from '@components/Dialog/Dialog'
import Input from '@components/Form/Input/Input'
import { Button } from '@components/index'
import { TimeAutocompletePair } from '@components/TimeAutocomplete'
import Title from '@components/Title/Title'
import { dateFormats } from '@constants/global'
import { DateObject, isSameDayOfMonth, useDateUtil } from '@hooks/useDateUtil'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import TimeOptionsSelect from '@screens/admin/Sets/CreateEditSet/WorkingHours/TimeOptionsSelect'
import WorkingHours from '@screens/admin/Sets/CreateEditSet/WorkingHours/WorkingHours'
import { BookingPeriodProps } from '@screens/user/Spot/BookingPeriod/BookingPeriod.model'
import { BookingType, SpotFormValues } from '@screens/user/Spot/Spot.model'
import useSpot from '@screens/user/Spot/useSpot'
import cn from 'classnames'
import React, { FC, useEffect, useState } from 'react'

const BookingPeriod: FC<BookingPeriodProps> = ({
  spotId,
  closeModal,
  onSubmit,
  open,
}) => {
  const dateUtil = useDateUtil()

  const { isDesktop } = useDeviceInfo()
  const { values, setFieldValue } = useTypedFormikContext<SpotFormValues>()
  const [startCalendarOpen, setStartCalendarOpen] = useState<boolean>(false)
  const [endCalendarOpen, setEndCalendarOpen] = useState<boolean>(false)
  const {
    updateStartTime,
    updateEndTime,
    startDateCalendarValue,
    setStartDateCalendarValue,
    parsedPreBookInfo,
    setFormDateTimeToPrebook,
    resetFormTime,
    endDateCalendarValue,
    setEndDateCalendarValue,
    getAvailabilityStartDateTime,
  } = useSpot(spotId)
  const [bookingPeriodType, setBookingPeriodType] = useState(
    parsedPreBookInfo?.bookingType
  )

  const isSingleDayType = bookingPeriodType === BookingType.SingleDay
  const { data: availabilityFromPeriod = [], isFetching: isFetchingPeriod } =
    bookingApi.endpoints.getBookingAvailabilityFromPeriod.useQuery(
      {
        startDateTime: getAvailabilityStartDateTime(),
        placeId: spotId,
      },
      {
        skip: !(
          spotId &&
          open &&
          getAvailabilityStartDateTime() &&
          !isSingleDayType
        ),
        refetchOnMountOrArgChange: 120,
      }
    )

  const { data: availabilityCalendar, isFetching: isFetchingCalendar } =
    bookingApi.endpoints.getBookingAvailabilityCalendar.useQuery(
      {
        startDate: dateUtil(startDateCalendarValue || values.startDate)
          .startOf('month')
          .format(dateFormats.api),
        endDate: dateUtil(startDateCalendarValue || values.startDate)
          .endOf('month')
          .format(dateFormats.api),
        placeId: spotId,
      },
      {
        skip: !(
          spotId &&
          open &&
          (startDateCalendarValue || values.startDate) &&
          isSingleDayType
        ),
        refetchOnMountOrArgChange: 120,
      }
    )

  const [availableCalendarIntervals, setAvailableCalendarIntervals] = useState<{
    date: DateObject
    intervals: string[]
    endIntervals: string[]
  } | void>()
  const [availablePeriodIntervals, setAvailablePeriodIntervals] = useState<{
    date: DateObject
    intervals: string[]
  } | void>()

  useEffect(() => {
    if (!parsedPreBookInfo) return

    setBookingPeriodType(parsedPreBookInfo.bookingType)
  }, [parsedPreBookInfo?.bookingType])

  useEffect(() => {
    if (parsedPreBookInfo || typeof bookingPeriodType !== 'undefined') {
      setFormDateTimeToPrebook()
    }
  }, [bookingPeriodType, parsedPreBookInfo])

  useEffect(() => {
    if (!values.startDate || !open) return

    if (
      availableCalendarIntervals &&
      !isSameDayOfMonth(values.startDate, availableCalendarIntervals.date)
    ) {
      resetFormTime()
    }

    if (!availabilityCalendar) return

    const intervals = availabilityCalendar.find(({ date }) => {
      return (
        dateUtil(date).get('date') === dateUtil(values.startDate).get('date')
      )
    })

    if (intervals) {
      const startIntervals = intervals?.intervals.intervals || []

      setAvailableCalendarIntervals({
        date: dateUtil(intervals?.date),
        intervals: startIntervals,
        endIntervals: startIntervals
          .slice(0, -1)
          .map((v) => dateUtil.utc(v).add(15, 'm').format()),
      })
    } else {
      setAvailableCalendarIntervals()
    }
  }, [availabilityCalendar, values.startDate, dateUtil, open])

  useEffect(() => {
    if (!values.endDate || !open || isSingleDayType || !availabilityFromPeriod)
      return

    const intervals = availabilityFromPeriod.find(({ date }) => {
      return dateUtil(date).get('date') === dateUtil(values.endDate).get('date')
    })

    if (intervals) {
      setAvailablePeriodIntervals({
        date: dateUtil(intervals?.date),
        intervals: intervals?.intervals.intervals || [],
      })
    } else {
      setAvailablePeriodIntervals()
    }
  }, [availabilityFromPeriod, values.endDate, dateUtil, open])

  useEffect(() => {
    if (open) return

    setAvailableCalendarIntervals()
  }, [open])

  return (
    <>
      <Dialog
        open={open && !startCalendarOpen && !endCalendarOpen}
        onClose={closeModal}
        className={cn('w-[343px] rounded-[10px]', {
          '!w-[550px] !p-[30px_40px_20px]': isDesktop,
        })}
        closeIcon
        afterLeave={setFormDateTimeToPrebook}
      >
        <Title
          as="h4"
          className={cn('text-s-xl font-semibold text-center mb-[16px]')}
        >
          {!isSingleDayType ? 'Booking Period' : 'Booking Time'}
        </Title>
        <div>
          <div className="flex items-center">
            <button
              onClick={() => {
                setBookingPeriodType(BookingType.SingleDay)
              }}
              className={cn(
                'w-1/2 text-s-base pb-[12px] m-0 text-center border-b text-s-lg',
                {
                  '!text-lg': isDesktop,
                  'text-primary border-primary font-semibold border-b-[2px]':
                    isSingleDayType,
                  'border-b-2': isSingleDayType && isDesktop,
                  'text-blue-2 font-normal': !isSingleDayType,
                }
              )}
            >
              Specific Day
            </button>
            <button
              onClick={() => {
                setBookingPeriodType(BookingType.MultipleDays)
              }}
              className={cn(
                'w-1/2 text-s-base pb-[9px] pt-[3px] m-0 text-center border-b text-s-lg',
                {
                  '!text-lg': isDesktop,
                  'text-primary border-primary font-semibold border-b-[2px]':
                    !isSingleDayType,
                  'border-b-2': !isSingleDayType && isDesktop,
                  'text-blue-2 font-normal': isSingleDayType,
                }
              )}
            >
              Multiple Days
            </button>
          </div>
          <div>
            {!isSingleDayType ? (
              <>
                <Input
                  name="startDate"
                  label="From"
                  readOnly
                  trailingIcon={<CalendarIcon className="fill-blue-3" />}
                  onClick={() => {
                    setStartCalendarOpen(true)
                  }}
                />
                <div
                  className={cn(
                    'flex items-center justify-start w-full relative z-50 mt-[16px]',
                    {
                      'justify-between': !isDesktop,
                    }
                  )}
                >
                  <small className={cn('text-blue-1 text-s-base')}>Start</small>
                  <div
                    className={cn({
                      'w-[120px] ml-[50px]': isDesktop,
                      'w-[152px]': !isDesktop,
                    })}
                  >
                    <TimeOptionsSelect
                      value={values.startTime}
                      placeholder={'00:00'}
                      onSelect={updateStartTime}
                      className="w-full !mt-0 shadow-[4px_4px_12px_rgba(211,211,248,0.2)]"
                      label={values.startTime}
                      intervals={availableCalendarIntervals?.intervals}
                      timeZone={parsedPreBookInfo?.preBookResponse.timeZone}
                    />
                  </div>
                </div>
                <Input
                  name="endDate"
                  label="To"
                  readOnly
                  trailingIcon={<CalendarIcon className="fill-blue-3" />}
                  onClick={() => {
                    setEndCalendarOpen(true)
                  }}
                />
                <div
                  className={cn(
                    'flex items-center justify-start w-full mt-[16px]',
                    {
                      'justify-between': !isDesktop,
                    }
                  )}
                >
                  <small className={cn('text-blue-1 text-s-base')}>End</small>
                  <div
                    className={cn({
                      'w-[120px] ml-5': isDesktop,
                      'w-[152px]': !isDesktop,
                    })}
                  >
                    <TimeOptionsSelect
                      value={values.endTime}
                      placeholder={'00:00'}
                      onSelect={updateEndTime}
                      className="w-full !mt-0 shadow-[4px_4px_12px_rgba(211,211,248,0.2)]"
                      label={values.endTime}
                      intervals={availablePeriodIntervals?.intervals}
                      timeZone={parsedPreBookInfo?.preBookResponse.timeZone}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Input
                  name="startDate"
                  readOnly
                  trailingIcon={<CalendarIcon className="fill-blue-3" />}
                  onClick={() => {
                    setStartCalendarOpen(true)
                  }}
                />
                <div
                  className={cn('block w-full', {
                    'w-[255px]': isDesktop,
                  })}
                >
                  {isDesktop ? (
                    <TimeAutocompletePair
                      intervals={availableCalendarIntervals?.intervals || []}
                      timeZone={parsedPreBookInfo?.preBookResponse.timeZone}
                      name1="bookingPeriodTimeFrom"
                      label1="From"
                      name2="bookingPeriodTimeTo"
                      label2="To"
                      classNameWrapper="mt-4"
                    />
                  ) : (
                    <WorkingHours
                      intervals={availableCalendarIntervals?.intervals}
                      endIntervals={availableCalendarIntervals?.endIntervals}
                      timeZone={parsedPreBookInfo?.preBookResponse.timeZone}
                      title=""
                      timeFrom={values.startTime || null}
                      setTimeFrom={updateStartTime}
                      timeTo={values?.endTime || null}
                      setTimeTo={updateEndTime}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={cn('flex items-center justify-center mt-[16px]')}>
          <Button
            mode={isDesktop ? ButtonMode.FULL_PRIMARY : ButtonMode.SMALL}
            className={cn('w-full text-lg h-11 disabled:bg-indigo-100', {
              'w-48 text-s-base': !isDesktop,
            })}
            type="button"
            disabled={!values.startTime || !values.endTime}
            onClick={() => onSubmit()}
          >
            Save
          </Button>
        </div>
      </Dialog>
      {parsedPreBookInfo?.preBookResponse.timeZone && (
        <>
          <DatePickerDialog
            onSubmit={() => {
              const startDate = dateUtil(
                startDateCalendarValue || values.startDate
              ).format(dateFormats.display0)

              setFieldValue('startDate', startDate)
              setFieldValue('endDate', startDate)
              setStartCalendarOpen(false)
              setStartDateCalendarValue()
            }}
            onClose={() => {
              setStartCalendarOpen(false)
              setStartDateCalendarValue()
            }}
            open={startCalendarOpen}
            title={dateUtil(startDateCalendarValue || values.startDate).format(
              dateFormats.display3
            )}
            loading={isFetchingCalendar || isFetchingPeriod}
          >
            {startCalendarOpen && (
              <BookingDatepicker
                dayFrom={values.startDate}
                onChange={(startDate) => {
                  setStartDateCalendarValue(startDate)
                }}
                calendarIntervals={availabilityCalendar}
                timeZone={parsedPreBookInfo?.preBookResponse.timeZone}
              />
            )}
          </DatePickerDialog>
          <DatePickerDialog
            onSubmit={() => {
              setFieldValue(
                'endDate',
                dateUtil(endDateCalendarValue || values.endDate).format(
                  dateFormats.display0
                )
              )
              setEndCalendarOpen(false)
              setEndDateCalendarValue()
            }}
            onClose={() => {
              setEndCalendarOpen(false)
              setEndDateCalendarValue()
            }}
            open={endCalendarOpen}
            title={dateUtil(endDateCalendarValue || values.endDate).format(
              dateFormats.display3
            )}
            loading={isFetchingPeriod}
          >
            {endCalendarOpen && (
              <BookingDatepicker
                dayFrom={values.endDate}
                calendarIntervals={availabilityFromPeriod}
                onChange={(startDate) => {
                  setEndDateCalendarValue(startDate)
                }}
                timeZone={parsedPreBookInfo?.preBookResponse.timeZone}
              />
            )}
          </DatePickerDialog>
        </>
      )}
    </>
  )
}

export default BookingPeriod
