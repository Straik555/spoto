import { PlaceType } from '@api/types'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { ROUTES } from '@constants/routes'
import UserCard from '@screens/admin/Users/components/UserCard/UserCard'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import UserCardDetails from '@screens/admin/Users/components/UserCard/UserCardDetails'
import {
  AccessCardProps,
  AccessCardVariant,
} from '@screens/admin/Users/components/AccessCard/AccessCard.model'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import UserCardSpots from '@screens/admin/Users/components/AccessCard/UserCardSpots'

const AccessCard: FC<AccessCardProps> = ({
  userOrGroupId,
  place,
  onDelete,
  variant,
}) => {
  const { isDesktop } = useDeviceInfo()
  const router = useRouter()
  const [deletePlaceOpen, setDeletePlaceOpen] = useState(false)

  const handleEdit = () => {
    const query = {} as {
      spotId?: number
      setId?: number
      userId?: string | number
      groupId?: number | string
    }
    if (place.placeInfo.placeType === PlaceType.SPOT) {
      query.spotId = place.placeInfo.placeId
    }
    if (place.placeInfo.placeType === PlaceType.SET) {
      query.setId = place.placeInfo.placeId
    }
    if (variant === AccessCardVariant.USER) {
      query.userId = userOrGroupId
    }
    if (variant === AccessCardVariant.GROUP) {
      query.groupId = userOrGroupId
    }

    router.push({
      pathname: ROUTES.ADMIN_MANAGE_ACCESS,
      query,
    })
  }

  return (
    <>
      <UserCard
        name={place.placeInfo.placeName}
        onDelete={() => setDeletePlaceOpen(true)}
        onEdit={handleEdit}
        onDetail={() => {
          if (place.placeInfo.placeType === PlaceType.SPOT) {
            router.push({
              pathname: ROUTES.ADMIN_SPOTS,
              query: {
                spotId: place.id,
              },
            })
          } else {
            router.push({
              pathname: ROUTES.ADMIN_SET_DETAILS,
              query: {
                setId: place.id,
              },
            })
          }
        }}
        withoutImg
      >
        {isDesktop ? (
          <UserCardSpots schedule={place.schedule} handleEdit={handleEdit} />
        ) : (
          <UserCardDetails onVisibilityChange={(visible) => visible} isAccess>
            <UserCardSpots schedule={place.schedule} handleEdit={handleEdit} />
          </UserCardDetails>
        )}
      </UserCard>
      <DeleteDialog
        open={deletePlaceOpen}
        message="Delete this access?"
        onClose={() => setDeletePlaceOpen(false)}
        onSubmit={() => {
          onDelete(place.placeInfo.placeId, userOrGroupId)
          setDeletePlaceOpen(false)
        }}
      />
    </>
  )
}

export default AccessCard
