import { groupApi } from '@api/group'
import { useEffect, useState } from 'react'
import { UserGroupInfo } from '@api/user/types'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import { AddUserGroup } from '@screens/admin/Users/components/AddDialogGroupUser/AddDialogGroupUser.model'
import { userApi } from '@api/user'
import { toast } from 'react-toastify'

const useTabGroups = (groupId: number) => {
  const [deleteGroupVisible, setDeleteGroupVisible] = useState<boolean>(false)
  const [changeDeleteGroup, setChangeDeleteGroup] = useState<string | null>(
    null
  )
  const [isAddDialogOpen, setAddDialogOpen] = useState<boolean>(false)
  const [groups, setGroups] = useState<
    ({ id: string } & Omit<UserGroupInfo, 'ownerId' | 'id'>)[] | []
  >([])
  const [groupList, setGroupList] = useState<AddUserGroup[] | []>([])
  const { data: groupUsers = [], isFetching: isFetchingGroupUsers } =
    groupApi.endpoints.getGroupUsers.useQuery(groupId)

  const { data: userGroup = [], isFetching: isFetchingUserGroups } =
    userApi.endpoints.getUsers.useQuery({})

  const [
    deleteUserGroups,
    { isSuccess: isSuccessUsersFromGroup, isError: isErrorUsersFromGroup },
  ] = groupApi.endpoints.deleteUsersFromGroup.useMutation()

  const [createUserGroup, { isError: isErrorUserGroup }] =
    groupApi.endpoints.addUsersToGroup.useMutation()

  useEffect(() => {
    if (userGroup?.length) {
      setGroupList(
        userGroup?.map((user) => ({
          id: user?.userId,
          name: getPersonFullName(user),
          avatarUrl: user?.avatarUrl,
        }))
      )
    }
  }, [userGroup])

  useEffect(() => {
    if (groupUsers) {
      const group = groupUsers?.map((user) => ({
        id: user?.userId,
        name: getPersonFullName(user),
        avatarUrl: user?.avatarUrl,
      }))
      setGroups(group)
    }
  }, [groupUsers])

  useEffect(() => {
    if (isErrorUsersFromGroup) {
      toast.error('User deletion failed')
    }
  }, [isErrorUsersFromGroup])

  useEffect(() => {
    if (isSuccessUsersFromGroup) {
      setDeleteGroupVisible(false)
      toast.success('User deleted successfully')
    }
  }, [isSuccessUsersFromGroup])

  useEffect(() => {
    if (isErrorUserGroup) {
      toast.error('User added failed')
    }
  }, [isErrorUserGroup])

  return {
    groups,
    groupList,
    isFetchingGroupUsers,
    deleteGroupVisible,
    setDeleteGroupVisible,
    isFetchingUserGroups,
    deleteUserGroups,
    createUserGroup,
    isAddDialogOpen,
    setAddDialogOpen,
    changeDeleteGroup,
    setChangeDeleteGroup,
  }
}

export default useTabGroups
