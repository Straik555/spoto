import UserCardDetails from '@screens/admin/Users/components/UserCard/UserCardDetails'
import React, { FC } from 'react'
import UserCard from '@screens/admin/Users/components/UserCard/UserCard'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { PersonCardGroupsProps } from '@screens/admin/Users/Groups/components/GroupCard/GroupCard.model'
import useGroupCard from '@screens/admin/Users/Groups/components/GroupCard/useGroupCard'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import UserCardItem from '@screens/admin/Users/components/UserCardItem'
import { UserCardDefaultAvatar } from '@screens/admin/Users/components/UserCard/UserCard.model'

const GroupCard: FC<PersonCardGroupsProps> = ({ onDelete, group }) => {
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  const {
    places,
    isFetchingSharedPlacesByGroup,
    onVisibilityChange,
    deleteGroupVisible,
    setDeleteGroupVisible,
  } = useGroupCard(group.id)

  return (
    <>
      <UserCard
        name={group.name}
        thumbKey={group.avatarUrl}
        onDetail={() =>
          router.push({
            pathname: ROUTES.ADMIN_USERS_GROUP,
            query: { groupId: group.id },
          })
        }
        defaultAvatar={UserCardDefaultAvatar.GROUP}
      >
        {isDesktop ? (
          <UserCardItem
            isFetching={!isFetchingSharedPlacesByGroup}
            places={places}
          />
        ) : (
          <UserCardDetails
            onVisibilityChange={(visible) =>
              visible && onVisibilityChange(group.id)
            }
          >
            <UserCardItem
              isFetching={!isFetchingSharedPlacesByGroup}
              places={places}
            />
          </UserCardDetails>
        )}
      </UserCard>
      <DeleteDialog
        open={deleteGroupVisible}
        message="Delete this group?"
        onClose={() => setDeleteGroupVisible(false)}
        onSubmit={onDelete}
      />
    </>
  )
}

export default GroupCard
