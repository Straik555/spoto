import { ButtonMode } from '@components/Button/Button.model'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import Input from '@components/Form/Input/Input'
import PasswordInput from '@components/Form/Input/PasswordInput'
import { withForm } from '@components/Form/withForm'

import { Button } from '@components/index'
import Loader from '@components/Loader/Loader'
import Title from '@components/Title/Title'
import { ROUTES } from '@constants/routes'
import AuthHeader from '@screens/auth/components/AuthHeader/AuthHeader'
import cn from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'
import { AuthenticateUserFormValues, LoginProps } from './Login.model'

import useLogin from './useLogin'
import { LOGIN_VALIDATION_SCHEMA } from './validation'

const initialFormData: AuthenticateUserFormValues = {
  email: '',
  password: '',
}

const LoginMobile: FC<LoginProps> = (props) => {
  const { isDesktop } = useDeviceInfo()
  const [state, actions] = useLogin(props)
  const { disabled, loading } = state
  const { handleSubmit, switchToRegister } = actions

  return (
    <Loader loading={loading} className="mx-auto">
      <div
        className={cn('flex flex-col items-center w-full', {
          'pt-[100px]': isDesktop,
          'my-auto p-[16px]': !isDesktop,
        })}
      >
        <AuthHeader />

        <div
          className={cn('font-semibold uppercase text-[28px] leading-[42px]', {
            'mb-[10px]': !isDesktop,
          })}
        >
          Login
        </div>
        <div
          className={cn('text-s-xl text-blue-1', {
            'mb-[35px]': isDesktop,
            'mb-[31px]': !isDesktop,
          })}
        >
          Enter your details to log in
        </div>
        <Input
          trim
          className={cn('!mt-0 w-full max-w-[540px]', {
            'mb-[15px]': isDesktop,
            'mb-[10px]': !isDesktop,
          })}
          name="email"
          placeholder="Email Address"
        />

        <PasswordInput
          trim
          className={cn('w-full !mt-0 max-w-[540px]', {
            'mb-[5px]': isDesktop,
            'mb-[10px]': !isDesktop,
          })}
          name="password"
          placeholder="Password"
        />

        <div
          className={cn('flex justify-end w-full max-w-[540px]', {
            'mb-[12px]': isDesktop,
            'mb-[27px]': !isDesktop,
          })}
        >
          <Link
            href={{
              pathname: ROUTES.FORGOT_PASSWORD,
            }}
          >
            <a>
              <Title as="span" className="font-semibold text-s-sm text-blue-1">
                Forgot Password?
              </Title>
            </a>
          </Link>
        </div>
        <Button
          className="mx-auto mb-[20px] max-w-[343px]"
          disabled={disabled}
          mode={ButtonMode.FULL_PRIMARY}
          onClick={handleSubmit}
          type="submit"
        >
          <Title as="span">Log In</Title>
        </Button>

        <div className="flex flex-col items-center">
          <div className="text-blue-1 mb-[20px] text-s-lg">
            Don't have an account?
          </div>
          <Button
            className="w-[95px] py-[11px] text-s-sm px-[24px]"
            mode={ButtonMode.SMALL}
          >
            {switchToRegister ? (
              <Title as="span" onClick={switchToRegister}>
                Sign up
              </Title>
            ) : (
              <Link
                href={{
                  pathname: ROUTES.REGISTER,
                }}
              >
                <a>
                  <Title as="span">Sign up</Title>
                </a>
              </Link>
            )}
          </Button>
        </div>
      </div>
    </Loader>
  )
}

export default withForm<LoginProps>(
  {
    enableReinitialize: true,
    initialValues: initialFormData,
    validationSchema: LOGIN_VALIDATION_SCHEMA,
    className: 'h-screen flex lg:h-full',
  },
  LoginMobile
)
