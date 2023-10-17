import { useTypedSelector } from '@redux/hooks'
import { FC, useMemo } from 'react'
import {
  CustomView,
  getSelectorsByUserAgent,
  ViewProps,
} from 'react-device-detect'

export const getDeviceInfo = (userAgent: string) => {
  return userAgent
    ? getSelectorsByUserAgent(userAgent)
    : { isMobile: true, isBrowser: false }
}

export const useDeviceInfo = () => {
  const userAgent = useTypedSelector((state) => state.serverSideSlice.userAgent)

  return useMemo(() => {
    return getDeviceInfo(userAgent)
  }, [userAgent])
}

export const BrowserView: FC<ViewProps> = ({ children, ...props }) => {
  const { isBrowser } = useDeviceInfo()

  return (
    <CustomView condition={isBrowser} {...props}>
      {children}
    </CustomView>
  )
}

export const MobileView: FC<ViewProps> = ({ children, ...props }) => {
  const { isMobile } = useDeviceInfo()

  return (
    <CustomView condition={isMobile} {...props}>
      {children}
    </CustomView>
  )
}
