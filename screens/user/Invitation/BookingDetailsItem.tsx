import React, { FC } from 'react'
import { BookingDetailsItemProps } from './Invitation.model'

export const BookingDetailsItem: FC<BookingDetailsItemProps> = ({
  title,
  subTitle,
}) => {
  return (
    <div className="flex items-center justify-between w-full border-b border-b-solid px-[16px] py-[10px] border-b-blue-3 last:border-0 first:rounded-t-[5px] last:rounded-b-[5px]">
      <span className="text-blue-1">{title}</span>
      <p className="overflow-hidden font-semibold overflow-ellipsis whitespace-nowrap max-w-[70%] text-blue-1">
        {subTitle}
      </p>
    </div>
  )
}
