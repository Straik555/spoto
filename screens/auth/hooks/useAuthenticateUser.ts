import authenticationApi from '@api/authentication'
import { baseApiSlice } from '@api/index'
import { profileApi, ProfileApiTagTypes } from '@api/profile'
import { ROUTES } from '@constants/routes'
import { useTypedDispatch } from '@redux/hooks'
import { authSlice } from '@screens/auth/slice'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoginQueryParams } from '../types'

const useAuthenticateUser = () => {
  const router = useRouter()
  const query = router.query as LoginQueryParams
  const [authenticateUser, { data, isSuccess, isError, isLoading }] =
    authenticationApi.endpoints.authenticateUser.useMutation()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (!data) return

    dispatch(
      authSlice.actions.addProfile({
        email: data.email,
        expiration: data.expiration,
        firstName: data.firstName,
        lastName: data.lastName,
        photo: data.photo,
        roles: data.roles,
        token: data.token,
        title: data.title,
      })
    )
    dispatch(authSlice.actions.setToken(data.token))

    dispatch(profileApi.util.invalidateTags([ProfileApiTagTypes.ProfileInfo]))
    dispatch(baseApiSlice.util.resetApiState())

    if (router.pathname !== ROUTES.JOIN) {
      router.replace(query.logoutReferer || ROUTES.HOME)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      toast.error('Incorrect email or password')
    }
  }, [isError])

  return { authenticateUser, isSuccess, isLoading }
}

export default useAuthenticateUser
