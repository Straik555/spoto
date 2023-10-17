import PersonDetailsWrapper from '@screens/admin/Users/components/PersonDetailsWrapper/PersonDetailsWrapper'
import AddUserButton from '@screens/admin/Users/components/AddUserButton/AddUserButton'
import React, { FC } from 'react'
import UsersAction from '@screens/admin/Users/components/UsersAction'
import PersonDetailsCard from '@screens/admin/Users/components/PersonDetailsCard'
import { Loader } from '@components/Loader'
import AddDialogGroupUser from '@screens/admin/Users/components/AddDialogGroupUser'
import { ROUTES } from '@constants/routes'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import { useRouter } from 'next/router'
import cn from 'classnames'
import useTabGroups from '@screens/admin/Users/GroupsDetails/TabGroups/useTabGroups'
import { TabGroupsProps } from '@screens/admin/Users/GroupsDetails/TabGroups/TabGroups.model'
import Title from '@components/Title/Title'

const TabsGroups: FC<TabGroupsProps> = ({ onDelete, groupId, onTab }) => {
  const router = useRouter()
  const {
    deleteGroupVisible,
    setDeleteGroupVisible,
    deleteUserGroups,
    groups,
    isFetchingUserGroups,
    isFetchingGroupUsers,
    groupList,
    createUserGroup,
    changeDeleteGroup,
    setChangeDeleteGroup,
    setAddDialogOpen,
    isAddDialogOpen,
  } = useTabGroups(Number(groupId))
  return (
    <PersonDetailsWrapper
      addButton={
        <AddUserButton
          label="Add User"
          onClick={() => setAddDialogOpen(true)}
        />
      }
      className={cn({ 'h-full': isFetchingGroupUsers || !groups.length })}
      deleteButton={
        <UsersAction
          classNameWrapper="px-[16px] py-0 flex-col desktop:p-0"
          deleteMessage="Delete Group"
          onDelete={onDelete}
        />
      }
    >
      <Loader loading={isFetchingGroupUsers} className="mx-auto">
        {groups?.length ? (
          <div className="flex content-start w-full grid grid-cols-1 gap-y-[8px] lg-desktop:grid-cols-4 lg-desktop:gap-[15px] desktop:grid-cols-3 desktop:gap-[15px]">
            {groups?.map((group) => {
              return (
                <PersonDetailsCard
                  setGroupId={(id) => setChangeDeleteGroup(id)}
                  setDeleteGroupVisible={setDeleteGroupVisible}
                  key={group.id}
                  group={group}
                  onTab={onTab}
                  onDetail={(id) =>
                    router.push({
                      pathname: ROUTES.ADMIN_USERS_PERSON,
                      query: {
                        userId: id,
                      },
                    })
                  }
                />
              )
            })}
          </div>
        ) : (
          <div className="flex justify-center w-full my-auto">
            <Title className="font-semibold text-s-xl text-blue-3">
              no users
            </Title>
          </div>
        )}
      </Loader>
      <AddDialogGroupUser
        onClose={() => setAddDialogOpen(false)}
        open={isAddDialogOpen}
        label="User Name"
        placeholder="Select existing user"
        onDelete={(id) =>
          deleteUserGroups({
            groupId: Number(groupId),
            userIds: [String(id)],
          })
        }
        selectedItems={groups}
        items={groupList}
        loadingGroupsList={isFetchingUserGroups}
        createGroup={(id) => {
          createUserGroup({
            groupId: Number(groupId),
            userIds: [String(id)],
          })
        }}
        title="Add User"
      />
      <DeleteDialog
        open={deleteGroupVisible}
        message="Delete from this group?"
        onClose={() => setDeleteGroupVisible(false)}
        onSubmit={() =>
          deleteUserGroups({
            groupId: Number(groupId),
            userIds: [String(changeDeleteGroup)],
          })
        }
      />
    </PersonDetailsWrapper>
  )
}

export default TabsGroups
