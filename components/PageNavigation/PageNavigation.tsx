import React, { FC, useCallback } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useTypedDispatch } from '@redux/hooks'

import useDeAuthenticate from '@screens/auth/hooks/useDeAuthenticate'
import { useSelectActiveProfile } from '@screens/auth/hooks/useSelectors'
import pageHeaderItems from '@components/PageHeader/PageHeaderItems'
import MenuItem from '@components/PageHeader/MenuItem/MenuItem'
import { ROUTES } from '@constants/routes'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import HelpIcon from '@assets/icons/leftMenuIcons/help.svg'
import LogOut from '@assets/icons/leftMenuIcons/log-out.svg'
import ArrowDown from '@assets/icons/arrows/arrow-down-small-bold.svg'
import AccessGuard from '@screens/auth/components/AccessGuard/AccessGuard'
import { layoutSlice } from '@components/Layout/slice'

import s from './PageNavigation.module.css'
import { PageNavigationProps } from './PageNavigation.model'
import { useSpotoMediaQuery } from '@hooks/useMediaQuery'

const PageNavigation: FC<PageNavigationProps> = ({
  setIsOpenMenu,
  isOpenMenu,
}) => {
  const dispatch = useTypedDispatch()
  const router = useRouter()
  const deAuthenticate = useDeAuthenticate()
  const { profile } = useCurrentProfile()
  const activePersistedProfile = useSelectActiveProfile()
  const { maxWidth1366 } = useSpotoMediaQuery()

  const handleLogOut = useCallback(
    () => deAuthenticate({ navigate: true }),
    [deAuthenticate]
  )

  return (
    <div
      className={cn(
        'flex flex-col justify-between z-40 bg-white transition-all h-full shadow-6',
        s.wrapper,
        {
          absolute: maxWidth1366,
          relative: !maxWidth1366,
          'w-[290px] duration-500': isOpenMenu,
          'w-[64px] duration-500': !isOpenMenu,
        }
      )}
    >
      <div>
        <div
          className="absolute -right-[15px] z-10 flex items-center justify-center cursor-pointer 
            top-[calc(50%-46px/2-216px)] rounded-tr-[5px] rounded-br-[5px] bg-blue-3 hover:bg-primary w-[15px] h-[46px]"
          onClick={() => {
            dispatch(layoutSlice.actions.setMenuState(!isOpenMenu))
            setIsOpenMenu(!isOpenMenu)
          }}
        >
          {isOpenMenu ? (
            <ArrowDown className="stroke-white rotate-90" />
          ) : (
            <ArrowDown className="stroke-white -rotate-90" />
          )}
        </div>
        <div className={cn('flex flex-col', { [s.wrapperItem]: !isOpenMenu })}>
          {pageHeaderItems.map((item) => {
            const { icon, pageRoute, title, allowedRole, forbiddenRole } = item
            const active =
              router.asPath.includes(pageRoute) ||
              router.route.includes(pageRoute) ||
              router.pathname.includes(pageRoute)

            return (
              <AccessGuard
                key={pageRoute}
                allowedRole={allowedRole}
                forbiddenRole={forbiddenRole}
              >
                <MenuItem
                  title={isOpenMenu ? title : ''}
                  icon={icon}
                  pageRoute={pageRoute}
                  active={active}
                />
              </AccessGuard>
            )
          })}
        </div>
      </div>
      <div className={cn('flex flex-col', { [s.wrapperItem]: !isOpenMenu })}>
        <MenuItem
          title={isOpenMenu ? 'Help' : ''}
          icon={<HelpIcon />}
          pageRoute={ROUTES.HELP}
          active={false}
        />

        {profile ? (
          <MenuItem
            title={isOpenMenu ? 'Log Out' : ''}
            icon={<LogOut />}
            onClick={handleLogOut}
            active={false}
          />
        ) : (
          <MenuItem
            title={isOpenMenu ? 'Log In' : ''}
            icon={<LogOut />}
            pageRoute={{
              pathname: ROUTES.LOGIN,
              query: {
                ...(activePersistedProfile
                  ? {
                      prefillEmail: activePersistedProfile.email,
                    }
                  : {}),
              },
            }}
            active={false}
          />
        )}
      </div>
    </div>
  )
}

export default React.memo(PageNavigation)
