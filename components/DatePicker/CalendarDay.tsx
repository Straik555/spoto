import cn from 'classnames'
import { Dayjs } from 'dayjs'
import React, { FC } from 'react'

export type CalendarDayProps = {
  day: Dayjs
  className?: string
} & JSX.IntrinsicElements['button']

export const CalendarDay: FC<CalendarDayProps> = ({
  day,
  className,
  ...buttonProps
}) => (
  <button
    type="button"
    className={cn(
      'm-0 font-semibold flex items-center justify-center h-[45px] w-[45px] text-s-lg',
      className
    )}
    {...buttonProps}
  >
    {day.get('date')}
  </button>
)

export const EmptyCalendarDay: FC = () => (
  <div className="m-0 font-semibold text-center py-[12px] h-[45px] w-[45px]" />
)
