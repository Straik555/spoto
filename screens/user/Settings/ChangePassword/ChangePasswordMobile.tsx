import React from 'react'
import Link from 'next/link'

import { ButtonMode } from '@components/Button/Button.model'
import { Button } from '@components/index'
import PasswordInput from '@components/Form/Input/PasswordInput'
import { PageHeaderMobile } from '@components/PageHeader'
import Title from '@components/Title/Title'
import { ROUTES } from '@constants/routes'

import useChangePassword from './useChangePassword'
import withChangePasswordForm from './withChangePasswordForm'

const PASSWORD_FIELDS = [
  {
    name: 'currentPassword',
    label: 'Current Password',
  },
  {
    name: 'newPassword',
    label: 'New Password',
  },
  {
    name: 'confirmNewPassword',
    label: 'Confirm New Password',
  },
]

const ChangePasswordMobile: React.FC = () => {
  const [state, actions] = useChangePassword()
  const { disabled } = state
  const { handleSubmit } = actions

  return (
    <div className="flex flex-col h-full">
      <PageHeaderMobile title="Change Password" />
      <div className="flex flex-col p-4 grow">
        <div className="font-semibold text-s-lg mb-[10px]">Change Password</div>
        <div className="mb-[4px] text-text text-s-sm">
          You may update your password any time.
        </div>
        {PASSWORD_FIELDS.map(({ name, label }) => (
          <PasswordInput
            trim
            key={name}
            name={name}
            placeholder={label}
            label={label}
          />
        ))}
        <div className="flex flex-col mt-auto">
          <Button
            className="mb-[10px]"
            disabled={disabled}
            mode={ButtonMode.FULL_PRIMARY}
            onClick={handleSubmit}
          >
            <Title as="span">Save changes</Title>
          </Button>
          <Link href={ROUTES.FORGOT_PASSWORD}>
            <a className="w-full font-semibold text-center text-primary text-s-lg">
              Forgot Password
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withChangePasswordForm(ChangePasswordMobile)
