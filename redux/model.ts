import { SerializableRootState } from '@redux/store'
import { PropsWithChildren } from 'react'

export type ReduxServerProps = PropsWithChildren<{
  serverReduxState?: SerializableRootState
}>

export type ReduxAppInitialProps = {
  pageProps?: ReduxServerProps
}

export type GetServerSidePropsData = {
  props: ReduxServerProps
}
