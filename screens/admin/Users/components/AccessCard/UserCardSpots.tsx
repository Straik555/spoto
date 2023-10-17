import React, { FC } from 'react'
import UserCardSpot from '@screens/admin/Users/components/UserCard/UserCardSpot'
import cn from 'classnames'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import { AccessCardItem } from '@screens/admin/Users/components/AccessCard/AccessCard.model'

const UserCardSpots: FC<AccessCardItem> = ({ schedule, handleEdit }) => {
  const hasSlider = schedule?.length > 1
  return (
    <>
      {schedule.map((item) => (
        <UserCardSpot
          key={item.scheduleId}
          schedule={item}
          className={cn({
            'last:!pb-[16px] desktop:!pb-0 desktop:last:!pb-[25px]': hasSlider,
            'pb-[16px]': !hasSlider,
          })}
          action={
            <div className="w-full text-center pb-[10px]">
              <Button
                className="h-[36px] w-[185px] desktop:w-[164px]"
                onClick={handleEdit}
                mode={ButtonMode.FULL_PRIMARY}
              >
                Edit
              </Button>
            </div>
          }
        />
      ))}
    </>
  )
}

export default UserCardSpots
