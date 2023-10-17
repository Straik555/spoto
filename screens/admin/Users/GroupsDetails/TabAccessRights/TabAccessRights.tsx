import PersonDetailsWrapper from '@screens/admin/Users/components/PersonDetailsWrapper/PersonDetailsWrapper'
import UsersAction from '@screens/admin/Users/components/UsersAction'
import React, { FC } from 'react'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'
import cn from 'classnames'
import Loader from '@components/Loader/Loader'
import useTabAccessRights from '@screens/admin/Users/GroupsDetails/TabAccessRights/useTabAccessRights'
import { TabRightAccessProps } from '@screens/admin/Users/GroupsDetails/TabAccessRights/TabAccessRights.model'
import AccessCard from '@screens/admin/Users/components/AccessCard'
import AddUserButton from '@screens/admin/Users/components/AddUserButton/AddUserButton'
import { AccessCardVariant } from '@screens/admin/Users/components/AccessCard/AccessCard.model'
import Title from '@components/Title/Title'

const TabRightAccess: FC<TabRightAccessProps> = ({
  onDelete,
  groupId,
  user,
}) => {
  const { sharedPlaces, isFetchingSharedPlacesByGroup, deleteGroupAccess } =
    useTabAccessRights(Number(groupId))
  const router = useRouter()
  return (
    <PersonDetailsWrapper
      addButton={
        <AddUserButton
          label="Add Access"
          onClick={() => {
            router.push({
              pathname: ROUTES.ADMIN_MANAGE_ACCESS,
              query: {
                groupId,
              },
            })
          }}
        />
      }
      className={cn({
        'h-full': isFetchingSharedPlacesByGroup || !sharedPlaces.length,
      })}
      deleteButton={
        <UsersAction
          classNameWrapper="px-[16px] py-0 flex-col desktop:p-0"
          deleteMessage="Delete Group"
          onDelete={onDelete}
        />
      }
    >
      <Loader loading={isFetchingSharedPlacesByGroup} className="mx-auto">
        {sharedPlaces.length ? (
          <div className="flex content-start w-full grid grid-cols-1 gap-y-[8px] lg-desktop:grid-cols-3 lg-desktop:gap-[15px] desktop:grid-cols-2 desktop:gap-[15px]">
            {sharedPlaces.map((sharedPlace) => {
              return (
                <AccessCard
                  key={sharedPlace.id}
                  place={sharedPlace}
                  userOrGroupId={user?.id}
                  variant={AccessCardVariant.GROUP}
                  onDelete={(placeId, userOrGroupId) =>
                    userOrGroupId &&
                    deleteGroupAccess({
                      groupId: userOrGroupId,
                      spotId: placeId,
                    })
                  }
                />
              )
            })}
          </div>
        ) : (
          <div className="flex justify-center w-full my-auto">
            <Title className="font-semibold text-s-xl text-blue-3">
              no access rights
            </Title>
          </div>
        )}
      </Loader>
    </PersonDetailsWrapper>
  )
}

export default TabRightAccess
