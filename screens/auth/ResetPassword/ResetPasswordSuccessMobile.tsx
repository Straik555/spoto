import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { ButtonMode } from '@components/Button/Button.model'
import { ROUTES } from '@constants/routes'
import { Button } from '@components/index'
import ThumbSuccessIcon from '@assets/icons/thumb-success.svg'
import ThumbSuccessBigIcon from '@assets/icons/thumb-success-big.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const ResetPasswordSuccessMobile: React.FC = () => {
  const { isDesktop } = useDeviceInfo()
  return (
    <div className="flex h-screen">
      <div
        className={cn('flex flex-col items-center w-full', {
          'pt-[155px]': isDesktop,
          'my-auto p-[16px]': !isDesktop,
        })}
      >
        {isDesktop ? (
          <ThumbSuccessBigIcon className="mb-[60px]" />
        ) : (
          <ThumbSuccessIcon className="mb-[55px]" />
        )}
        <div
          className={cn('text-s-2xl font-semibold', {
            'mb-[10px]': isDesktop,
            'mb-[36px]': !isDesktop,
          })}
        >
          Success!
        </div>
        <div
          className={cn('text-center text-s-lg text-blue-1', {
            'mb-[55px]': isDesktop,
            'mb-[180px]': !isDesktop,
          })}
        >
          Your password has been reset
          <p>please log in to continue</p>
        </div>

        <Button className="max-w-[343px]" mode={ButtonMode.FULL_PRIMARY}>
          <Link href={{ pathname: ROUTES.LOGIN }}>
            <a>Login</a>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default ResetPasswordSuccessMobile
