import bookingApi from '@api/booking'
import ArrowLeft from '@assets/icons/arrows/arrow-left-small.svg'
import Close from '@assets/icons/close-20.svg'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { Button } from '@components/index'
import Title from '@components/Title/Title'
import { dateFormats } from '@constants/global'
import { ROUTES } from '@constants/routes'
import { useDateUtil } from '@hooks/useDateUtil'
import { ExtendModalProps } from '@screens/user/Bookings/ExtendModal/ExtendModal.model'
import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useState } from 'react'
import Timer from './Timer'

const HEADER_TYPES = {
  TIME_UP: 'Time Is Up!',
  NO_AVALIABLE_TIMES: 'No Avaliable Times',
  NO_AVALIABLE_SPOT: 'No Avaliable spots',
  EXTEND: 'Extend This Spot',
}

const ExtendModal: FC<ExtendModalProps> = ({
  isOpen,
  closeModal,
  spot,
  noAvailableTime,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [intervals, setIntervals] = useState<string[]>([])
  const [timeZone, setTimeZone] = useState<string>('')
  const [isExtend, setIsExtend] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)
  const [timeTo, setTimeTo] = useState<string>('')
  const [timeFrom, setTimeFrom] = useState<string>('')
  const [headerType, setHeaderType] = useState<string>(
    noAvailableTime ? HEADER_TYPES.NO_AVALIABLE_TIMES : HEADER_TYPES.TIME_UP
  )
  const router = useRouter()
  const dateUtil = useDateUtil()
  const [extendBooking] = bookingApi.endpoints.extendBooking.useMutation()
  const [cancelOrEndBooking] =
    bookingApi.endpoints.cancelOrEndBooking.useMutation()
  const { data: availabilityExtend = [] } =
    bookingApi.endpoints.getBookingAvailabilityExtend.useQuery(spot.id, {
      skip: !isOpen,
    })

  useEffect(() => {
    ;(async () => {
      setTimer(
        Math.max(dateUtil(spot.ends).diff(dateUtil(new Date()), 'minutes'), 0)
      )
      if (availabilityExtend.length > 0) {
        setIsLoading(true)
        setIntervals(availabilityExtend[0]?.intervals?.intervals)
        setTimeZone(availabilityExtend[0]?.intervals?.timeZone)
        setIsLoading(false)
      }
    })()
  }, [availabilityExtend])

  const allIntervals = useMemo(() => {
    let time = dateUtil(intervals[0]).startOf('day')
    const array = [`${time.format(dateFormats.iso8601)}Z`]
    while (array.length <= 95) {
      time = time.add(15, 'minutes')
      array.push(`${time.format(dateFormats.iso8601)}Z`)
    }
    return array
  }, [intervals])

  const handleSave = async () => {
    await extendBooking({
      bookingId: spot.id,
      extendedEnd: dateUtil(timeTo).utc().format(dateFormats.iso8601Z),
    })
  }

  const handleEnd = async () => {
    await cancelOrEndBooking(spot.id)
  }

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="absolute right-[13px] top-[13px]" onClick={closeModal}>
        <Close className="cursor-pointer fill-blue-3" />
      </div>
      <div className="flex items-center justify-start">
        {isExtend && intervals?.length > 0 && (
          <div
            className="flex items-start justify-start mr-3 text-xs font-normal h-9 text-blue-1"
            onClick={() => setIsExtend(false)}
          >
            <ArrowLeft className="mr-[9.5px] mt-[4px] stroke-blue-1" />
            <span>Back</span>
          </div>
        )}
        <Title
          as="h5"
          noCap
          className="w-full font-semibold text-center text-s-lg"
        >
          {headerType}
        </Title>
      </div>
      {!isExtend && !noAvailableTime && (
        <p className="ml-6 mr-5 text-sm mb-[109px] text-text">
          Please remove car if no spots available or get fined.
        </p>
      )}
      {!isExtend && !isLoading && !noAvailableTime && (
        <div className="text-4xl font-semibold text-center text-primary mb-[109px]">
          <Timer time={timer} />
        </div>
      )}
      {(isExtend || !noAvailableTime) &&
        (intervals?.length ? (
          <div className="flex items-center justify-between pl-2">
            <Title
              as="h5"
              noCap
              className={cn('font-semibold', {
                'text-blue-1 text-sm !font-normal not-italic': timeFrom,
              })}
            >
              Extend from:{' '}
              <span className="font-semibold">
                {timeFrom &&
                  dateUtil(timeFrom)
                    .tz(timeZone)
                    .format(dateFormats.timeDisplay0)}
              </span>
            </Title>
            <Title
              as="h5"
              noCap
              className={cn('font-semibold', {
                'text-blue-1 text-sm !font-normal not-italic': timeTo,
              })}
            >
              Extend to:{' '}
              <span className="font-semibold">
                {timeTo &&
                  dateUtil(timeTo)
                    .tz(timeZone)
                    .format(dateFormats.timeDisplay0)}
              </span>
            </Title>
          </div>
        ) : (
          <p className="mx-2 text-base mb-[109px] text-text">
            {isChange || noAvailableTime
              ? 'Another user has booked this spot. Please proceed to move yoru car to avoid further charges.'
              : 'There are no more avaliable spots in this location. Please proceed to move your car to avoid further charges.'}
          </p>
        ))}
      {isExtend && intervals.length > 0 && (
        <div className="flex flex-wrap justify-start w-full mb-2 overflow-y-auto max-h-72">
          {intervals?.map((item: string) => {
            return (
              <div
                key={item}
                className={cn(
                  'flex items-center justify-center text-blue-2 px-2 py-5 box-border text-xs w-[72px] h-[33px] m-[0_2.5px_5px] rounded-[5px] border border-solid border-blue-3',
                  {
                    '!text-primary !border-primary':
                      allIntervals.indexOf(item) >= 0,
                    'bg-primary !text-white shadow-3':
                      dateUtil(item).isSame(timeFrom) ||
                      dateUtil(item).isSame(timeTo),
                    '!text-white bg-blue-2':
                      dateUtil(item).tz(timeZone).isSame(dateUtil(timeFrom)) ||
                      (dateUtil(item)
                        .tz(timeZone)
                        .isAfter(dateUtil(timeFrom)) &&
                        dateUtil(item).tz(timeZone).isBefore(dateUtil(timeTo))),
                  }
                )}
                onClick={() => {
                  if (timeFrom === item || timeTo === item) {
                    setTimeTo('')
                    setTimeFrom('')
                  } else if (timeFrom && timeFrom < item) {
                    setTimeTo(item)
                  } else if (timeTo && timeFrom > item) {
                    setTimeFrom(item)
                    setTimeTo('')
                  } else {
                    setTimeFrom(item)
                  }
                }}
              >
                {dateUtil(item).tz(timeZone).format(dateFormats.timeDisplay0)}
              </div>
            )
          })}
        </div>
      )}
      {noAvailableTime && (
        <div className="text-base text-center text-blue-1 py-[19px]">
          Another user has booked this spot. Please move your vehicle to another
          spot or end parking to avoid further charges.
        </div>
      )}
      <div
        className={cn('flex items-center justify-center w-full', {
          '!hidden': isExtend && intervals.length,
        })}
      >
        <Button
          className={cn(
            '!text-xs !font-semibold !px-5 !h-[41px] !w-[149px] !bg-white !text-primary !border-[2px] !border-solid !border-primary',
            {
              '!hidden': isChange || noAvailableTime,
            }
          )}
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => {
            setIsExtend(true)
            if (intervals?.length) {
              setHeaderType(HEADER_TYPES.EXTEND)
            } else if (!intervals?.length) {
              setIsChange(true)
              setHeaderType(HEADER_TYPES.NO_AVALIABLE_TIMES)
            } else {
              setHeaderType(HEADER_TYPES.NO_AVALIABLE_SPOT)
            }
          }}
        >
          {!isExtend ? 'Extend Time' : 'Change Spot'}
        </Button>
        <Button
          className={cn('!font-semibold !px-5 !h-[41px]')}
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => {
            handleEnd()
            closeModal()
          }}
        >
          End Parking
        </Button>
      </div>
      <div
        className={cn('flex flex-col items-center justify-between px-2 pb-2', {
          '!hidden': !isExtend || !intervals?.length,
        })}
      >
        <Button
          className={cn(
            'mb-2 !text-sm !font-semibold !px-5 !h-[41px] !w-[303px]',
            {
              '!hidden': !timeFrom && !timeTo,
            }
          )}
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => {
            handleSave()
            closeModal()
          }}
        >
          Save
        </Button>
        <Button
          className="!text-sm !font-semibold !px-5 !h-[41px] !w-[303px] !bg-white !text-primary !border-[2px] !border-solid !border-primary"
          mode={ButtonMode.FULL_SECONDARY}
          onClick={() => {
            router.push({
              pathname: ROUTES.FIND_SPOT,
              query: {
                id: spot.spotId,
              },
            })
            closeModal()
          }}
        >
          Book another Spot
        </Button>
      </div>
    </Dialog>
  )
}

export default ExtendModal
