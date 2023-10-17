import Select, { Option } from '@components/Select/Select'
import { SelectProps } from '@components/Select/Select.model'
import { dateFormats } from '@constants/global'
import { useDateUtil } from '@hooks/useDateUtil'
import { getTimeOptions } from '@screens/admin/Sets/CreateEditSet/CreateEditSetUtils'
import React from 'react'

export type TimeOptionsSelectProps = {
  intervals?: string[]
  timeZone?: string
} & SelectProps

const TimeOptionsSelect: React.FC<TimeOptionsSelectProps> = ({
  value,
  intervals,
  timeZone,
  optionClassName,
  ...selectProps
}) => {
  const dateUtil = useDateUtil()
  const timeOptions =
    intervals && timeZone
      ? intervals.map((interval) =>
          dateUtil(interval).tz(timeZone).format(dateFormats.timeDisplay0)
        )
      : getTimeOptions()

  return (
    <Select {...selectProps} value={value}>
      {timeOptions.map((timeOptionsTime: string, index: number) => (
        <Option
          className={optionClassName}
          active={timeOptionsTime === value}
          key={index}
          value={timeOptionsTime}
          text={timeOptionsTime}
        />
      ))}
    </Select>
  )
}

export default React.memo(TimeOptionsSelect)
