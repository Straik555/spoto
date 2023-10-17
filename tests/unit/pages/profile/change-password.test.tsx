import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import router from 'next/router'

import { AppProvider } from '@pages/_app'
import ChangePasswordRoute from '@pages/profile/change-password'
import { eventUtils } from '@tests/unit/utils/eventUtils'
import { getRunningRequest } from '@tests/unit/utils/getRunningRequest'
import { profileApi } from '@api/profile'
import { ChangePasswordFormValues } from '@screens/user/Settings/ChangePassword/ChangePassword.model'
import { ResetForm } from '@constants/types'
import { ROUTES } from '@constants/routes'

const ChangePasswordWithProvider = () => (
  <AppProvider>
    <ChangePasswordRoute />
  </AppProvider>
)

describe('pages/profile/change-password', () => {
  const $elements = {
    inputs: {
      get currentPassword() {
        return screen.findByPlaceholderText(/current password/i)
      },
      get newPassword() {
        return screen.findByPlaceholderText('New Password')
      },
      get confirmNewPassword() {
        return screen.findByPlaceholderText(/confirm new password/i)
      },
    },
    buttons: {
      get saveChanges() {
        return screen.findByRole('button', { name: /save changes/i })
      },
      get resetPassword() {
        return screen.findByText(/reset password/i)
      },
    },
  }

  const fillChangePasswordForm = async (
    formValues: ChangePasswordFormValues & ResetForm
  ) => {
    const currentPasswordInput = await $elements.inputs.currentPassword
    const newPasswordInput = await $elements.inputs.newPassword
    const confirmNewPasswordInput = await $elements.inputs.confirmNewPassword

    fireEvent.focus(currentPasswordInput)
    fireEvent.change(currentPasswordInput, {
      target: { value: formValues.currentPassword },
    })

    fireEvent.focus(newPasswordInput)
    fireEvent.change(newPasswordInput, {
      target: { value: formValues.newPassword },
    })

    fireEvent.focus(confirmNewPasswordInput)
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: formValues.confirmNewPassword },
    })
    fireEvent.blur(confirmNewPasswordInput)
  }

  it('should be able to send change password request', async () => {
    await act(async () => {
      await render(<ChangePasswordWithProvider />)

      const newPasswordFormValue = faker.internet.password()
      const confirmNewPassword = newPasswordFormValue

      const formValues: ChangePasswordFormValues = {
        currentPassword: faker.internet.password(),
        newPassword: newPasswordFormValue,
      }

      await fillChangePasswordForm({ ...formValues, confirmNewPassword })

      const saveChangesButton = await $elements.buttons.saveChanges
      expect(saveChangesButton).not.toBeDisabled()

      fireEvent(saveChangesButton, eventUtils.mouseClickEvent())

      const [
        changeProfilePasswordApiCallPromise,
        changeProfilePasswordApiCallArgs,
      ] = await getRunningRequest(profileApi, 'changeProfilePassword')

      expect(changeProfilePasswordApiCallPromise).toBeDefined()
      expect(changeProfilePasswordApiCallArgs).toEqual(formValues)
    })
  })

  it.skip('should redirect to forgot password page on link click', async () => {
    await act(async () => {
      await render(<ChangePasswordWithProvider />)

      const resetPasswordLink = await $elements.buttons.resetPassword
      fireEvent(resetPasswordLink, await eventUtils.mouseClickEvent())
      expect(router.asPath).toEqual(ROUTES.FORGOT_PASSWORD)
    })
  })
})
