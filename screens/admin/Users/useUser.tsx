import { useRouter } from 'next/router'
import { useCallback, useState, useEffect } from 'react'
import { UserType } from '@screens/admin/Users/Users.model'
import { userTypeToRouteParamMapping } from '@screens/admin/Users/constants'
import { ROUTES } from '@constants/routes'

const useUser = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userType, setUserType] = useState<UserType>(UserType.USERS)
  const selectUserType = useCallback((userType: UserType) => {
    setUserType(userType)
    router.push({
      pathname: ROUTES.ADMIN_USERS_TYPE,
      query: {
        type: userTypeToRouteParamMapping[userType],
      },
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (router.query?.type && router.query?.type[0] === 'group') {
      setUserType(UserType.USER_GROUPS)
    } else {
      setUserType(UserType.USERS)
    }
    setIsLoading(false)
  }, [router.query])

  return {
    userType,
    selectUserType,
    setUserType,
    isLoading,
  }
}

export default useUser
