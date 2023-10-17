import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import router from 'next/router'
import mockRouter from 'next-router-mock'
import { faker } from '@faker-js/faker'

import { AppProvider } from '@pages/_app'
import LoginRoute from '@pages/login'
import { AuthenticateUserParams } from '@api/authentication/types'
import { eventUtils } from '@tests/unit/utils/eventUtils'
import { getRunningRequest } from '@tests/unit/utils/getRunningRequest'
import authenticationApi from '@api/authentication'
import { ROUTES } from '@constants/routes'

const LoginWithProvider: React.FC = () => (
  <AppProvider>
    <LoginRoute />
  </AppProvider>
)

describe('pages/login', () => {
  const $elements = {
    inputs: {
      get usernameOrEmail() {
        return screen.findByPlaceholderText(/email address/i)
      },
      get password() {
        return screen.findByPlaceholderText(/password/i)
      },
    },
    buttons: {
      get login() {
        return screen.findByRole('button', { name: /log in/i })
      },
      get signUp() {
        return screen.findByText(/sign up/i)
      },
      get forgotPassword() {
        return screen.findByText(/forgot password?/i)
      },
    },
  }

  const fillLoginForm = async (formValues: AuthenticateUserParams) => {
    const usernameOrEmailInput = await $elements.inputs.usernameOrEmail
    const passwordInput = await $elements.inputs.password

    fireEvent.focus(passwordInput)
    fireEvent.change(passwordInput, {
      target: { value: formValues.password },
    })

    fireEvent.focus(usernameOrEmailInput)
    fireEvent.change(usernameOrEmailInput, {
      target: { value: formValues.usernameOrEmail },
    })
    fireEvent.blur(usernameOrEmailInput)
  }

  it.skip('should be able to authenticate user', async () => {
    await act(async () => {
      await render(<LoginWithProvider />)

      const formValues: AuthenticateUserParams = {
        usernameOrEmail: faker.internet.email(),
        password: faker.internet.password(),
      }

      await fillLoginForm(formValues)

      const loginButton = await $elements.buttons.login
      expect(loginButton).not.toBeDisabled()

      fireEvent(loginButton, eventUtils.mouseClickEvent())

      const [authenticateUserApiCallPromise, authenticateUserApiCallArgs] =
        await getRunningRequest(authenticationApi, 'authenticateUser')

      expect(authenticateUserApiCallPromise).toBeDefined()
      expect(authenticateUserApiCallArgs).toEqual(formValues)
    })
  })

  it.skip('should redirect to register page on button click', async () => {
    await act(async () => {
      mockRouter.setCurrentUrl({
        pathname: ROUTES.LOGIN,
      })
      await render(<LoginWithProvider />)

      const signUpButton = await $elements.buttons.signUp
      fireEvent(signUpButton, await eventUtils.mouseClickEvent())
      expect(router.asPath).toEqual(ROUTES.REGISTER)
    })
  })

  it.skip('should redirect to forgot password page on link click', async () => {
    await act(async () => {
      mockRouter.setCurrentUrl({
        pathname: ROUTES.LOGIN,
      })
      await render(<LoginWithProvider />)

      const forgotPasswordLink = await $elements.buttons.forgotPassword
      fireEvent(forgotPasswordLink, await eventUtils.mouseClickEvent())
      expect(router.asPath).toEqual(ROUTES.FORGOT_PASSWORD)
    })
  })
})
