import React from 'react'
import cn from 'classnames'

import { useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'

type ReservationInfoRecordProps = {
  name: JSX.Element | string
  label: JSX.Element | string
  nameFontSize?: string
  labelFontSize?: string
  recordClassName?: string
}

export const ReservationInfoRecord: React.FC<ReservationInfoRecordProps> = (
  props
) => {
  const {
    name,
    label,
    nameFontSize = 'xs',
    labelFontSize = 'sm',
    recordClassName,
  } = props

  return (
    <div className={cn('flex justify-between mb-1', recordClassName)}>
      <div className={`text-blue-1 text-s-${nameFontSize}`}>{name}</div>
      <div className={`font-semibold text-s-${labelFontSize}`}>{label}</div>
    </div>
  )
}

const ReservationInfoRecords = (props) => {
  const { containerClassName, ends, starts, ...recordProps } = props

  const dateUtil = useDateUtil()

  const timeStarts = dateUtil(starts).format(dateFormats.timeDisplay0)
  const timeEnds = dateUtil(ends).format(dateFormats.timeDisplay0)

  return (
    <div className={containerClassName}>
      <ReservationInfoRecord
        name="Day of the week"
        label={dateUtil(starts).format(dateFormats.weekday)}
        {...recordProps}
      />
      <ReservationInfoRecord
        name="Booking day"
        label={dateUtil(starts).format(dateFormats.display0)}
        {...recordProps}
      />
      <ReservationInfoRecord
        name="Booking hours"
        label={`${timeStarts}-${timeEnds}`}
        {...recordProps}
      />
    </div>
  )
}

export default ReservationInfoRecords
