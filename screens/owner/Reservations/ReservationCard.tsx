import React, { useMemo } from 'react'
import Link from 'next/link'
import cn from 'classnames'

import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { BookingInfo } from '@api/booking/types'
import { ROUTES } from '@constants/routes'

import ReservationInfoRecords from './components/ReservationInfoRecords'

type ReservationCardProps = BookingInfo & { className?: string }

const ReservationCard: React.FC<ReservationCardProps> = (props) => {
  const {
    id,
    starts,
    ends,
    placeName,
    userFirstName,
    userLastName,
    userAvatar,
    className,
  } = props
  const fullName = useMemo(() => {
    return `${userFirstName} ${userLastName}`
  }, [userFirstName, userLastName])

  return (
    <Link
      href={{
        pathname: ROUTES.OWNER_RESERVATIONS_FIND,
        query: { id },
      }}
    >
      <a>
        <div className={cn('mb-1 border rounded-md border-blue-3', className)}>
          <div className="flex justify-between px-5 pt-4 pb-3 border-b border-blue-4">
            <div className="flex items-center">
              <UserAvatar thumbKey={userAvatar} />
              <p className="m-0 ml-4 font-semibold text-black text-s-base">
                {fullName}
              </p>
            </div>
            <div className="flex items-center font-semibold text-primary">
              {placeName}
            </div>
          </div>
          <ReservationInfoRecords
            containerClassName="px-5 py-3"
            starts={starts}
            ends={ends}
          />
        </div>
      </a>
    </Link>
  )
}

export default ReservationCard
