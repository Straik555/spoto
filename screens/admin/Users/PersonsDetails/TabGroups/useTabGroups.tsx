import { userApi } from '@api/user'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { UserGroupInfo } from '@api/user/types'
import { AddUserGroup } from '@screens/admin/Users/components/AddDialogGroupUser/AddDialogGroupUser.model'
import { groupApi } from '@api/group'

const useTabGroups = (userId: string) => {
  const [changeDeleteUser, setChangeDeleteUser] = useState<string | null>(null)
  const [isAddDialogOpen, setAddDialogOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<
    ({ id: string } & Omit<UserGroupInfo, 'ownerId' | 'id'>)[] | []
  >([])
  const [deleteGroupVisible, setDeleteGroupVisible] = useState<boolean>(false)
  const [userList, setUserList] = useState<AddUserGroup[] | []>([])
  const { data: groupsList = [], isFetching: isFetchingGroups } =
    groupApi.endpoints.getGroups.useQuery({})
  const { data: userGroups = [], isFetching: isFetchingUserGroups } =
    userApi.endpoints.getUserGroups.useQuery(userId)
  const [createGroup, { isSuccess: isSuccessGroup, isError: isErrorGroup }] =
    userApi.endpoints.addGroupsToUser.useMutation()
  const [
    deleteUserGroups,
    { isSuccess: isSuccessGroupsToUser, isError: isErrorGroupsToUser },
  ] = userApi.endpoints.deleteGroupsToUser.useMutation()

  useEffect(() => {
    if (userGroups) {
      const group = userGroups?.map((user) => ({
        id: String(user?.id),
        name: user?.name,
        avatarUrl: user?.avatarUrl,
      }))
      setUsers(group)
    }
  }, [userGroups])

  useEffect(() => {
    if (groupsList?.length) {
      setUserList(
        groupsList?.map((user) => ({
          id: String(user?.id),
          name: user?.name,
          avatarUrl: user?.avatarUrl,
        }))
      )
    }
  }, [groupsList])

  useEffect(() => {
    if (isErrorGroupsToUser) {
      toast.error('User deletion failed')
    }
  }, [isErrorGroupsToUser])

  useEffect(() => {
    if (isSuccessGroupsToUser) {
      setDeleteGroupVisible(false)
      toast.success('User deleted successfully')
    }
  }, [isSuccessGroupsToUser])

  useEffect(() => {
    if (isErrorGroup) {
      toast.error('User added failed')
    }
  }, [isSuccessGroup])
  return {
    setDeleteGroupVisible,
    deleteGroupVisible,
    isFetchingGroups,
    deleteUserGroups,
    userList,
    createGroup,
    isFetchingUserGroups,
    users,
    isAddDialogOpen,
    setAddDialogOpen,
    changeDeleteUser,
    setChangeDeleteUser,
  }
}

export default useTabGroups
