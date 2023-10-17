import {
  UserCardDefaultAvatar,
  UserCardProps,
} from '@screens/admin/Users/components/UserCard/UserCard.model'
import cn from 'classnames'
import React, { FC } from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { UserCardSpotAction } from '@screens/admin/Users/components/UserCard/UserCardSpot'
import CloseIcon from '@assets/icons/close-14.svg'
import GroupSpotsIcon from '@assets/icons/group-spot.svg'
import DefaultUserIcon from '@assets/icons/default-user.svg'

const UserCard: FC<UserCardProps> = ({
  name,
  thumbSrc,
  thumbKey,
  children,
  onDetail,
  onMouseEnter,
  classNameHeader,
  defaultAvatar,
  withoutImg,
  onEdit,
  onDelete,
}) => {
  const { isDesktop } = useDeviceInfo()
  const getDefaultAvatar = (avatar: UserCardDefaultAvatar) => {
    switch (avatar) {
      case UserCardDefaultAvatar.USER:
        return (
          <DefaultUserIcon className="w-[50px] h-[50px] desktop:w-[75px] desktop:h-[75px]" />
        )
      case UserCardDefaultAvatar.PERSON:
        return (
          <DefaultUserIcon className="w-[50px] h-[50px] desktop:w-[68px] desktop:h-[68px] lg-desktop:w-[75px] lg-desktop: h-[75px]" />
        )
      case UserCardDefaultAvatar.GROUP:
        return (
          <GroupSpotsIcon className="w-[50px] h-[50px] desktop:w-[68px] desktop:h-[68px] lg-desktop:w-[75px] lg-desktop:h-[75px]" />
        )
      case UserCardDefaultAvatar.PERSON_DETAILS:
        return (
          <GroupSpotsIcon className="w-[35px] h-[35px] desktop:w-[50px] desktop:h-[50px]" />
        )
      default:
        return undefined
    }
  }

  return (
    <div
      className="border border-blue-3 rounded-[5px] bg-white rounded-md cursor-pointer desktop:cursor-auto"
      onClick={() => !isDesktop && onDetail?.()}
      onMouseEnter={() => onMouseEnter?.()}
    >
      <div className="relative flex items-center">
        {isDesktop ? (
          <UserCardSpotAction
            onDelete={onDelete}
            onEdit={onEdit}
            onDetails={onDetail}
          />
        ) : (
          <CloseIcon
            role="button"
            aria-label="delete person"
            className="absolute cursor-pointer top-[10px] right-[10px] fill-blue-2"
            onClick={(e) => {
              e.stopPropagation()
              if (onDelete) {
                onDelete()
              }
            }}
          />
        )}
        <div
          className={cn(
            'flex w-full items-center p-[16px] desktop:p-[25px]',
            {
              'border-b-[2px] border-solid border-blue-4': children,
            },
            classNameHeader
          )}
        >
          {!withoutImg && (
            <UserAvatar
              thumbKey={thumbKey}
              thumbSrc={thumbSrc}
              defaultAvatar={defaultAvatar && getDefaultAvatar(defaultAvatar)}
            />
          )}
          <p
            className={cn(
              'm-0 font-semibold text-black font-s-base ml-[15px] overflow-ellipsis overflow-hidden whitespace-nowrap lg-desktop:text-s-xl lg-desktop:ml-[25px] desktop:ml-[20px] desktop:text-s-lg',
              { '!ml-0': withoutImg }
            )}
          >
            {name}
          </p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default UserCard
