import { useEffect, useState } from 'react'
import { useFormikContext } from 'formik'

import { useDateUtil } from '@hooks/useDateUtil'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import {
  AvailableDayTypes,
  PlaceAvailabilityFormValues,
  UsePlaceAvailability,
} from './PlaceAvailability.model'

const usePlaceAvailability: UsePlaceAvailability = (props) => {
  const { schedule, onChange } = props
  const dateUtil = useDateUtil()
  const { isDesktop } = useDeviceInfo()
  const form = useFormikContext<PlaceAvailabilityFormValues>()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)

  useEffect(() => {
    onChange?.(form)
  }, [form.values, form.errors, onChange])

  useEffect(() => {
    if (schedule) {
      const { dayTime, from, to, weekDays } = schedule
      if (dayTime) {
        form.setFieldValue('timeFrom', dayTime.start)
        form.setFieldValue('timeTo', dayTime.end)
      }
      if (from) {
        form.setFieldValue('startDate', from)
      }
      if (to) {
        form.setFieldValue('endDate', to)
        form.setFieldValue('availableDayType', AvailableDayTypes.RANGE)
      } else {
        form.setFieldValue('availableDayType', AvailableDayTypes.DAY)
      }
      if (weekDays) {
        form.setFieldValue('weekdays', weekDays)
      }
    }
  }, [schedule])

  const state = { dateUtil, form, isDatePickerOpen, isDesktop }
  const actions = { setIsDatePickerOpen }
  return [state, actions]
}

export default usePlaceAvailability
