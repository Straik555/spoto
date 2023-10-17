import bookingApi from '@api/booking'
import Close from '@assets/icons/close-20.svg'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { Button } from '@components/index'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { ExtendModalProps } from '@screens/user/Bookings/ExtendModal/ExtendModal.model'
import { ExtendModal } from '@screens/user/Bookings/ExtendModal/index'
import cn from 'classnames'
import Title from '@components/Title/Title'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const ExtendTimeModal: FC<ExtendModalProps> = ({
  isOpen,
  closeModal,
  spot,
  noRange,
}) => {
  const [timeTo, setTimeTo] = useState<string>('')
  const [timeFrom, setTimeFrom] = useState<string>('')
  const dateUtil = useDateUtil()
  const [extendBooking] = bookingApi.endpoints.extendBooking.useMutation()
  const { data: availabilityExtend = [], ...availabilityExtendRes } =
    bookingApi.endpoints.getBookingAvailabilityExtend.useQuery(spot.id, {
      skip: !isOpen,
    })
  const intervals = useMemo(() => {
    if (!availabilityExtend) return []

    return availabilityExtend[0]?.intervals?.intervals.map((time) => {
      return dateUtil(time)
        .tz(availabilityExtend[0]?.intervals?.timeZone)
        .add(noRange ? 15 : 0, 'm')
        .format(dateFormats.iso8601Z)
    })
  }, [availabilityExtend])

  const handleSave = async () => {
    await extendBooking({
      bookingId: spot.id,
      extendedEnd: `${dateUtil(timeTo).utc().format(dateFormats.iso8601)}Z`,
    })
  }

  useEffect(() => {
    if (availabilityExtendRes.isError) {
      toast.error('Failed extending the booking')
      closeModal()
    }
  }, [availabilityExtendRes.isError])

  if (availabilityExtendRes.isLoading || availabilityExtendRes.isError)
    return null

  return (
    <>
      {intervals.length ? (
        <Dialog open={isOpen} onClose={closeModal}>
          <div
            className="absolute right-[14px] top-[14px]"
            onClick={closeModal}
          >
            <Close className="cursor-pointer fill-blue-3" />
          </div>
          <Title
            as="h5"
            noCap
            className="w-full font-semibold text-center text-s-lg"
          >
            Extend Parking Time
          </Title>
          <div className="flex items-center justify-between pt-6 mb-5">
            {!noRange && (
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
                    availabilityExtend &&
                    dateUtil(timeFrom)
                      .tz(availabilityExtend[0]?.intervals?.timeZone)
                      .format(dateFormats.timeDisplay0)}
                </span>
              </Title>
            )}

            <Title
              as="h5"
              noCap
              className={cn('font-semibold', {
                '!font-normal': timeTo,
              })}
            >
              {timeTo ? (
                <>
                  Extend to:{' '}
                  <span className="font-semibold">
                    {timeTo &&
                      availabilityExtend &&
                      dateUtil(timeTo)
                        .tz(availabilityExtend[0]?.intervals?.timeZone)
                        .format(dateFormats.timeDisplay0)}
                  </span>
                </>
              ) : (
                <span>End:</span>
              )}
            </Title>
          </div>
          {availabilityExtend[0]?.intervals?.timeZone && intervals?.length > 0 && (
            <div className="flex flex-wrap content-start mb-2 -mr-2 overflow-y-auto flex-start w-[325px] h-[200px]">
              {intervals?.map((item: string) => {
                return (
                  <div
                    key={item}
                    className={cn(
                      'flex items-center justify-center text-primary box-border text-xs w-[72px] h-[33px]',
                      'mb-2 mr-2 rounded-[5px] border border-solid border-primary cursor-pointer',
                      {
                        'bg-primary !text-white shadow-3':
                          dateUtil(item).isSame(timeFrom) ||
                          dateUtil(item).isSame(timeTo),
                        '!text-white bg-blue-2':
                          dateUtil(item).utc().isSame(dateUtil(timeFrom)) ||
                          (dateUtil(item).utc().isAfter(dateUtil(timeFrom)) &&
                            dateUtil(item).utc().isBefore(dateUtil(timeTo))),
                      }
                    )}
                    onClick={() => {
                      if (noRange) {
                        setTimeTo(item)
                        return
                      }

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
                    {dateUtil(item)
                      .tz(availabilityExtend[0]?.intervals?.timeZone)
                      .format(dateFormats.timeDisplay0)}
                  </div>
                )
              })}
            </div>
          )}
          <div className="text-xs text-center text-blue-1">
            Additional charges will apply if you decide to extend
          </div>
          <div className="flex flex-col items-center justify-between mt-4">
            <Button
              className="!text-base !font-semibold !px-5 !h-[44px]"
              mode={ButtonMode.FULL_PRIMARY}
              onClick={() => {
                handleSave()
                closeModal()
              }}
            >
              Extend
            </Button>
          </div>
        </Dialog>
      ) : (
        <ExtendModal
          closeModal={closeModal}
          spot={spot}
          isOpen={isOpen}
          noAvailableTime
        />
      )}
    </>
  )
}

export default ExtendTimeModal
