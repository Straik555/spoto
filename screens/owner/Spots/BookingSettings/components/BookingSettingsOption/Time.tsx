import WorkingHours from '@screens/admin/Sets/CreateEditSet/WorkingHours/WorkingHours'
import { BookingSettingsOptionSingleFormValues } from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsOption.model'
import { useFormikContext } from 'formik'
import React, { FC } from 'react'

const Time: FC<{ className?: string }> = ({ className }) => {
  const form = useFormikContext<BookingSettingsOptionSingleFormValues>()

  return (
    <WorkingHours
      title={'Available Booking Hours'}
      timeFrom={form.values.timeFrom}
      setTimeFrom={(value) => {
        form.setValues({
          ...form.values,
          timeFrom: value,
        })
      }}
      timeTo={form.values.timeTo}
      setTimeTo={(value) => {
        form.setValues({
          ...form.values,
          timeTo: value,
        })
      }}
      className="relative z-[0]"
      optionClassName="!mt-0"
    />
  )
}

export default Time
