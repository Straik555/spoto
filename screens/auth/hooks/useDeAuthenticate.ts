import { ROUTES, Url } from '@constants/routes'
import { useTypedDispatch, useTypedSelector } from '@redux/hooks'
import { useSelectProfileByToken } from '@screens/auth/hooks/useSelectors'
import { authSlice } from '@screens/auth/slice'
import { useRouter } from 'next/router'

export type DeAuthenticateOptions = {
  saveLogoutReferer?: boolean
  navigate?: boolean
  expired?: boolean
}

const useDeAuthenticate = () => {
  const router = useRouter()
  const token = useTypedSelector((state) => state.authSlice.token)
  const dispatch = useTypedDispatch()
  const activeProfile = useSelectProfileByToken(token)

  return async (options: DeAuthenticateOptions = {}): Promise<void> => {
    const { saveLogoutReferer, navigate, expired } = options

    if (navigate) {
      const url: Url = {
        pathname: ROUTES.LOGIN,
        query: {
          ...(saveLogoutReferer ? { logoutReferer: router.asPath } : {}),
          ...(activeProfile && expired
            ? { expiredEmail: activeProfile.email }
            : {}),
        },
      }

      await router.replace(url)
    }

    dispatch(
      authSlice.actions.changeProfile({
        token,
        newProfileInfo: {
          active: false,
        },
      })
    )
    dispatch(authSlice.actions.removeToken())
  }
}

export default useDeAuthenticate
