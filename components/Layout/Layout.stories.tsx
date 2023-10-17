import React, { FC, useEffect, useState } from 'react'
import { BrowserView } from 'react-device-detect'
import { getStore } from '@redux/store'
import { Provider } from 'react-redux'
import cn from 'classnames'
import { LayoutMobile } from '@components/Layout'
import { ButtonMode } from '@components/Button/Button.model'
import Button from '@components/Button'
import MenuItem from '@components/PageHeader/MenuItem/MenuItem'
import { PageHeaderView } from '@components/PageHeader/PageHeader.model'
import BurgerButton from '@components/PageHeader/BurgerButton'
import SideMenuProfileSwitcher from '@screens/auth/components/ProfileSwitcher/SideMenuProfileSwitcher'
import LogoHeader from '@assets/icons/logos/spoto-logo-yellow-small.svg'
import LogOut from '@assets/icons/leftMenuIcons/log-out.svg'
import House from '@assets/icons/leftMenuIcons/house.svg'
import CrossIcon from '@assets/icons/cross.svg'
import ArrowDown from '@assets/icons/arrows/arrow-down-small-bold.svg'
import s from '@components/PageNavigation/PageNavigation.module.css'

export default {
  title: 'Reusable Components/Layout',
  component: LayoutMobile,
}

export const LayoutComponent: FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [pageRoute, setPageRoute] = useState<string>('Houses')

  useEffect(() => {
    const detectScreenSize = () => setIsOpenMenu(window.innerWidth > 1360)
    window.addEventListener(`resize`, detectScreenSize, true)
    detectScreenSize()
    return () => window.removeEventListener('resize', detectScreenSize)
  }, [setIsOpenMenu, window])

  const store = getStore({
    preloadedState: undefined,
    memoized: true,
  })

  return (
    <Provider store={store}>
      <LayoutMobile>
        <header className="flex items-center min-h-[57px]">
          <div className="flex items-center justify-between w-full safe-area-p-t px-[14px] !h-[60px] bg-primary">
            <div className="flex items-center">
              <BurgerButton
                isOpen={isOpenMenu}
                setIsOpen={setIsOpenMenu}
                view={PageHeaderView.default}
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
                  className={cn('fixed w-full h-full bg-black/20', {
                    hidden: !isOpenMenu,
                  })}
                  onClick={() => setIsOpenMenu(false)}
                />
                <div
                  className={cn(
                    'h-full relative overflow-x-hidden flex flex-col w-[282px] translate-x-[0] right-0 safe-area-p-t bg-primary'
                  )}
                >
                  <div className="sticky top-0 flex items-center pb-4 font-semibold text-white text-s-xl bg-primary pt-[15px] min-h-[56px] z-[1]">
                    <CrossIcon className="ml-4 cursor-pointer mr-[23px] fill-white" />
                    Menu
                  </div>
                  <SideMenuProfileSwitcher />
                  <div
                    className={cn(
                      'bg-white flex flex-col justify-between overflow-auto grow safe-area-p-b'
                    )}
                  >
                    <div className="flex flex-col">
                      <MenuItem
                        title={'Houses'}
                        icon={<House />}
                        onClick={() => setPageRoute('Houses')}
                        active={pageRoute.includes('Houses')}
                      />
                    </div>
                    <div className="flex flex-col">
                      <MenuItem
                        title={'Log Out'}
                        icon={<LogOut />}
                        onClick={() => setPageRoute('Log Out')}
                        active={pageRoute.includes('Log Out')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <p className="mt-3">
          If you want to check browser version - it is required to switch device
          from mobile inspector to browser view
        </p>
      </LayoutMobile>
      <BrowserView className="flex flex-col w-full h-screen">
        <header className="p-[20px] bg-primary">
          <div className="flex items-center justify-between h-full mx-full">
            <div className="mr-20 -mt-1 cursor-pointer">
              <LogoHeader />
            </div>
            <Button
              mode={ButtonMode.SMALL}
              className="flex items-center justify-start px-5 text-base text-white"
            >
              Log In
            </Button>
          </div>
        </header>
        <div className="relative flex justify-start grow">
          <div className={cn('block w-max')}>
            <div
              className={cn(
                'relative flex flex-col justify-between z-40 bg-white transition-all overflow-hidden h-full',
                s.wrapper,
                {
                  'w-[290px] duration-500': isOpenMenu,
                  'w-[64px] duration-500': !isOpenMenu,
                }
              )}
            >
              <div
                className="absolute -right-[15px] z-10 flex items-center justify-center cursor-pointer top-[calc(50%-46px/2-216px)] rounded-tr-[5px] rounded-br-[5px] bg-primary w-[15px] h-[46px]"
                onClick={() => setIsOpenMenu(!isOpenMenu)}
              >
                {isOpenMenu ? (
                  <ArrowDown className="stroke-white rotate-90" />
                ) : (
                  <ArrowDown className="stroke-white -rotate-90" />
                )}
              </div>
              <div
                className={cn('flex h-full flex-col', {
                  [s.wrapperItem]: !isOpenMenu,
                })}
              >
                <MenuItem
                  title={isOpenMenu ? 'Houses' : ''}
                  icon={<House />}
                  onClick={() => setPageRoute('Houses')}
                  active={pageRoute.includes('Houses')}
                />
              </div>
              <div className="flex flex-col">
                <MenuItem
                  title={isOpenMenu ? 'Log Out' : ''}
                  icon={<LogOut />}
                  onClick={() => setPageRoute('Log Out')}
                  active={pageRoute.includes('Log Out')}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-3 transition-all">
            If you want to check mobile version - it is required to switch
            device from browser inspector to mobile view
          </div>
        </div>
      </BrowserView>
    </Provider>
  )
}
