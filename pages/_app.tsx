import { profileApi } from '@api/profile'
import '@assets/chrome-bug.css'
import '@assets/main.css'
import AppUrlListener from '@components/AppUrlListener/AppUrlListener'
import { Head } from '@components/index'
import ToastMessage from '@components/ToastMessage'
import { ROUTES, ROUTES_USER_LEVELS } from '@constants/routes'
import { initializeDateUtil } from '@hooks/useDateUtil'
import { useLoadAllRoutePrefetch } from '@hooks/useRoutePrefetch'
import { useTypedSelector } from '@redux/hooks'
import { ReduxAppInitialProps, ReduxServerProps } from '@redux/model'
import { getStore, SerializableRootState } from '@redux/store'
import AccessGuard from '@screens//auth/components/AccessGuard'
import UnauthorizedGuard from '@screens/auth/components/UnauthorizedGuard/UnauthorizedGuard'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { axiosInstance } from '@api/index'
import { ApiStatusCodes } from '@api/types'
import { toast } from 'react-toastify'
import AppOffline from '@components/AppOffline/AppOffline'

initializeDateUtil()

const App = ({
  Component,
  pageProps = {} as ReduxServerProps,
}: Omit<AppProps, 'pageProps'> & ReduxAppInitialProps): JSX.Element => {
  useLoadAllRoutePrefetch()

  return (
    <AppProvider serverReduxState={pageProps?.serverReduxState}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export const AppProvider: FC<{
  serverReduxState?: SerializableRootState
}> = ({ children, serverReduxState }) => {
  const router = useRouter()
  const store = getStore({
    preloadedState: serverReduxState,
    memoized: true,
  })
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })
  const allowedRole = ROUTES_USER_LEVELS[router.pathname] || null

  const authorizedViewGuardCallback = useCallback(() => {
    if (router.pathname !== ROUTES.HOME) {
      router.isReady && router.replace(ROUTES.HOME)
    }
  }, [router])

  useEffect(() => {
    // expose store when run in Cypress
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.Cypress) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.store = store
    }
  }, [store])

  useEffect(() => {
    const interceptorId = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === ApiStatusCodes.InternalServerError) {
          toast.error('Server error, please try again in 5 minutes')
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axiosInstance.interceptors.response.eject(interceptorId)
    }
  }, [])

  return (
    <Provider store={store}>
      <AppOffline>
        <Head />
        <AppUrlListener />
        <PersistGate loading={null} persistor={persistor}>
          <ProfileProvider>
            <UnauthorizedGuard>
              <ToastMessage />
              <AccessGuard
                callback={authorizedViewGuardCallback}
                allowedRole={allowedRole}
              >
                <>{children}</>
              </AccessGuard>
            </UnauthorizedGuard>
          </ProfileProvider>
        </PersistGate>
      </AppOffline>
    </Provider>
  )
}

const ProfileProvider: FC = ({ children }) => {
  const token = useTypedSelector((state) => state.authSlice.token)
  profileApi.endpoints.getCurrentProfile.useQuery(null, {
    skip: !token,
    refetchOnMountOrArgChange: false,
  })

  return <>{children}</>
}

export default App
