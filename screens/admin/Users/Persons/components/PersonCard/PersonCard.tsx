import UserCardDetails from '@screens/admin/Users/components/UserCard/UserCardDetails'
import React, { FC } from 'react'
import UserCard from '@screens/admin/Users/components/UserCard/UserCard'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import usePersonCard from '@screens/admin/Users/Persons/components/PersonCard/usePersonCard'
import { PersonCardProps } from '@screens/admin/Users/Persons/components/PersonCard/PersonCard.model'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import UserCardItem from '@screens/admin/Users/components/UserCardItem'
import { UserCardDefaultAvatar } from '@screens/admin/Users/components/UserCard/UserCard.model'

const PersonCard: FC<PersonCardProps> = ({ user, onDelete }) => {
  const { isDesktop } = useDeviceInfo()
  const router = useRouter()
  const {
    places,
    isFetchingSharedPlacesByUser,
    onVisibilityChange,
    deleteUserVisible,
    setDeleteUserVisible,
  } = usePersonCard(user.id)

  return (
    <>
      <UserCard
        name={user.name}
        thumbKey={user.avatarUrl}
        onDelete={() => setDeleteUserVisible(true)}
        onDetail={() =>
          router.push({
            pathname: ROUTES.ADMIN_USERS_PERSON,
            query: { userId: String(user.id) },
          })
        }
        defaultAvatar={UserCardDefaultAvatar.PERSON}
      >
        {isDesktop ? (
          <UserCardItem
            isFetching={!isFetchingSharedPlacesByUser}
            places={places}
          />
        ) : (
          <UserCardDetails
            onVisibilityChange={(visible) =>
              visible && onVisibilityChange(user.id)
            }
          >
            <UserCardItem
              isFetching={!isFetchingSharedPlacesByUser}
              places={places}
            />
          </UserCardDetails>
        )}
      </UserCard>
      <DeleteDialog
        open={deleteUserVisible}
        message="Delete this user?"
        onClose={() => setDeleteUserVisible(false)}
        onSubmit={onDelete}
      />
    </>
  )
}

export default PersonCard
