import UsersCardSpots from '@screens/admin/Users/components/UserCard/UsersCardSpots'
import { mapUserPlaceToUserCardProps } from '@screens/admin/Users/components/UserCard/utils'
import React, { FC } from 'react'
import Title from '@components/Title/Title'
import { UserCardItemPlace } from '@screens/admin/Users/components/UserCardItem/UserCardItem.model'

const UserCardItem: FC<{
  places: UserCardItemPlace[] | []
  isFetching: boolean
}> = ({ places, isFetching }) => {
  return !!places.length && isFetching ? (
    <UsersCardSpots data={places.map(mapUserPlaceToUserCardProps)} />
  ) : (
    <div className="w-full h-[240px] p-[16px] lg-desktop:h-[265px] desktop:p-[25px] desktop:h-[263px]">
      <div className="flex items-center justify-center w-full h-full border-solid border-[1px] border-blue-3 bg-blue-4 rounded-[5px]">
        <Title className="m-0 font-semibold text-center text-s-base text-blue-1">
          no access rights
        </Title>
      </div>
    </div>
  )
}

export default UserCardItem
