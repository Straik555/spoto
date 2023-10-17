import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import router from 'next/router'

import { AppProvider } from '@pages/_app'
import ResetPasswordSuccessRoute from '@pages/reset-password-success'
import { eventUtils } from '@tests/unit/utils/eventUtils'
import { ROUTES } from '@constants/routes'

const ResetPasswordSuccessWithProvider = () => (
  <AppProvider>
    <ResetPasswordSuccessRoute />
  </AppProvider>
)

describe('pages/reset-password-success', () => {
  const $elements = {
    buttons: {
      get login() {
        return screen.findByText(/login/i)
      },
    },
  }

  it.skip('should redirect to login page on button click', async () => {
    await act(async () => {
      mockRouter.setCurrentUrl({
        pathname: ROUTES.RESET_PASSWORD_SUCCESS,
      })
      await render(<ResetPasswordSuccessWithProvider />)

      const loginLink = await $elements.buttons.login
      fireEvent(loginLink, await eventUtils.mouseClickEvent())
      expect(router.asPath).toEqual(ROUTES.LOGIN)
    })
  })
})
