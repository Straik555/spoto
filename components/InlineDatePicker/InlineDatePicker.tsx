import React, { useCallback, useState } from 'react'

import { dateFormats } from '@constants/global'
import { SearchDatepicker } from '@components/DatePicker'
import { tzOrUtc, useDateUtil } from '@hooks/useDateUtil'
import CalendarIcon from '@assets/icons/calendar.svg'
import useDetectClickOutside from '@hooks/useDetectClickOutside/useDetectClickOutside'
import Input from '@components/Form/Input/Input'

import { InlineDatePickerFn } from './InlineDatePicker.model'

const InlineDatePicker: InlineDatePickerFn = ({
  timeZone,
  calendarIntervals,
  setAvailabilityFromStartDate,
  onChange,
  title,
  value,
  isDisabled,
  name,
}) => {
  const { isFocused: isOpen, setIsFocused: setIsOpen } = useDetectClickOutside({
    Component: InlineDatePicker,
  })
  const dateUtil = useDateUtil()
  const [startDay, setStartDay] = useState<Date | null>(
    dateUtil(
      `${tzOrUtc(dateUtil(value || new Date())).format(dateFormats.iso8601)}Z`
    ).toDate()
  )

  const handleChange = useCallback(
    (startDate) => {
      setStartDay(startDate)
      onChange(startDate)
      if (setAvailabilityFromStartDate) {
        setAvailabilityFromStartDate(startDate)
      }
    },
    [onChange, setAvailabilityFromStartDate]
  )

  return (
    <div className="relative w-full mt-[24px]">
      <Input
        readOnly
        className="mt-[8px]"
        inputClassName="cursor-pointer"
        trailingIconClassName="cursor-pointer"
        name={name}
        label={title}
        placeholder="Select Date"
        trailingIcon={
          <CalendarIcon
            className="fill-blue-3"
            onClick={() => setIsOpen(true)}
          />
        }
        onClick={() => setIsOpen(true)}
        value={value ? dateUtil(value).format(dateFormats.display0) : ''}
      />
      {isOpen && (
        <div className="absolute left-0 z-20 w-full overflow-hidden bg-white border border-solid top-[73px] pt-[35px] pb-[25px] px-[55px] border-blue-3 rounded-[5px]">
          <SearchDatepicker
            isInline
            dayFrom={startDay}
            dayTo={null}
            onChange={handleChange}
            calendarIntervals={calendarIntervals}
            timeZone={timeZone}
            startDate={null}
            isDisabled={isDisabled}
          />
        </div>
      )}
    </div>
  )
}

export default InlineDatePicker
