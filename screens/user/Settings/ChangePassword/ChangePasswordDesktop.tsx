import React from 'react'

import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import PasswordInput from '@components/Form/Input/PasswordInput'
import ProfileSettingsWrapperDesktop from '@screens/user/Settings/ProfileSettings/components/ProfileSettingsWrapper'
import ForgotPasswordModal from '@screens/auth/ForgotPassword/ForgotPasswordModal'

import useChangePassword from './useChangePassword'
import withChangePasswordForm from './withChangePasswordForm'

const ActionButtons = (props) => {
  const { disabled, handleClickPrimaryButton, handleClickSecondaryButton } =
    props
  return (
    <div className="flex">
      <Button
        className="whitespace-nowrap my-[18px]"
        mode={ButtonMode.FULL_SECONDARY}
        onClick={handleClickSecondaryButton}
      >
        Forgot Password
      </Button>

      <Button
        disabled={disabled}
        onClick={handleClickPrimaryButton}
        className="whitespace-nowrap my-[18px] !font-semibold"
        mode={ButtonMode.FULL_PRIMARY}
      >
        Save Changes
      </Button>
    </div>
  )
}

const ChangePasswordDesktop = () => {
  const [state, actions] = useChangePassword()

  const { disabled, forgotPasswordModal } = state
  const { handleSubmit, toggleForgotPasswordModal } = actions

  return (
    <ProfileSettingsWrapperDesktop
      headerTitle="Change password"
      headerRightContent={
        <ActionButtons
          disabled={disabled}
          handleClickPrimaryButton={handleSubmit}
          handleClickSecondaryButton={toggleForgotPasswordModal}
        />
      }
    >
      <div className="flex flex-col mt-6 mx-[75px]">
        <div className="text-text text-s-lg mb-9">
          You may update your password any time. We suggest you choose a strong
          password and update is regularly, e.g. every 6 months.
        </div>
        <div className="flex">
          <div className="w-full">
            <PasswordInput
              name="currentPassword"
              placeholder="Current Password"
              label="Current Password"
              className="mb-6 w-[calc(50%-8px)]"
            />
            <div className="flex">
              <PasswordInput
                name="newPassword"
                placeholder="New Password"
                label="New Password"
                className="flex-1 mr-4"
              />
              <PasswordInput
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                label="Confirm New Password"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
      {forgotPasswordModal && (
        <ForgotPasswordModal onClose={toggleForgotPasswordModal} />
      )}
    </ProfileSettingsWrapperDesktop>
  )
}

export default withChangePasswordForm(ChangePasswordDesktop)
