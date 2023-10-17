import React, { FC } from 'react'
import UserCardSpot from '@screens/admin/Users/components/UserCard/UserCardSpot'
import { UserCardSpotsProps } from '@screens/admin/Users/components/UserCard/UserCard.model'
import UserCardSpotSlider from '@screens/admin/Users/components/UserCard/UserCardSpotSlider'
import cn from 'classnames'

const UsersCardSpots: FC<UserCardSpotsProps> = ({ data }) => {
  const hasSlider = data.length > 1
  return (
    <UserCardSpotSlider hasSlider={hasSlider}>
      {data.map((item) => {
        return item.schedule?.map((schedule) => (
          <UserCardSpot
            key={schedule?.scheduleId}
            className={cn({
              'last:pb-[16px] desktop:px-[44px] desktop:last:pb-[25px]':
                hasSlider,
              'pb-[16px]': !hasSlider,
            })}
            schedule={schedule}
            name={item.name}
          />
        ))
      })}
    </UserCardSpotSlider>
  )
}

export default UsersCardSpots
