import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

import OpenEnvelopeIcon from '@assets/icons/large-icons/open-envelope.svg'
import OpenEnvelopeBigIcon from '@assets/icons/large-icons/open-envelope-big.svg'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import { ROUTES } from '@constants/routes'

import { ForgotPasswordSuccessProps } from './ForgotPassword.model'

const ForgotPasswordSuccess: React.FC<ForgotPasswordSuccessProps> = ({
  isDesktop,
  userEmail,
}) => (
  <div
    className={cn('flex flex-col items-center w-full', {
      'pt-[83px]': isDesktop,
      'my-auto p-[16px]': !isDesktop,
    })}
  >
    <div
      className={cn('flex flex-col items-center justify-center', {
        'mb-[55px]': isDesktop,
        'mb-[30px]': !isDesktop,
      })}
    >
      {isDesktop ? <OpenEnvelopeBigIcon /> : <OpenEnvelopeIcon />}
    </div>
    <div className="mb-0 font-semibold text-center text-s-2xl mb-[6px]">
      Success!
    </div>
    <div
      className={cn('font-semibold text-center text-s-lg', {
        'mb-[20px]': isDesktop,
        'mb-[30px]': !isDesktop,
      })}
    >
      Please check your email
    </div>
    <div
      className={cn('font-normal text-left text-center text-s-lg text-blue-1', {
        'mb-[20px]': isDesktop,
        'mb-[12px]': !isDesktop,
      })}
    >
      We have sent an email to
    </div>
    <div
      className={cn('text-base font-semibold text-center text-primary', {
        'mb-[20px]': isDesktop,
        'mb-[12px]': !isDesktop,
      })}
    >
      {userEmail}
    </div>
    <div className="text-center px-[8px] text-blue-1 text-s-lg">
      please check your email and click the
    </div>
    <div
      className={cn('text-center px-[8px] text-blue-1 text-s-lg', {
        'mb-[55px]': isDesktop,
        'mb-[50px]': !isDesktop,
      })}
    >
      link to reset your password
    </div>

    <Button className="max-w-[343px]" mode={ButtonMode.FULL_PRIMARY}>
      <Link href={{ pathname: ROUTES.LOGIN }}>
        <a>Login</a>
      </Link>
    </Button>
  </div>
)

export default ForgotPasswordSuccess
