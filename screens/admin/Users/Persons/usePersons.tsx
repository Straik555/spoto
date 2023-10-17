import { useEffect, useMemo, useState } from 'react'
import { userApi } from '@api/user'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import { toast } from 'react-toastify'
import { CardUser } from '@screens/admin/Users/Users.model'

const usePersons = () => {
  const [inviteUserDialogOpen, setInviteUserDialogOpen] = useState(false)
  const [searchString, setSearchString] = useState<string>('')
  const [users, setUsers] = useState<CardUser[] | []>([])

  const { data: usersData = [], isFetching: isFetchingUser } =
    userApi.endpoints.getUsers.useQuery({})

  const [deleteUser, { isSuccess: isSuccessUser, isError: isErrorUser }] =
    userApi.endpoints.deleteUser.useMutation()

  const filteredUsers = useMemo(() => {
    const searchRegExp = new RegExp(searchString, 'gi')
    return users?.filter((user) => searchRegExp.test(`${user.name}`))
  }, [users, searchString])

  useEffect(() => {
    if (usersData.length) {
      const users = usersData?.map((user) => ({
        id: user?.userId,
        name: getPersonFullName(user),
        avatarUrl: user?.avatarUrl,
      }))
      setUsers(users)
    }
  }, [usersData])

  useEffect(() => {
    if (isSuccessUser) {
      toast.success('User deleted successfully')
    }
  }, [isSuccessUser])

  useEffect(() => {
    if (isErrorUser) {
      toast.error('User deletion failed')
    }
  }, [isErrorUser])

  return {
    isFetchingUser,
    deleteUser,
    inviteUserDialogOpen,
    setInviteUserDialogOpen,
    searchString,
    setSearchString,
    filteredUsers,
  }
}

export default usePersons
