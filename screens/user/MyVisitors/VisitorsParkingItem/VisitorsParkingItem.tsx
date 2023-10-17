import React, { FC } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import { VisitorsParkingItemProps } from '@screens/user/MyVisitors/VisitorsParkingItem/VisitorsParkingItem.model'
import { useDateUtil } from '@hooks/useDateUtil'
import { dateFormats } from '@constants/global'
import { STATUS_FIELDS } from '@screens/user/MyVisitors/constants'

const VisitorsParkingItem: FC<VisitorsParkingItemProps> = ({
  guestId,
  from,
  to,
  status,
  timeZone,
  appartmentId,
}) => {
  const dateUtil = useDateUtil()
  const router = useRouter()

  return (
    <div
      className="relative flex flex-col border border-solid p-[16px] mb-[8px] border-blue-3 w-full h-[120px] rounded-[5px]"
      onClick={() =>
        router.push({
          pathname: ROUTES.MY_VISITORS_DETAILS,
          query: { appartmentId, visitorsParkingId: guestId },
        })
      }
    >
      <span className="text-blue-1 text-s-base">Status</span>
      <p
        className={cn('mb-[7px] font-normal text-s-base -mt-[4px] capitalize', {
          'text-orange-text': status === STATUS_FIELDS.PENDING,
          'text-green': status === STATUS_FIELDS.ACTIVE,
          'text-red': status === STATUS_FIELDS.DECLINE,
          'text-orange': status === STATUS_FIELDS.CANCELLED,
        })}
      >
        {status === STATUS_FIELDS.DECLINE
          ? 'Declined by visitor'
          : status === STATUS_FIELDS.ACTIVE
          ? 'Active'
          : status}
      </p>
      <div className="flex justify-start items-center">
        <div className="flex flex-col text-s-base justify-start mr-[30px]">
          <span className="text-blue-1 capitalize">Booking period</span>
          <p className="font-normal -mt-[4px]">
            {dateUtil(from).tz(timeZone).format(dateFormats.timeDisplay0)} -{' '}
            {dateUtil(to).tz(timeZone).format(dateFormats.timeDisplay0)}
          </p>
        </div>
        <div className="flex flex-col text-s-base justify-start">
          <span className="text-blue-1">Date</span>
          <p className="font-normal -mt-[4px]">
            {dateUtil(from)
              .tz(timeZone)
              .isSame(dateUtil(to).tz(timeZone), 'day')
              ? dateUtil(from).tz(timeZone).format(dateFormats.display0)
              : `${dateUtil(from)
                  .tz(timeZone)
                  .format(dateFormats.display5)} - ${dateUtil(to)
                  .tz(timeZone)
                  .format(dateFormats.display0)}`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VisitorsParkingItem
