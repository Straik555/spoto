import PersonDetailsWrapper from '@screens/admin/Users/components/PersonDetailsWrapper/PersonDetailsWrapper'
import AddUserButton from '@screens/admin/Users/components/AddUserButton/AddUserButton'
import React, { FC } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import UsersAction from '@screens/admin/Users/components/UsersAction'
import PersonDetailsCard from '@screens/admin/Users/components/PersonDetailsCard'
import { Loader } from '@components/Loader'
import AddDialogGroupUser from '@screens/admin/Users/components/AddDialogGroupUser'
import { ROUTES } from '@constants/routes'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { TabGroupsProps } from '@screens/admin/Users/PersonsDetails/TabGroups/TabGroups.model'
import useTabGroups from '@screens/admin/Users/PersonsDetails/TabGroups/useTabGroups'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'

const TabGroups: FC<TabGroupsProps> = ({ onDelete, userId, onTab }) => {
  const router = useRouter()
  const { maxWidth1366: smallSize } = useSpotoMediaQuery()
  const { isDesktop } = useDeviceInfo()
  const {
    deleteGroupVisible,
    setDeleteGroupVisible,
    deleteUserGroups,
    users,
    isFetchingUserGroups,
    userList,
    createGroup,
    isFetchingGroups,
    isAddDialogOpen,
    setAddDialogOpen,
    changeDeleteUser,
    setChangeDeleteUser,
  } = useTabGroups(String(userId))
  return (
    <PersonDetailsWrapper
      addButton={
        <AddUserButton
          label="Add Group"
          onClick={() => setAddDialogOpen(true)}
        />
      }
      className={cn({ 'h-full': !isDesktop && isFetchingGroups })}
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
      <Loader loading={isFetchingGroups} className="mx-auto">
        {users?.length ? (
          <div
            className={cn('w-full flex content-start grid w-full gap-y-[8px]', {
              'grid-cols-4 gap-x-[15px]': isDesktop && !smallSize,
              'grid-cols-3 gap-x-[15px]': isDesktop && smallSize,
              'grid-cols-1 pt-[16px]': !isDesktop,
            })}
          >
            {users?.map((group) => {
              return (
                <PersonDetailsCard
                  setGroupId={(id) => setChangeDeleteUser(id)}
                  setDeleteGroupVisible={setDeleteGroupVisible}
                  key={group.id}
                  group={group}
                  onTab={onTab}
                  onDetail={(id) =>
                    router.push({
                      pathname: ROUTES.ADMIN_USERS_GROUP,
                      query: {
                        groupId: id,
                      },
                    })
                  }
                />
              )
            })}
          </div>
        ) : (
          <div
            className={cn('flex justify-center w-full', {
              '!mt-[349px]': isDesktop,
              '!mt-[247px]': !isDesktop,
            })}
          >
            <p className="font-semibold capitalize text-s-xl text-blue-3">
              no users
            </p>
          </div>
        )}
      </Loader>
      <AddDialogGroupUser
        onClose={() => setAddDialogOpen(false)}
        open={isAddDialogOpen}
        label="Group name"
        onDelete={(id) =>
          deleteUserGroups({
            userId,
            groupIds: [Number(id)],
          })
        }
        selectedItems={users}
        items={userList}
        loadingGroupsList={isFetchingUserGroups}
        createGroup={(id) => {
          createGroup({
            userId,
            groupIds: [Number(id)],
          })
        }}
        title="Add Group"
      />
      <DeleteDialog
        open={deleteGroupVisible}
        message="Delete from this user?"
        onClose={() => setDeleteGroupVisible(false)}
        onSubmit={() =>
          deleteUserGroups({
            userId,
            groupIds: [Number(changeDeleteUser)],
          })
        }
      />
    </PersonDetailsWrapper>
  )
}

export default TabGroups
