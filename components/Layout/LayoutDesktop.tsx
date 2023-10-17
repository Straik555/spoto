import cn from 'classnames'
import React, { FC, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTypedSelector, useTypedDispatch } from '@redux/hooks'
import { layoutSlice } from '@components/Layout/slice'
import { BrowserView } from '@components/DeviceDetect/DeviceDetect'
import { PageHeaderDesktop } from '@components/PageHeader'
import PageNavigation from '@components/PageNavigation'
import { PUBLIC_ROUTES, ROUTES } from '@constants/routes'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'

const LayoutDesktop: FC = ({ children }) => {
  const isOpenMenu = useTypedSelector((state) => state.layoutSlice.isOpenMenu)
  const dispatch = useTypedDispatch()
  const { pathname } = useRouter()
  const { maxWidth1366, minWidth1366 } = useSpotoMediaQuery()

  useEffect(() => {
    if (!minWidth1366) {
      dispatch(layoutSlice.actions.setMenuState(false))
    }
  }, [])

  const showActions = useMemo(() => {
    const isPublicRoute = PUBLIC_ROUTES.slice(1).includes(pathname as ROUTES)
    return !isPublicRoute
  }, [pathname])

  return (
    <BrowserView className="flex flex-col w-full h-screen">
      <PageHeaderDesktop showButton={showActions} />
      <div className="relative flex justify-start grow">
        <div className="absolute flex justify-start w-full h-full">
          {showActions && (
            <div className={cn('block w-max')}>
              <PageNavigation
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={(e) =>
                  dispatch(layoutSlice.actions.setMenuState(e))
                }
              />
            </div>
          )}
          <div className={cn('flex flex-col w-full transition-all')}>
            {maxWidth1366 && (
              <div
                className={cn(
                  'fixed w-full h-full bg-black/75 backdrop-blur-sm z-[39]',
                  {
                    hidden: !isOpenMenu,
                  }
                )}
                onClick={() => {
                  dispatch(layoutSlice.actions.setMenuState(false))
                }}
              />
            )}
            {children}
          </div>
        </div>
      </div>
    </BrowserView>
  )
}

export default LayoutDesktop
