import cn from 'classnames'
import React from 'react'

import { TSpotsTabCard } from '@screens/user/Waitlist/WaitList.model'
import CrossIconLarge from '@assets/icons/close-20.svg'

const SpotsTabCard: React.FC<TSpotsTabCard> = ({
  location,
  starts,
  ends,
  isAvailable,
  perHour,
  onDelete,
  isDesktop,
}) => (
  <div
    className={cn('relative', {
      'w-[483px] mx-[4.75px] mb-[15px] bg-white border-blue-3 border rounded-[10px] py-5 px-[25px]':
        isDesktop,
      'rounded-lg mb-4 border border-solid border-blue-3': !isDesktop,
      'border border-solid border-primary bg-[#f0f3ff]': isAvailable,
    })}
  >
    <div className="flex">
      <div className="flex-1 px-4 pb-4 font-semibold pt-[14px]">{location}</div>
      <CrossIconLarge
        className="mt-2 cursor-pointer mr-[10px] fill-blue-1"
        onClick={onDelete}
      />
    </div>
    <div className="flex justify-between px-4 pb-3 border-b text-s-xl border-b-blue-3">
      <div className="text-blue-1">Start - End</div>
      <div className="font-semibold">
        {starts} - {ends}
      </div>
    </div>
    <div className="flex justify-between px-4 pt-3 pb-4 text-s-xl">
      <div className="text-blue-1">Price</div>
      <div className="font-semibold">${perHour}/hr</div>
    </div>
  </div>
)

export default SpotsTabCard
