import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import ConfirmEmail from '@screens/auth/Register/ConfirmEmail/ConfirmEmail'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import PhoneInput from '@components/Form/Input/PhoneInput/PhoneInput'
import { DEFAULT_PHONE_CODE } from '@components/Form/Input/PhoneInput/constants'
import Input from '@components/Form/Input/Input'
import PasswordInput from '@components/Form/Input/PasswordInput'
import { RegisterUserParams } from '@api/authentication/types'
import { ROUTES } from '@constants/routes'
import AuthHeader from '@screens/auth/components/AuthHeader/AuthHeader'
import { withForm } from '@components/Form/withForm'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

import { RegisterProps } from './Register.model'
import useRegister from './useRegister'
import { REGISTER_VALIDATION_SCHEMA } from './validation'

const initialFormData: RegisterUserParams = {
  firstName: '',
  lastName: '',
  phone: DEFAULT_PHONE_CODE,
  email: '',
  password: '',
}

const RegisterMobile: React.FC<RegisterProps> = (props) => {
  const { isDesktop } = useDeviceInfo()
  const [state, actions] = useRegister(props)
  const {
    disabled,
    inputClassName,
    isSuccess,
    userEmail,
    houseName,
    prefilledUsernameOrEmail,
  } = state
  const { handleSubmit, switchToLogin } = actions

  if (isSuccess) {
    return <ConfirmEmail userEmail={userEmail} />
  }

  return (
    <div
      className={cn('flex flex-col items-center w-full pb-[16px]', {
        'pt-[16px] my-auto': !houseName && !isDesktop,
        'pt-[100px]': !houseName && isDesktop,
      })}
    >
      <AuthHeader houseName={houseName} />
      <div className="font-semibold text-center uppercase text-[28px] leading-[42px] mb-[5px]">
        Sign up
      </div>
      <div className="text-center text-s-xl text-blue-1 leading-[27px] mb-[35px]">
        Enter your details below
      </div>
      <div className="flex flex-col items-center justify-between w-full px-[16px] min-h-[379px]">
        <div className="w-full max-w-[540px]">
          <Input
            trim
            className={inputClassName}
            name="firstName"
            placeholder="First Name"
          />
          <Input
            trim
            className={inputClassName}
            name="lastName"
            placeholder="Last Name"
          />
          <PhoneInput wrapperClassName={inputClassName} name="phone" />
          <Input
            trim
            className={inputClassName}
            name="email"
            key={prefilledUsernameOrEmail}
            placeholder="Email Address"
          />
          <PasswordInput
            trim
            className={inputClassName}
            name="password"
            placeholder="Password"
          />
        </div>
        <Button
          disabled={disabled}
          className="mx-auto mb-[20px] text-s-lg max-w-[343px]"
          mode={ButtonMode.FULL_PRIMARY}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-s-lg text-blue-1 mb-[20px]">
          Already have an account?
        </div>
        <Button
          className="w-[95px] py-[11px] text-s-sm"
          mode={ButtonMode.SMALL}
        >
          {switchToLogin ? (
            <span className="cursor-pointer" onClick={switchToLogin}>
              Log In
            </span>
          ) : (
            <Link href={{ pathname: ROUTES.LOGIN }}>
              <a>Log In</a>
            </Link>
          )}
        </Button>
      </div>
    </div>
  )
}

export default withForm<RegisterProps>(
  {
    initialValues: initialFormData,
    validationSchema: REGISTER_VALIDATION_SCHEMA,
    className: 'h-screen flex',
  },
  RegisterMobile
)
