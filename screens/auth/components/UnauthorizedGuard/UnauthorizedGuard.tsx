import { axiosInstance } from '@api/index'
import { profileApi, ProfileApiTagTypes } from '@api/profile'
import { ApiStatusCodes } from '@api/types'
import { useTypedDispatch, useTypedSelector } from '@redux/hooks'
import { useAuthInfo } from '@screens/auth/hooks/useAuthInfo'
import useDeAuthenticate from '@screens/auth/hooks/useDeAuthenticate'
import { isServerSide } from '@utils/isServerSide'
import { FC, useEffect } from 'react'

const ClientSideUnauthorizedGuard: FC = ({ children }) => {
  const token = useTypedSelector((state) => state.authSlice.token)
  const authInfo = useAuthInfo()
  const deAuthenticate = useDeAuthenticate()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (!authInfo.tokenExpired) return

    deAuthenticate({
      navigate: true,
      saveLogoutReferer: true,
      expired: true,
    })
  }, [authInfo.tokenExpired])

  useEffect(() => {
    const interceptorId = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === ApiStatusCodes.Unauthorized) {
          dispatch(
            profileApi.util.invalidateTags([ProfileApiTagTypes.ProfileInfo])
          )
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axiosInstance.interceptors.response.eject(interceptorId)
    }
  }, [token, dispatch])

  return <>{children}</>
}

export const UnauthorizedGuard: FC = ({ children }) => {
  if (isServerSide()) {
    return <>{children}</>
  }

  return <ClientSideUnauthorizedGuard>{children}</ClientSideUnauthorizedGuard>
}

export default UnauthorizedGuard
