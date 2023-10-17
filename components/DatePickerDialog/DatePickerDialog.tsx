import React, { FC, useCallback, useState } from 'react'
import cn from 'classnames'
import { ButtonMode } from '@components/Button/Button.model'
import {
  DatePickerDialogProps,
  DatePickerVariant,
} from '@components/DatePickerDialog/DatePickerDialog.model'
import Dialog from '@components/Dialog/Dialog'
import { Button } from '@components/index'
import { Loader } from '@components/Loader'
import { dateFormats } from '@constants/global'
import { tzOrUtc, useDateUtil } from '@hooks/useDateUtil'
import {
  BookingDatepicker,
  SearchDatepicker,
  SettingsDatepicker,
} from '@components/DatePicker'
import Title from '@components/Title/Title'
import 'react-datepicker/dist/react-datepicker.css'
import Close from '@assets/icons/close-24.svg'

const DatePickerDialog: FC<DatePickerDialogProps> = ({
  dayFrom,
  modalIsOpen,
  closeModal,
  onSubmit,
  timeZone,
  closeText = 'Close',
  title = 'Select booking day',
  backBtnVisible,
  inline,
  defaultTitle = false,
  isDesktop,
  setIsCalendar,
  calendarIntervals,
  setAvailabilityFromStartDate,
  isFetching,
  variant,
  isPeriod,
  startDate,
  isDisabled,
}) => {
  const [isDefaultTitle, setIsDefaultTitle] = useState<boolean>(defaultTitle)
  const dateUtil = useDateUtil()
  const [startDay, setStartDay] = useState<Date | null>(
    dateUtil(
      `${tzOrUtc(dateUtil(dayFrom)).format(dateFormats.iso8601)}Z`
    ).toDate()
  )

  const [endDate, setEndDate] = useState<Date | null>(null)

  const onChange = useCallback((startDate, endDay) => {
    setIsDefaultTitle(false)
    setStartDay(startDate)
    setEndDate(endDay)
    if (setAvailabilityFromStartDate) {
      setAvailabilityFromStartDate(startDate)
    }
  }, [])

  const onClickMonth = useCallback((startDate) => {
    if (!isPeriod) {
      if (setAvailabilityFromStartDate) {
        setAvailabilityFromStartDate(startDate)
      }
      if (setIsCalendar) {
        setIsCalendar(true)
      }
    }
  }, [])

  const renderContent = () => (
    <>
      <div
        className={cn('absolute right-[10px] top-[10px]', { hidden: inline })}
        onClick={() => closeModal()}
      >
        <Close className="fill-blue-3" />
      </div>
      <Title
        as="h4"
        className={cn('mb-[17px] font-semibold text-s-xl text-center', {
          'text-[28px]': isDesktop,
        })}
      >
        {!isDefaultTitle ? (
          <div>
            {dateUtil(startDay).format(dateFormats.display3)}
            {endDate && (
              <span> - {dateUtil(endDate).format(dateFormats.display3)}</span>
            )}
          </div>
        ) : (
          title
        )}
      </Title>
      {variant === DatePickerVariant.BOOKING && (
        <BookingDatepicker
          dayFrom={startDay}
          dayTo={endDate}
          onChange={onChange}
          calendarIntervals={calendarIntervals}
          timeZone={timeZone}
          onClickMonth={onClickMonth}
          isPeriod={isPeriod}
        />
      )}
      {variant === DatePickerVariant.SEARCH && (
        <SearchDatepicker
          dayFrom={startDay}
          dayTo={endDate}
          onChange={onChange}
          calendarIntervals={calendarIntervals}
          timeZone={timeZone}
          startDate={startDate}
        />
      )}
      {variant === DatePickerVariant.SETTINGS && (
        <SettingsDatepicker
          isDisabled={isDisabled}
          dayFrom={startDay}
          dayTo={endDate}
          onChange={onChange}
          calendarIntervals={calendarIntervals}
          timeZone={timeZone}
          isPeriod={isPeriod}
        />
      )}
      <Button
        mode={isDesktop ? ButtonMode.FULL_PRIMARY : ButtonMode.SMALL}
        className={cn('w-full mt-[15px]', {
          'h-11 text-s-lg': !isDesktop,
          'h-[50px]': isDesktop,
          'bg-blue-3': !startDay || (isPeriod && !(startDay && endDate)),
        })}
        disabled={!startDay || (isPeriod && !(startDay && endDate))}
        onClick={() => {
          if (startDay) {
            const intervalStart = calendarIntervals?.filter(
              ({ date, intervals }) => {
                if (dateUtil(startDay)?.isSame(dateUtil(date).startOf('day'))) {
                  return intervals?.intervals
                }
              }
            )
            const intervalEnd = calendarIntervals?.filter(
              ({ date, intervals }) => {
                if (dateUtil(endDate)?.isSame(dateUtil(date).startOf('day'))) {
                  return intervals?.intervals
                }
              }
            )
            onSubmit(
              dateUtil(
                `${dateUtil(startDay).format(dateFormats.iso8601)}${dateUtil(
                  startDay
                )
                  .tz(timeZone)
                  .format('Z')}`
              )
                .utc()
                .toDate(),
              endDate
                ? dateUtil(
                    `${dateUtil(endDate).format(dateFormats.iso8601)}${dateUtil(
                      endDate
                    )
                      .tz(timeZone)
                      .format('Z')}`
                  )
                    .utc()
                    .toDate()
                : null,
              intervalStart?.length
                ? intervalStart[0]?.intervals?.intervals
                : [],
              intervalEnd?.length ? intervalEnd[0]?.intervals?.intervals : []
            )
            closeModal()
          }
        }}
      >
        {isDesktop ? 'Confirm' : 'Save'}
      </Button>
      {backBtnVisible && (
        <div
          className={cn('w-full text-center cursor-pointer text-blue-2', {
            'text-s-xl mt-5': isDesktop,
            'mt-[16px]]': !isDesktop,
          })}
          onClick={() => {
            setStartDay(null)
            setEndDate(null)
            if (setIsCalendar) {
              setIsCalendar(true)
            }
            if (setAvailabilityFromStartDate) {
              setAvailabilityFromStartDate(dayFrom)
            }
            if (inline) {
              closeModal()
            }
          }}
        >
          {closeText ? closeText : 'Clear'}
        </div>
      )}
    </>
  )

  return inline ? (
    <div className="py-4">
      <Loader
        className="absolute top-0 left-0 w-full p-[15px_80px] !bg-white !bg-opacity-25 z-[99999]"
        loading={isFetching}
      />
      {renderContent()}
    </div>
  ) : (
    <Dialog
      open={!!modalIsOpen}
      onClose={closeModal}
      className={cn('min-h-[450px]', {
        '': inline,
        'w-[580px] p-[30px_42px_40px]': isDesktop && !inline,
        'w-[343px] p-[17px_16px_16px] !rounded-[10px]': !isDesktop && !inline,
      })}
    >
      <Loader
        className="absolute top-0 left-0 w-full p-[15px_80px] !bg-white !bg-opacity-25 z-[99999]"
        loading={isFetching}
      />
      {renderContent()}
    </Dialog>
  )
}

export default DatePickerDialog
