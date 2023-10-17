import Close from '@assets/icons/close-24.svg'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { Button } from '@components/index'
import ScrollbarContainer from '@components/ScrollbarContainer/ScrollbarContainer'
import Title from '@components/Title/Title'
import { dateFormats } from '@constants/global'
import { tzOrUtc, useDateUtil } from '@hooks/useDateUtil'
import { TimeDialogProps } from '@screens/user/components/TimeDialog/TimeDialog.model'
import cn from 'classnames'
import React, { useMemo, useRef, useState, useLayoutEffect } from 'react'

const TimeDialog = ({
  isOpen,
  closeModal,
  onSubmit,
  intervals,
  startDate,
  endDate,
  timeZone,
  inline,
}: TimeDialogProps) => {
  const dateUtil = useDateUtil()
  const [timeFrom, setTimeFrom] = useState<string>(startDate)
  const [timeTo, setTimeTo] = useState<string>(endDate)
  const ref = useRef<null | HTMLDivElement>(null)

  const hoursTime = dateUtil(timeTo).diff(timeFrom, 'hours')
  const minutesTime = dateUtil(timeTo).diff(timeFrom, 'minutes')

  const allIntervals = useMemo(() => {
    let time = tzOrUtc(dateUtil(intervals[0]), timeZone).startOf('day')
    const array = [`${time.format(dateFormats.iso8601)}Z`]
    while (array.length <= 95) {
      time = time.add(15, 'minutes')
      array.push(`${time.format(dateFormats.iso8601)}Z`)
    }
    return array
  }, [intervals])

  useLayoutEffect(() => {
    if (ref) {
      ref?.current?.scrollIntoView()
    }
  }, [])

  const renderContent = () => (
    <>
      <Title
        as="h4"
        className="flex items-center justify-center text-lg font-semibold text-center mb-[18px]"
      >
        {timeFrom && timeTo ? (
          <>
            Total time:{' '}
            <p className="text-primary !text-lg !font-semibold ml-[7px]">
              {hoursTime > 0
                ? `${
                    hoursTime > 1 ? `${hoursTime} hours ` : `${hoursTime} hour `
                  }${
                    minutesTime / 60 > hoursTime
                      ? `${minutesTime - hoursTime * 60} minutes`
                      : ''
                  }`
                : `${minutesTime} minutes`}
            </p>
          </>
        ) : (
          'Select start time'
        )}
      </Title>
      <div className="flex items-center justify-between mb-3 ml-[2.5px]">
        <div>
          <Title
            as="h5"
            noCap
            className={cn('font-semibold', {
              'text-blue-1 !font-normal': timeFrom,
            })}
          >
            Start:{' '}
            <span className="font-semibold">
              {timeFrom &&
                tzOrUtc(dateUtil(timeFrom), timeZone).format(
                  dateFormats.timeDisplay0
                )}
            </span>
          </Title>
        </div>
        {timeFrom && (
          <div>
            <Title
              as="h5"
              noCap
              className={cn('font-semibold', {
                'text-blue-1 !font-normal': timeTo,
              })}
            >
              End:{' '}
              <span className="font-semibold">
                {timeTo &&
                  tzOrUtc(dateUtil(timeTo), timeZone).format(
                    dateFormats.timeDisplay0
                  )}
              </span>
            </Title>
          </div>
        )}
      </div>
      <ScrollbarContainer
        className={cn('flex flex-wrap justify-between w-full overflow-y-auto', {
          'max-h-[225px]': !inline,
        })}
      >
        {allIntervals.map((item: string, idx: number) => {
          const isAvailable = intervals.indexOf(item) >= 0
          return (
            <div
              key={item}
              ref={idx === 48 ? ref : null}
              className={cn(
                'flex items-center justify-center text-xs text-blue-2 px-2 box-border w-[24%] border border-[#cbd4ee] border-solid h-[33px] rounded-[5px] mt-0 mb-[5px]',
                {
                  '!text-primary !border-primary cursor-pointer': isAvailable,
                  'bg-primary !text-white':
                    dateUtil(item).isSame(timeFrom) ||
                    dateUtil(item).isSame(timeTo),
                  '!text-white !bg-primary':
                    tzOrUtc(dateUtil(item), timeZone).isSame(
                      dateUtil(timeFrom)
                    ) ||
                    (tzOrUtc(dateUtil(item), timeZone).isAfter(
                      dateUtil(timeFrom)
                    ) &&
                      tzOrUtc(dateUtil(item), timeZone).isBefore(
                        dateUtil(timeTo)
                      )),
                }
              )}
              onClick={() => {
                if (!isAvailable) {
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
              {tzOrUtc(dateUtil(item), timeZone).format(
                dateFormats.timeDisplay0
              )}
            </div>
          )
        })}
      </ScrollbarContainer>
      <Button
        mode={ButtonMode.FULL_PRIMARY}
        onClick={() => {
          onSubmit(timeFrom, timeTo)
          closeModal()
        }}
        disabled={!(timeFrom && timeTo)}
        className="mt-[26px] !h-11 !text-base !bg-primary !font-semibold"
      >
        Save
      </Button>
    </>
  )

  return inline ? (
    renderContent()
  ) : (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="w-[343px] !p-4 !rounded-[10px]"
    >
      <div
        className="absolute right-[11px] top-[11px]"
        onClick={() => {
          closeModal()
          onSubmit('', '')
        }}
      >
        <Close className="fill-blue-3" />
      </div>
      {renderContent()}
    </Dialog>
  )
}

export default TimeDialog
