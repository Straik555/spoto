import { useEffect, useMemo, useState } from 'react'
import { CardGroup } from '@screens/admin/Users/Users.model'
import { groupApi } from '@api/group'
import { toast } from 'react-toastify'

const useGroups = () => {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)
  const [searchString, setSearchString] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [inviteUserDialogOpen, setInviteUserDialogOpen] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [groups, setGroups] = useState<CardGroup[] | []>([])

  const [createGroups, { isError: isErrorGroups, isSuccess: isSuccessGroups }] =
    groupApi.endpoints.createGroup.useMutation()

  const [
    deleteGroupTrigger,
    { isSuccess: isSuccessDeleteGroup, isError: isErrorDeleteGroup },
  ] = groupApi.endpoints.deleteGroup.useMutation()

  const { data: userGroups = [], isFetching: isFetchingGroup } =
    groupApi.endpoints.getGroups.useQuery({})

  const deleteGroup = (id: number) => deleteGroupTrigger(id)

  const filteredGroups = useMemo(() => {
    const searchRegExp = new RegExp(searchString, 'gi')
    return groups?.filter((user) => searchRegExp.test(`${user.name}`))
  }, [groups, searchString])

  useEffect(() => {
    if (userGroups.length) {
      const newGroups = userGroups?.map((group) => ({
        id: group?.id,
        name: group?.name,
        avatarUrl: group?.avatarUrl,
      }))
      setGroups(newGroups)
    }
  }, [userGroups])

  useEffect(() => {
    if (isErrorDeleteGroup) {
      toast.error('Group deletion failed')
    }
  }, [isErrorDeleteGroup])

  useEffect(() => {
    if (isErrorGroups) {
      toast.error('Group added failed')
    }
  }, [isErrorGroups])

  useEffect(() => {
    if (isSuccessGroups) {
      toast.success('Group added successfully')
    }
  }, [isSuccessGroups])

  useEffect(() => {
    if (isSuccessDeleteGroup) {
      toast.success('Group deleted successfully')
    }
  }, [isSuccessDeleteGroup])

  return {
    selectedUser,
    setSelectedUser,
    inviteUserDialogOpen,
    setInviteUserDialogOpen,
    isOpen,
    setIsOpen,
    filteredGroups,
    searchString,
    setSearchString,
    deleteGroup,
    createGroups,
    isFetchingGroup,
    isSuccessDeleteGroup,
    openAddDialog,
    setOpenAddDialog,
  }
}

export default useGroups
