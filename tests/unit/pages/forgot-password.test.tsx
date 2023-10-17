import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { AppProvider } from '@pages/_app'
import ForgotPasswordRoute from '@pages/forgot-password'
import { ResetProfilePasswordArgs } from '@api/profile/types'
import { eventUtils } from '@tests/unit/utils/eventUtils'
import { getRunningRequest } from '@tests/unit/utils/getRunningRequest'
import { profileApi } from '@api/profile'

const ForgotPasswordWithProvider = () => (
  <AppProvider>
    <ForgotPasswordRoute />
  </AppProvider>
)

describe('pages/forgot-password', () => {
  const $elements = {
    inputs: {
      get email() {
        return screen.findByPlaceholderText(/email address/i)
      },
    },
    buttons: {
      get send() {
        return screen.findByRole('button', { name: /send/i })
      },
    },
  }

  const fillForgotPasswordForm = async (
    formValues: ResetProfilePasswordArgs
  ) => {
    const emailInput = await $elements.inputs.email

    fireEvent.focus(emailInput)
    fireEvent.change(emailInput, {
      target: { value: formValues.email },
    })
    fireEvent.blur(emailInput)
  }

  it('should be able to send forgot password request', async () => {
    await act(async () => {
      await render(<ForgotPasswordWithProvider />)

      const formValues: ResetProfilePasswordArgs = {
        email: faker.internet.email(),
      }

      await fillForgotPasswordForm(formValues)

      const sendButton = await $elements.buttons.send
      expect(sendButton).not.toBeDisabled()

      fireEvent(sendButton, eventUtils.mouseClickEvent())

      const [
        resetProfilePasswordApiCallPromise,
        resetProfilePasswordApiCallArgs,
      ] = await getRunningRequest(profileApi, 'resetProfilePassword')

      expect(resetProfilePasswordApiCallPromise).toBeDefined()
      expect(resetProfilePasswordApiCallArgs).toEqual(formValues)
    })
  })
})
