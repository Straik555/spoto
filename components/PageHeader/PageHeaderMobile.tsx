import LogInIcon from '@assets/icons/log-in.svg'
import React, { FC, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import ArrowLeftBold from '@assets/icons/arrows/arrow-left-bold.svg'
import CrossIcon from '@assets/icons/cross.svg'
import HelpIcon from '@assets/icons/leftMenuIcons/help.svg'
import LogOut from '@assets/icons/leftMenuIcons/log-out.svg'
import BurgerButton from '@components/PageHeader/BurgerButton'
import MenuItem from '@components/PageHeader/MenuItem/MenuItem'
import {
  PageHeaderProps,
  PageHeaderView,
} from '@components/PageHeader/PageHeader.model'
import pageHeaderItems from '@components/PageHeader/PageHeaderItems'
import Title from '@components/Title/Title'
import { ROUTES } from '@constants/routes'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import SideMenuProfileSwitcher from '@screens/auth/components/ProfileSwitcher/SideMenuProfileSwitcher'
import useDeAuthenticate from '@screens/auth/hooks/useDeAuthenticate'
import { useSelectActiveProfile } from '@screens/auth/hooks/useSelectors'
import AccessGuard from '@screens/auth/components/AccessGuard/AccessGuard'

const PageHeaderMobile: FC<PageHeaderProps> = ({
  backButtonLink,
  showBackButton,
  view,
  title = '',
  rightContent,
  titleClassName,
  routeBack,
  className,
  noCap,
}) => {
  const router = useRouter()
  const { profile } = useCurrentProfile()
  const activePersistedProfile = useSelectActiveProfile()
  const deAuthenticate = useDeAuthenticate()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  useEffect(() => {
    const htmlTagElements = document.getElementsByTagName('html')
    const { style } = htmlTagElements.item(0) as HTMLHtmlElement

    style.overflow = isOpenMenu ? 'hidden' : ''
  }, [isOpenMenu])

  const onBack = (): void => {
    if (routeBack) {
      router.push(routeBack)
    } else {
      if (backButtonLink) {
        router.push(backButtonLink)
      } else {
        router.back()
      }
    }
  }

  const handleLogOut = useCallback(
    () => deAuthenticate({ navigate: true }),
    [deAuthenticate]
  )

  const closeMenu = () => setIsOpenMenu(false)

  const TopItems: React.FC = () => (
    <div>
      {pageHeaderItems.map((item) => {
        const { icon, pageRoute, title, allowedRole, forbiddenRole } = item
        const active = [router.asPath, router.route, router.pathname].includes(
          pageRoute
        )

        return (
          <AccessGuard
            key={pageRoute}
            allowedRole={allowedRole}
            forbiddenRole={forbiddenRole}
          >
            <MenuItem
              onClick={() => {
                if (pageRoute) {
                  setIsOpenMenu(false)
                }
              }}
              pageRoute={pageRoute}
              {...{ active, icon, title }}
            />
          </AccessGuard>
        )
      })}
    </div>
  )

  const BottomItems: React.FC = () => (
    <div>
      <MenuItem
        title="Help"
        icon={<HelpIcon className="fill-blue-menu" />}
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
          icon={<LogInIcon />}
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
  )

  return (
    <header
      className={cn('min-h-[56px] flex items-center', className, {
        'px-[16px] bg-primary': view !== PageHeaderView.white,
      })}
    >
      <div className="flex items-center justify-between w-full safe-area-p-t">
        <div
          className={cn('flex items-center h-[56px]', {
            'flex-1': title,
          })}
        >
          <div
            className={cn('flex justify-center align-center', {
              'w-[24px] h-[24px] mr-[20px]': view !== PageHeaderView.white,
            })}
          >
            {showBackButton ? (
              <ArrowLeftBold
                onClick={onBack}
                className="cursor-pointer stroke-white"
                aria-label="back-button"
              />
            ) : (
              <>
                <BurgerButton
                  isOpen={isOpenMenu}
                  setIsOpen={setIsOpenMenu}
                  view={view}
                />
                <div
                  className={cn(
                    'fixed top-0 z-[10000] transition-all h-full left-0 overflow-hidden',
                    {
                      'w-[280px]': isOpenMenu,
                      'w-0': !isOpenMenu,
                    }
                  )}
                >
                  <div
                    className={cn(
                      'fixed w-full h-full bg-black/75 backdrop-blur-sm',
                      {
                        hidden: !isOpenMenu,
                      }
                    )}
                    onClick={closeMenu}
                  />
                  <div
                    className={cn(
                      'h-full relative overflow-x-hidden flex flex-col w-[282px] translate-x-[0] right-0 safe-area-p-t bg-primary'
                    )}
                  >
                    <div
                      className="sticky top-0 flex items-center pb-4 font-semibold text-white text-s-xl bg-primary pt-[15px] min-h-[56px] h-[56px] z-[1]"
                      onClick={closeMenu}
                    >
                      <CrossIcon className="cursor-pointer ml-[21px] mr-[23px] fill-white" />
                      Menu
                    </div>
                    <SideMenuProfileSwitcher />
                    <div
                      className={cn(
                        'bg-white flex flex-col justify-between overflow-auto grow safe-area-p-b'
                      )}
                    >
                      <TopItems />
                      <BottomItems />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {title && (
            <Title
              as="p"
              className={cn(
                'text-lg font-semibold text-white text-ellipsis overflow-hidden',
                titleClassName
              )}
              data-testid={`${title}-title`}
              noCap={noCap}
            >
              {title}
            </Title>
          )}
        </div>
        {rightContent}
      </div>
    </header>
  )
}

export default React.memo(PageHeaderMobile)
