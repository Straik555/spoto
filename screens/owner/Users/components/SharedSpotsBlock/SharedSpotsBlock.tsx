import React, { useMemo, useState } from 'react'
import ArrowDownIcon from '@assets/icons/arrows/arrow-down-small.svg'
import ArrowUpIcon from '@assets/icons/arrows/arrow-up-small.svg'
import ElectricChargerIcon from '@assets/icons/circle-icons/charging-green-circle-18.svg'
import { BookingInfo } from '@screens/owner/Users/components/BookingInfo'
import { UserInvitationPlace } from '@api/user/types'
import Title from '@components/Title/Title'

const SharedSpotsBlock: React.FC<UserInvitationPlace> = ({
  placeInfo: { electricCharger, placeName },
  schedule,
}) => {
  const [showInfo, setShowInfo] = useState(false)

  const hasElectricCharger = useMemo(() => {
    return Object.values(electricCharger || {}).some(Boolean)
  }, [electricCharger])

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Title
            as="h3"
            noCap
            className="mr-4 font-semibold leading-normal text-black text-s-lg"
          >
            {placeName}
          </Title>
          {hasElectricCharger && <ElectricChargerIcon />}
        </div>
        <div
          className="flex items-center h-10 text-sm font-semibold cursor-pointer text-primary"
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? (
            <>
              <span className="mr-2">Less info</span>
              <ArrowUpIcon className="cursor-pointer stroke-primary" />
            </>
          ) : (
            <>
              <span className="mr-2">More info</span>
              <ArrowDownIcon className="cursor-pointer stroke-primary" />
            </>
          )}
        </div>
      </div>
      {showInfo && (
        <div className="p-4 border border-blue-2 rounded-[5px]">
          <p className="text-s-sm leading-[18px] text-blue-1">
            Booking Options
          </p>

          {schedule?.map((option) => (
            <BookingInfo key={Object.values(option).join('-')} {...option} />
          ))}
        </div>
      )}
    </>
  )
}

export default SharedSpotsBlock
