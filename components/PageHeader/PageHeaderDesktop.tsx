import React, { FC } from 'react'
import Link from 'next/link'

import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { ROUTES } from '@constants/routes'
import { useCurrentProfile } from '@hooks/useCurrentProfile'
import LogoHeader from '@assets/icons/logos/spoto-logo-yellow-small.svg'
import PageHeaderDesktopProfileSwitcher from '@screens/auth/components/ProfileSwitcher/PageHeaderDesktopProfileSwitcher'

const PageHeaderDesktop: FC<{ showButton: boolean }> = ({ showButton }) => {
  const { profile } = useCurrentProfile()

  return (
    <header className="flex items-center justify-between h-[84px] px-[30px] bg-primary mx-full relative">
      <div className="flex items-center flex-1">
        <Link href={ROUTES.HOME}>
          <a>
            <div className="mr-20 -mt-1 cursor-pointer">
              <LogoHeader />
            </div>
          </a>
        </Link>
      </div>
      {showButton && (
        <>
          {profile ? (
            <PageHeaderDesktopProfileSwitcher />
          ) : (
            <Link href={ROUTES.LOGIN}>
              <a>
                <Button
                  mode={ButtonMode.SMALL}
                  className="flex items-center justify-start px-5 text-base text-white"
                  icon={ButtonIcon.LOG_IN}
                >
                  Log In
                </Button>
              </a>
            </Link>
          )}
        </>
      )}
    </header>
  )
}

export default React.memo(PageHeaderDesktop)
