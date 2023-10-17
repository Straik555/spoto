import React, { FC, useState } from 'react'
import DatePickerDialog from '@components/DatePickerDialog'
import {
  DatePickerDialogProps,
  DatePickerVariant,
} from '@components/DatePickerDialog/DatePickerDialog.model'
import { useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'
import { Provider } from 'react-redux'
import { getStore } from '@redux/store'
import CalendarIcon from '@assets/icons/calendar.svg'

export default {
  title: 'Reusable Components/DatePickerDialog',
  component: DatePickerDialog,
}

const Template: FC<DatePickerDialogProps> = (props) => {
  const store = getStore({
    preloadedState: undefined,
    memoized: true,
  })
  return (
    <Provider store={store}>
      <DatePickerDialog {...props} />
    </Provider>
  )
}

type DatePickerProps = {
  variant: DatePickerVariant
  period: boolean
}

const DatePicker: FC<DatePickerProps> = ({ variant, period }) => {
  const dateUtil = useDateUtil()
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const [isPeriod, setIsPeriod] = useState<boolean>(period)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dayFrom, setDayFrom] = useState<Date | null>(null)
  const [dayTo, setDayTo] = useState<Date | null>(null)

  return (
    <div>
      <button
        type="button"
        className="relative h-12 p-3 mt-2 mb-6 mr-2 text-base text-left bg-white border w-[300px] rounded-md border-blue-2 text-blue-1"
        onClick={() => {
          setIsOpen(true)
          setDayFrom(new Date())
        }}
      >
        {dayFrom
          ? dateUtil(dayFrom).format(dateFormats.display0)
          : 'Select Date From'}
        <CalendarIcon className="absolute top-2.5 right-4 fill-blue-3" />
      </button>
      {isPeriod && (
        <button
          type="button"
          className="relative h-12 p-3 mt-2 mb-6 mr-2 text-base text-left bg-white border w-[300px] rounded-md border-blue-2 text-blue-1"
          onClick={() => setIsOpen(true)}
        >
          {dayTo
            ? dateUtil(dayTo).format(dateFormats.display0)
            : 'Select Date To'}
          <CalendarIcon className="absolute top-2.5 right-4 fill-blue-3" />
        </button>
      )}
      <div className="flex items-center">
        <button
          type="button"
          className="flex justify-center h-12 p-3 mr-2 text-base text-left bg-white border w-[160px] rounded-md border-blue-2 text-blue-1"
          onClick={() => setIsDesktop(!isDesktop)}
        >
          {!isDesktop ? 'Mobile' : 'Desktop'}
        </button>
        {isDesktop ? (
          <p>
            In order to see a correct mobile version - please switch to browser
            view
          </p>
        ) : (
          <p>
            In order to see a correct mobile version - please switch to mobile
            view
          </p>
        )}
      </div>
      {period && (
        <button
          type="button"
          className="flex justify-center h-12 p-3 mt-2 mb-6 mr-2 text-base text-left bg-white border w-[160px] rounded-md border-blue-2 text-blue-1"
          onClick={() => setIsPeriod(!isPeriod)}
        >
          {!isPeriod ? 'Not Period' : 'Period'}
        </button>
      )}
      {isOpen && (
        <Template
          dayTo={new Date()}
          dayFrom={dayFrom}
          isPeriod={isPeriod}
          timeZone={'Australia/Sydney'}
          calendarIntervals={[]}
          modalIsOpen
          closeModal={() => setIsOpen(false)}
          onSubmit={(start, end) => {
            setDayFrom(start)
            setDayTo(end)
          }}
          isDesktop={isDesktop}
          variant={variant}
        />
      )}
    </div>
  )
}

export const VariantBookingDatepicker = () => (
  <DatePicker variant={DatePickerVariant.BOOKING} period />
)

export const VariantSearchDatepicker = () => (
  <DatePicker variant={DatePickerVariant.SEARCH} period={false} />
)

export const VariantSettingsDatepicker = () => (
  <DatePicker variant={DatePickerVariant.SETTINGS} period />
)
