import { useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import { DatePickerVariant } from '@components/DatePickerDialog/DatePickerDialog.model'
import DatePickerDialog from '@components/DatePickerDialog'
import Input from '@components/Form/Input/Input'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { BookingSettingsOptionPermanentFormValues } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import CalendarIcon from '@assets/icons/calendar.svg'

const EndDate: FC<{ className?: string; isPeriod?: boolean }> = ({
  className,
  isPeriod = false,
}) => {
  const dateUtil = useDateUtil()
  const form = useFormikContext<BookingSettingsOptionPermanentFormValues>()
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Input
        className={className}
        name="endDate"
        label="End date"
        readOnly
        trailingIcon={<CalendarIcon className="fill-blue-3" />}
        onClick={() => {
          setModalOpen(true)
        }}
      />

      {isModalOpen && (
        <DatePickerDialog
          dayFrom={
            form.values.startDate
              ? dateUtil(form.values.startDate).toDate()
              : dateUtil().add(-10).toDate()
          }
          dayTo={
            form.values.endDate
              ? dateUtil(form.values.endDate).toDate()
              : dateUtil().add(-10).toDate()
          }
          modalIsOpen={isModalOpen}
          isPeriod={isPeriod}
          closeModal={() => {
            setModalOpen(false)
          }}
          onSubmit={(startDate, endDate) => {
            form.setFieldValue(
              'startDate',
              dateUtil(startDate).format(dateFormats.display0)
            )
            if (isPeriod) {
              form.setFieldValue(
                'endDate',
                dateUtil(endDate).format(dateFormats.display0)
              )
            }
            setModalOpen(false)
          }}
          title="Select End Date"
          defaultTitle
          backBtnVisible={false}
          variant={DatePickerVariant.SETTINGS}
        />
      )}
    </>
  )
}

export default EndDate
