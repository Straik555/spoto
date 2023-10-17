import { useEffect, useMemo, useState } from 'react'
import { inviteApi } from '@api/invite'
import { toast } from 'react-toastify'

const useUsers = () => {
  const [search, setSearch] = useState<string>('')
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false)
  const { data: users = [], isFetching } =
    inviteApi.endpoints.getInvitations.useQuery(null)
  const [deleteUser, { isSuccess: isSuccessDelete, isError: isErrorDelete }] =
    inviteApi.endpoints.deleteInvitationById.useMutation()
  const [
    createUser,
    { isSuccess: isSuccessCreateUser, isError: isErrorCreateUser },
  ] = inviteApi.endpoints.inviteUserByEmail.useMutation()

  const filteredUsers = useMemo(() => {
    const searchRegExp = new RegExp(search, 'gi')
    return users?.filter((user) =>
      searchRegExp.test(`${user.firstName}${user.lastName}`)
    )
  }, [users, search])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success('User deleted successfully')
    }
    if (isSuccessCreateUser) {
      toast.success('User created successfully')
    }
  }, [isSuccessDelete, isSuccessCreateUser])

  useEffect(() => {
    if (isErrorDelete) {
      toast.error('User deletion failed')
    }
    if (isErrorCreateUser) {
      toast.error('User created failed')
    }
  }, [isErrorDelete, isErrorCreateUser])

  return {
    handleSearchChange: setSearch,
    search,
    filteredUsers,
    isFetching,
    deleteUser,
    isOpenAdd,
    setIsOpenAdd,
    createUser,
  }
}

export default useUsers
