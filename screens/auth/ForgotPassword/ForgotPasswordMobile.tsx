import React from 'react'
import cn from 'classnames'
import Link from 'next/link'

import { ROUTES } from '@constants/routes'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import LockForgotIcon from '@assets/icons/large-icons/lock-forgot.svg'
import LockForgotBigIcon from '@assets/icons/large-icons/lock-forgot-big.svg'
import { EMAIL_VALIDATION_SCHEMA } from './validation'
import Input from '@components/Form/Input/Input'
import PageHeaderMobile from '@components/PageHeader/PageHeaderMobile'
import { withForm } from '@components/Form/withForm'
import { LoginProps } from '@screens/auth/Login/Login.model'

import ForgotPasswordSuccess from './ForgotPasswordSuccess'
import useForgotPassword from './useForgotPassword'

const ForgotPasswordMobile: React.FC = () => {
  const [state, actions] = useForgotPassword()
  const { disabled, isDesktop, isSuccess, userEmail, submitFailed } = state
  const { handleSubmit, setSubmitFailed } = actions

  if (isSuccess) {
    return <ForgotPasswordSuccess {...{ isDesktop, userEmail }} />
  }

  return (
    <div className="w-full h-full">
      {!isDesktop && <PageHeaderMobile title="Back" showBackButton />}
      <div
        className={cn({
          'pl-[40%] pb-[32px] pt-[26px] px-[52px]': !isDesktop,
          'ml-[115px] pb-[55px] pt-[126px]': isDesktop,
        })}
      >
        {isDesktop ? (
          <LockForgotBigIcon className="mx-auto" />
        ) : (
          <LockForgotIcon />
        )}
      </div>
      <div className="px-4 mx-auto">
        <div
          className={cn('text-s-2xl font-semibold text-center', {
            'mb-[6px]': isDesktop,
            'mb-[12px]': !isDesktop,
          })}
        >
          Forgot your password?
        </div>
        <p className="text-base font-normal text-center text-blue-1">
          Enter the email address associated with your account.
        </p>
        <p
          className={cn('text-base font-normal text-center text-blue-1', {
            'mb-[35px]': isDesktop,
            'mb-[30px]': !isDesktop,
          })}
        >
          We will send you a link to reset your password.
        </p>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center w-full min-h-[154px]">
            <Input
              name="email"
              placeholder="Email Address"
              className="w-full !mt-0 max-w-[540px]"
              onClick={() => setSubmitFailed(false)}
              inputClassName={cn({
                'text-red border-red': submitFailed,
              })}
            />
            <Button
              className="mx-auto mt-auto max-w-[343px] mb-[31px]"
              disabled={disabled}
              mode={ButtonMode.FULL_PRIMARY}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </div>
          {isDesktop && (
            <Link href={{ pathname: ROUTES.LOGIN }}>
              <a className="font-semibold text-blue-1 text-s-lg mb-[16px]">
                Log In
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
export default withForm<LoginProps>(
  {
    enableReinitialize: true,
    initialValues: { email: '' },
    validationSchema: EMAIL_VALIDATION_SCHEMA,
    className: 'h-screen flex lg:h-full',
  },
  ForgotPasswordMobile
)
