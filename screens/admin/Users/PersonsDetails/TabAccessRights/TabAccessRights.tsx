import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import PersonDetailsWrapper from '@screens/admin/Users/components/PersonDetailsWrapper/PersonDetailsWrapper'
import UsersAction from '@screens/admin/Users/components/UsersAction'
import React, { FC } from 'react'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import cn from 'classnames'
import Loader from '@components/Loader/Loader'
import AccessCard from '@screens/admin/Users/components/AccessCard'
import AddUserButton from '@screens/admin/Users/components/AddUserButton/AddUserButton'
import useTabAccessRights from './useTabAccessRights'
import { TabAccessRights } from './TabAccessRights.model'
import { AccessCardVariant } from '@screens/admin/Users/components/AccessCard/AccessCard.model'

const TabAccessRights: FC<TabAccessRights> = ({ onDelete, userId, user }) => {
  const { sharedPlaces, isFetchingSharedPlacesByUser, deleteGroupAccess } =
    useTabAccessRights(userId)
  const { maxWidth1366: smallSize } = useSpotoMediaQuery()
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  return (
    <PersonDetailsWrapper
      addButton={
        <AddUserButton
          label="Add Access"
          onClick={() => {
            router.push({
              pathname: ROUTES.ADMIN_MANAGE_ACCESS,
              query: {
                userId,
              },
            })
          }}
        />
      }
      className={cn({ 'h-full': !isDesktop && isFetchingSharedPlacesByUser })}
      deleteButton={
        <UsersAction
          classNameWrapper={cn({
            '!px-[16px] !py-0 flex-col': !isDesktop,
          })}
          deleteMessage="Delete User"
          onDelete={onDelete}
        />
      }
    >
      <Loader loading={isFetchingSharedPlacesByUser} className="mx-auto">
        {sharedPlaces.length ? (
          <div
            className={cn('w-full flex content-start grid gap-y-[8px]', {
              'grid-cols-3 gap-x-[15px]': isDesktop && !smallSize,
              'grid-cols-2 gap-x-[15px]': isDesktop && smallSize,
              'grid-cols-1 pt-[16px]': !isDesktop,
            })}
          >
            {sharedPlaces.map((sharedPlace) => {
              return (
                <AccessCard
                  key={sharedPlace.id}
                  place={sharedPlace}
                  variant={AccessCardVariant.USER}
                  userOrGroupId={user?.userId}
                  onDelete={(placeId, userOrGroupId) =>
                    userOrGroupId &&
                    deleteGroupAccess({
                      spotId: placeId,
                      userId: userOrGroupId,
                    })
                  }
                />
              )
            })}
          </div>
        ) : (
          <div
            className={cn(
              'flex justify-center item-center h-auto my-auto font-semibold capitalize w-full p-[16px] text-blue-3 text-s-xl',
              { 'mt-[332px]': isDesktop, 'mt-[230px]': !isDesktop }
            )}
          >
            No Access Rights
          </div>
        )}
      </Loader>
    </PersonDetailsWrapper>
  )
}

export default TabAccessRights
