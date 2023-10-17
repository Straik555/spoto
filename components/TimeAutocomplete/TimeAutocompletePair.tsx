import React, { FC } from 'react'
import cn from 'classnames'
import { FormikValues, useFormikContext } from 'formik'
import { TimeAutocompletePairProps } from '@components/TimeAutocomplete/TimeAutocomplete.module'
import { TimeAutocomplete } from '@components/TimeAutocomplete'
import { initializeDateUtil } from '@hooks/useDateUtil'

initializeDateUtil()

const TimeAutocompletePair: FC<TimeAutocompletePairProps> = ({
  timeZone,
  intervals,
  label1,
  label2,
  name1,
  name2,
  classNameWrapper,
  classNameLabel,
}) => {
  const { values } = useFormikContext<FormikValues>()
  return (
    <div className={cn('flex justify-between w-full', classNameWrapper)}>
      <div className="w-1/2 pr-[7.5px]">
        <small className={cn('text-xs text-blue-1', classNameLabel)}>
          {label1}
        </small>
        <TimeAutocomplete
          name={name1}
          intervals={intervals}
          timeZone={timeZone}
          endTime={values[name2]}
        />
      </div>
      <div className="w-1/2 pl-[7.5px]">
        <small className={cn('text-xs text-blue-1', classNameLabel)}>
          {label2}
        </small>
        <TimeAutocomplete
          name={name2}
          intervals={intervals}
          timeZone={timeZone}
          startTime={values[name1]}
        />
      </div>
    </div>
  )
}

export default TimeAutocompletePair
