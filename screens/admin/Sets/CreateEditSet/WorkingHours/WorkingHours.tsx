import Title from '@components/Title/Title'
import React from 'react'
import TimeOptionsSelect from '@screens/admin/Sets/CreateEditSet/WorkingHours/TimeOptionsSelect'
import cn from 'classnames'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

export interface WorkingHoursProps {
  timeFrom: string | null
  setTimeFrom: (val: string) => void
  timeTo: string | null
  setTimeTo: (val: string) => void
  title: string
  containerClassName?: string
  titleClassName?: string
  selectClassName?: string
  optionClassName?: string
  buttonClassName?: string
  intervals?: string[]
  endIntervals?: string[]
  timeZone?: string
  className?: string
  placeholderClassName?: string
}

const WorkingHours: React.FC<WorkingHoursProps> = ({
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  title,
  titleClassName,
  intervals,
  endIntervals,
  timeZone,
  children,
  className,
  placeholderClassName,
  selectClassName,
  optionClassName,
  buttonClassName,
  containerClassName,
}) => {
  return (
    <section className={cn('mt-[16px] desktop:mt-25px', className)}>
      {title && (
        <Title
          as="span"
          className={cn(
            'block text-s-base text-blue-1 mb-[5px]',
            titleClassName
          )}
        >
          {title}
        </Title>
      )}
      {children}
      <section className={cn('grid grid-cols-2 gap-[7px]', containerClassName)}>
        <TimeOptionsSelect
          value={timeFrom}
          placeholder="00:00"
          title="Start"
          onSelect={setTimeFrom}
          className={cn('w-full', optionClassName)}
          titleClassName={cn(selectClassName)}
          label={timeFrom}
          intervals={intervals}
          timeZone={timeZone}
          placeholderClassName={placeholderClassName}
          buttonClassName={buttonClassName}
        />
        <TimeOptionsSelect
          value={timeTo}
          placeholder="00:00"
          title="End"
          onSelect={setTimeTo}
          className={cn('w-full', optionClassName)}
          titleClassName={selectClassName}
          label={timeTo}
          intervals={endIntervals || intervals}
          timeZone={timeZone}
          placeholderClassName={placeholderClassName}
          buttonClassName={buttonClassName}
        />
      </section>
    </section>
  )
}

export default React.memo(WorkingHours)
