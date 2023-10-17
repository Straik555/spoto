import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { ROUTES } from '@constants/routes'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { useDateUtil } from '@hooks/useDateUtil'

import InviteBookingSchedule from './InviteBookingSchedule'
import { InviteBookingPlaceProps } from './InviteBookingDetails.model'

const InviteBookingPlace: React.FC<InviteBookingPlaceProps> = ({
  placeInfo,
  schedule,
}) => {
  const { placeId, placeName } = placeInfo
  const { isDesktop } = useDeviceInfo()
  const dateUtil = useDateUtil()

  const currentMoment = dateUtil(new Date())
  const latestSchedule = dateUtil(schedule[schedule.length - 1].to)
  const bookingDisabled = latestSchedule.isBefore(currentMoment)

  return (
    <div>
      <div className="flex items-center justify-between mx-4 mt-6 mb-2">
        <div className="pr-4 font-semibold truncate text-s-base">
          {placeName}
        </div>
        <Link href={{ pathname: ROUTES.FIND_SPOT, query: { id: placeId } }}>
          <a>
            <Button
              disabled={bookingDisabled}
              className={cn({
                'text-s-lg w-[130px]': isDesktop,
                '!text-s-base !py-[7px] !px-[25px]': !isDesktop,
              })}
              mode={ButtonMode.SMALL}
            >
              Book
            </Button>
          </a>
        </Link>
      </div>
      <div>
        {schedule.map((item) => (
          <InviteBookingSchedule key={item.scheduleId} {...item} />
        ))}
      </div>
    </div>
  )
}

export default InviteBookingPlace
