import { userApi } from '@api/user'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getPersonFullName } from '@screens/admin/Users/utils/getPersonFullName'
import { toast } from 'react-toastify'
import { PersonTabs } from '@screens/admin/Users/Users.model'
import { PersonsUserInfo } from '@screens/admin/Users/PersonsDetails/PersonsDetails.model'

const usePersonsDetails = (userId: string) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<PersonTabs>(PersonTabs.Main)
  const [deleteUserVisible, setDeleteUserVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<PersonsUserInfo | null>(null)

  const { data: usersInfo, isFetching: isFetchingGetUser } =
    userApi.endpoints.getUser.useQuery(userId, {
      skip: !userId,
    })
  const [
    deleteUser,
    {
      isSuccess: isSuccessUser,
      isError: isErrorUser,
      isLoading: isLoadingUser,
    },
  ] = userApi.endpoints.deleteUser.useMutation()

  useEffect(() => {
    if (usersInfo) {
      setUserInfo({
        userId: usersInfo?.userId,
        name: getPersonFullName(usersInfo),
        avatarUrl: usersInfo?.avatarUrl,
      })
    }
  }, [usersInfo])

  useEffect(() => {
    if (isSuccessUser) {
      setDeleteUserVisible(false)
      toast.success('User deleted successfully')
      router.back()
    }

    if (isErrorUser) {
      toast.error('User deletion failed')
    }
  }, [isSuccessUser, isErrorUser, router])

  return {
    userInfo,
    isFetchingGetUser,
    deleteUserVisible,
    deleteUser,
    isLoadingUser,
    setDeleteUserVisible,
    activeTab,
    setActiveTab,
  }
}

export default usePersonsDetails
