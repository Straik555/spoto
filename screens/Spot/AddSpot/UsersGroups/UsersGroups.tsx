import { sharedPlacesApi } from '@api/sharedPlaces'
import Button from '@components/Button/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { Loader } from '@components/Loader'
import UserCardDetails from '@screens/admin/Users/components/UserCard/UserCardDetails'
import UsersCardSpots from '@screens/admin/Users/components/UserCard/UsersCardSpots'
import {
  mapPlaceGroupToUserCardProps,
  mapPlaceUserToUserCardProps,
} from '@screens/admin/Users/components/UserCard/utils'
import React, { useState } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import cn from 'classnames'
import GroupSpotsIcon from '@assets/icons/group-spot.svg'
import DefaultUserIcon from '@assets/icons/default-user.svg'
import ThreeDotMenuIcon from '@assets/icons/three-dot-menu.svg'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'
import Dropdown, {
  DropdownButton,
  DropdownItems,
  DropdownItem,
} from '@components/Dropdown/Dropdown'
import s from './UsersGroups.module.css'
import CloseIcon from '@assets/icons/close-14.svg'

const UsersGroups: React.FC<{ spotId: string }> = ({ spotId }) => {
  const { isDesktop } = useDeviceInfo()
  const { maxWidth1366 } = useSpotoMediaQuery()

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [dataToDelete, setDataToDelete] = useState<{
    type: string
    id: number | string
  }>({
    type: '',
    id: -1,
  })
  const { data: users, isLoading: isLoadingUsers } =
    sharedPlacesApi.endpoints.getUsersByPlace.useQuery({
      placeId: Number(spotId),
    })
  const { data: userGroups, isLoading: isLoadingUserGroups } =
    sharedPlacesApi.endpoints.getGroupsByPlace.useQuery({
      placeId: Number(spotId),
    })

  const [deleteUserSpotAccess] =
    sharedPlacesApi.endpoints.deleteUserFromPlace.useMutation()
  const [deleteGroupSpotAccess] =
    sharedPlacesApi.endpoints.deleteGroupFromPlace.useMutation()

  const displayNoUsers = () => (
    <div
      className={cn(
        'flex justify-center items-center w-full text-lg font-medium text-blue-2 grow'
      )}
    >
      Add Access
    </div>
  )

  const addAccessButton = () => {
    if (isDesktop) {
      return (
        <div
          className={cn('flex justify-end w-full pb-[25px]', {
            '!p-[10px_16px] !justify-center': !isDesktop,
          })}
        >
          <Button
            className={cn('!text-s-lg', {
              '!h-[50px] !pr-[20px] !pl-[20px]': isDesktop,
              '!w-full !h-[44px]': !isDesktop,
            })}
            // onClick={() => setInviteUserDialogOpen(true)}
            mode={ButtonMode.SMALL}
            icon={ButtonIcon.ADD_WHITE}
          >
            Add Access
          </Button>
        </div>
      )
    }
    if (!isDesktop) {
      return (
        <div
          className={cn(
            s.dashedBorder,
            'rounded-[5px] flex justify-center items-center m-[16px]'
          )}
        >
          <Button
            className="font-semibold !text-s-lg !w-full !h-[57px] text-primary"
            // onClick={() => setInviteUserDialogOpen(true)}
            mode={ButtonMode.BASE}
            icon={ButtonIcon.ADD}
          >
            Add Access
          </Button>
        </div>
      )
    }
  }

  const renderAvatar = (item) => {
    if (item.userId && !isDesktop)
      return <DefaultUserIcon className="w-[150px] h-[150px]" />
    if (item.userId && isDesktop && maxWidth1366)
      return <DefaultUserIcon className="w-[68px] h-[68px]" />
    if (item.userId && isDesktop && !maxWidth1366)
      return <DefaultUserIcon className="w-[75px] h-[75px]" />
    if (!item.userId && !isDesktop)
      return <GroupSpotsIcon className="w-[50px] h-[50px]" />
    if (!item.userId && isDesktop && maxWidth1366)
      return <GroupSpotsIcon className="w-[68px] h-[68px]" />
    if (!item.userId && isDesktop && !maxWidth1366)
      return <GroupSpotsIcon className="w-[75px] h-[75px]" />
  }

  const renderCard = (item, name) => {
    return (
      <div
        className={cn(
          'border border-blue-3 bg-white rounded-md grid grid-cols-1',
          {
            'box-border bg-white rounded-[5px] border-1 border-solid border-blue-4 rounded-[5px]':
              isDesktop && !maxWidth1366,
            '': isDesktop && maxWidth1366,
            'cursor-pointer !mb-[5px]': !isDesktop,
          }
        )}
      >
        <div
          className={cn(
            'flex relative w-full flex items-center p-[16px] border-b-[1px] border-solid border-blue-4',
            {
              'p-[25px]': isDesktop && !maxWidth1366,
              'p-[20px] pb-[25px]': isDesktop && maxWidth1366,
            }
          )}
        >
          <UserAvatar
            thumbKey={item.avatarUrl}
            thumbSrc={item.avatarUrl}
            defaultAvatar={renderAvatar(item)}
          />
          <p
            className={cn(
              'm-0 font-semibold text-black font-s-base ml-[15px] overflow-ellipsis overflow-hidden whitespace-nowrap',
              {
                '!text-s-lg !ml-[25px]': maxWidth1366 && isDesktop,
                '!ml-[25px] !text-s-xl': !maxWidth1366 && isDesktop,
              }
            )}
          >
            {name}
          </p>
          {isDesktop && (
            <div className="absolute flex -mt-[16px] -mr-[16px] justify-self-end !top-[15px] !right-[15px]">
              <Dropdown
                action={
                  <DropdownButton className="p-4">
                    <ThreeDotMenuIcon className="fill-blue-1" />
                  </DropdownButton>
                }
              >
                <DropdownItems className="mt-0 border top-3 right-3 border-blue-4 rounded-[5px] shadow-5">
                  <DropdownItem onClick={() => null} className="font-semibold">
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setOpenDeleteModal(true)
                      if (item.userId)
                        setDataToDelete({ type: 'user', id: item.userId })
                      if (item.groupId)
                        setDataToDelete({
                          type: 'userGroup',
                          id: item.groupId,
                        })
                    }}
                    className="font-semibold"
                  >
                    Delete
                  </DropdownItem>
                </DropdownItems>
              </Dropdown>
            </div>
          )}
          {!isDesktop && (
            <CloseIcon
              className={cn('absolute fill-blue-2 -top-[-10px] -right-[-10px]')}
              onClick={() => {
                setOpenDeleteModal(true)
                if (item.userId)
                  setDataToDelete({ type: 'user', id: item.userId })
                if (item.groupId)
                  setDataToDelete({
                    type: 'userGroup',
                    id: item.groupId,
                  })
              }}
            />
          )}
        </div>

        {isDesktop && (
          <UsersCardSpots
            data={[
              item.userId
                ? mapPlaceUserToUserCardProps(item)
                : mapPlaceGroupToUserCardProps(item),
            ]}
          />
        )}
        {!isDesktop && (
          <UserCardDetails>
            <UsersCardSpots
              data={[
                item.userId
                  ? mapPlaceUserToUserCardProps(item)
                  : mapPlaceGroupToUserCardProps(item),
              ]}
            />
          </UserCardDetails>
        )}
      </div>
    )
  }

  return (
    <>
      {addAccessButton()}
      <Loader loading={isLoadingUsers || isLoadingUserGroups} className="grow">
        {(!!users?.length || !!userGroups?.length) && (
          <div
            className={cn('flex flex-col', {
              'px-[16px] pb-[16px] overflow-y-auto': !isDesktop,
              'flex-wrap grid grid-cols-2 gap-[15px]':
                isDesktop && maxWidth1366,
              'flex-wrap grid grid-cols-3 gap-[15px]':
                isDesktop && !maxWidth1366,
            })}
          >
            {users &&
              users[0] &&
              users.map((user) => {
                return renderCard(user, `${user.firstName} ${user.lastName}`)
              })}
            {userGroups &&
              userGroups[0] &&
              userGroups.map((userGroup) => {
                return renderCard(userGroup, userGroup.groupName)
              })}
          </div>
        )}
        {!(users?.length || userGroups?.length) && displayNoUsers()}
      </Loader>
      <DeleteDialog
        open={openDeleteModal}
        message="Delete access right?"
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => {
          if (dataToDelete.type === 'user') {
            deleteUserSpotAccess({
              spotId: +spotId,
              userId: `${dataToDelete.id}`,
            })
          }
          if (dataToDelete.type === 'userGroup') {
            deleteGroupSpotAccess({
              spotId: +spotId,
              groupId: +dataToDelete.id,
            })
          }
          setDataToDelete({
            type: '',
            id: -1,
          })
          setOpenDeleteModal(false)
        }}
      />
    </>
  )
}

export default React.memo(UsersGroups)
