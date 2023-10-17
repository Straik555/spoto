import { useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import { BookingState } from '@api/booking/types'
import DatePickerDialog from '@components/DatePickerDialog/DatePickerDialog'
import Input from '@components/Form/Input/Input'
import Select from '@components/Select'
import { Option } from '@components/Select/Select'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { BookingCalendarFormValues } from '@screens/superAdmin/BookingCalendar/BookingCalendar.model'
import { DatePickerVariant } from '@components/DatePickerDialog/DatePickerDialog.model'
import CalendarIcon from '@assets/icons/calendar.svg'

const BookingCalendarForm: FC = () => {
  const dateUtil = useDateUtil()
  const form = useFormikContext<BookingCalendarFormValues>()
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  return (
    <div className="w-full gap-5 grid grid-flow-col auto-cols-max">
      <Input
        className=" w-[300px]"
        inputClassName="cursor-pointer"
        label="Start Day"
        name="startDayReadOnly"
        readOnly
        trailingIcon={<CalendarIcon className="cursor-pointer fill-primary" />}
        onClick={() => setShowStartDatePicker(true)}
        value={
          dateUtil(form.values.startDate).isToday()
            ? 'Today'
            : dateUtil(form.values.startDate).format(dateFormats.display0)
        }
      />
      <Input
        className=" w-[300px]"
        inputClassName="cursor-pointer"
        name="endDayReadOnly"
        label="End Day"
        readOnly
        trailingIcon={<CalendarIcon className="cursor-pointer fill-primary" />}
        onClick={() => setShowEndDatePicker(true)}
        value={
          dateUtil(form.values.endDate).isToday()
            ? 'Today'
            : dateUtil(form.values.endDate).format(dateFormats.display0)
        }
      />
      <Select
        className="w-[200px]"
        title="Booking State"
        titleClassName="text-s-base"
        onSelect={(bookingState: BookingState | null) => {
          form.setValues({
            ...form.values,
            bookingState,
          })
        }}
        label={form.values.bookingState || 'All'}
      >
        <Option
          value={null}
          text="All"
          active={form.values.bookingState === null}
        />
        <Option
          value={BookingState.PreBook}
          text={BookingState.PreBook}
          active={BookingState.PreBook === form.values.bookingState}
        />
        <Option
          value={BookingState.Confirmed}
          text={BookingState.Confirmed}
          active={BookingState.Confirmed === form.values.bookingState}
        />
        <Option
          value={BookingState.End}
          text={BookingState.End}
          active={BookingState.End === form.values.bookingState}
        />
        <Option
          value={BookingState.Cancel}
          text={BookingState.Cancel}
          active={BookingState.Cancel === form.values.bookingState}
        />
        <Option
          value={BookingState.WaitingForVehicleLeft}
          text={BookingState.WaitingForVehicleLeft}
          active={
            BookingState.WaitingForVehicleLeft === form.values.bookingState
          }
        />
      </Select>

      {showStartDatePicker && (
        <DatePickerDialog
          modalIsOpen
          isPeriod={false}
          timeZone={dateUtil.tz.guess()}
          closeModal={() => setShowStartDatePicker(false)}
          onSubmit={(selectedDate) => {
            const startDate = dateUtil(selectedDate)
            const currentEndDate = dateUtil(form.values.endDate)
            const endDate = currentEndDate.isAfter(startDate)
              ? currentEndDate
              : startDate

            form.setValues({
              ...form.values,
              startDate: startDate.startOf('day'),
              endDate: endDate.endOf('day'),
            })
          }}
          dayFrom={form.values.startDate.toDate()}
          dayTo={form.values.endDate.toDate()}
          variant={DatePickerVariant.SETTINGS}
        />
      )}
      {showEndDatePicker && (
        <DatePickerDialog
          modalIsOpen
          isPeriod={false}
          timeZone={dateUtil.tz.guess()}
          closeModal={() => setShowEndDatePicker(false)}
          onSubmit={(selectedDate) => {
            const endDate = dateUtil(selectedDate)
            const currentStartDate = dateUtil(form.values.startDate)
            const startDate = currentStartDate.isBefore(endDate)
              ? currentStartDate
              : endDate

            form.setValues({
              ...form.values,
              startDate: startDate.startOf('day'),
              endDate: endDate.endOf('day'),
            })
          }}
          dayFrom={form.values.startDate.toDate()}
          dayTo={form.values.endDate.toDate()}
          variant={DatePickerVariant.SETTINGS}
        />
      )}
    </div>
  )
}
export default BookingCalendarForm
