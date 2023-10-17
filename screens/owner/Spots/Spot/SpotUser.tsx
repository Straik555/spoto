import { sharedPlacesApi } from '@api/sharedPlaces'
import { PlaceUser } from '@api/sharedPlaces/types'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { ROUTES } from '@constants/routes'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import BookingSettingsScheduleCard from '@screens/owner/Spots/BookingSettings/components/BookingSettingsOption/BookingSettingsScheduleCard'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const SpotUser: FC<{
  placeUser: PlaceUser
  className?: string
  spotId: number
}> = ({ placeUser, className, spotId }) => {
  const router = useRouter()
  const { data: existingAccessInfo } =
    sharedPlacesApi.endpoints.getUserByPlace.useQuery({
      spotId: spotId,
      userId: placeUser.userId,
    })

  return (
    <div className={classNames('block mb-3', className)}>
      <div className="flex items-center mb-5">
        <UserAvatar className="w-[50px] h-[50px]" />

        <p className="mb-0 font-semibold font-s-base ml-[15px]">
          {getPersonFullName(placeUser)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="mb-0 font-semibold font-s-base">Shared Spots</p>

        <Button
          mode={ButtonMode.SMALL}
          icon={ButtonIcon.EDIT_WHITE}
          onClick={() =>
            router.push({
              pathname: ROUTES.OWNER_SPOTS_SETTINGS,
              query: {
                id: spotId,
                userId: placeUser.userId,
              },
            })
          }
        >
          Edit Booking Settings
        </Button>
      </div>
      <div className="block mt-2 -mx-1">
        {existingAccessInfo?.schedule.map((schedule, i) => {
          return (
            <BookingSettingsScheduleCard
              key={i}
              schedule={schedule}
              className="m-1"
              hideDeleteAction
            />
          )
        })}
      </div>
    </div>
  )
}

export default SpotUser
