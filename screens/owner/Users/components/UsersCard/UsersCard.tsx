import DeleteDialog from '@components/Dialog/DeleteDialog'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import UsersCardSpots from '@screens/admin/Users/components/UserCard/UsersCardSpots'
import { mapUserPlaceToUserCardProps } from '@screens/admin/Users/components/UserCard/utils'
import UserCardDetails from '@screens/admin/Users/components/UserCard/UserCardDetails'
import { UsersCardProps } from '@screens/owner/Users/components/UsersCard/UsersCard.model'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import UserCard from '@screens/admin/Users/components/UserCard/UserCard'
import { InvitationStatus } from '@api/invite/types'
import { UserCardDefaultAvatar } from '@screens/admin/Users/components/UserCard/UserCard.model'
import Title from '@components/Title/Title'

const UsersCard: FC<UsersCardProps> = ({ user, onDelete }) => {
  const router = useRouter()
  const [deleteUserVisible, setDeleteUserVisible] = useState<boolean>(false)

  return (
    <>
      <UserCard
        name={
          user.status !== InvitationStatus.Sent
            ? getPersonFullName(user)
            : user.email
        }
        onDelete={() => setDeleteUserVisible(true)}
        thumbKey={user.avatarUrl}
        onDetail={
          user.status !== InvitationStatus.Sent
            ? () =>
                router.push({
                  pathname: ROUTES.OWNER_USERS_DETAILS,
                  query: { id: user.id },
                })
            : undefined
        }
        defaultAvatar={UserCardDefaultAvatar.USER}
      >
        <UserCardDetails>
          {user?.places.length ? (
            <UsersCardSpots
              data={user?.places?.map(mapUserPlaceToUserCardProps)}
            />
          ) : (
            <div className="w-full h-full p-[16px] h-[243px] desktop:p-[25px] desktop:h-[271px]">
              <div className="flex items-center justify-center w-full h-full border-solid border-[1px] border-blue-3 bg-blue-4 rounded-[5px]">
                <Title className="m-0 font-semibold text-center text-s-base text-blue-1">
                  no access rights
                </Title>
              </div>
            </div>
          )}
        </UserCardDetails>
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

export default UsersCard
