import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import mockRouter from 'next-router-mock'
import router from 'next/router'

import { AppProvider } from '@pages/_app'
import RegisterRoute from '@pages/register'
import { RegisterUserParams } from '@api/authentication/types'
import { eventUtils } from '@tests/unit/utils/eventUtils'
import { getRunningRequest } from '@tests/unit/utils/getRunningRequest'
import authenticationApi from '@api/authentication'
import { DEFAULT_PHONE_CODE } from '@components/Form/Input/PhoneInput/constants'
import { ROUTES } from '@constants/routes'

const RegisterWithProvider: React.FC = () => (
  <AppProvider>
    <RegisterRoute />
  </AppProvider>
)

describe('pages/register', () => {
  const $elements = {
    inputs: {
      get firstName() {
        return screen.findByPlaceholderText(/first name/i)
      },
      get lastName() {
        return screen.findByPlaceholderText(/last name/i)
      },
      get phone() {
        return screen.findByPlaceholderText(/000000000/i)
      },
      get email() {
        return screen.findByPlaceholderText(/email address/i)
      },
      get password() {
        return screen.findByPlaceholderText(/password/i)
      },
    },
    buttons: {
      get signUp() {
        return screen.findByRole('button', { name: /sign up/i })
      },
      get login() {
        return screen.findByText(/log in/i)
      },
    },
  }

  const fillRegisterForm = async (formValues) => {
    const firstNameInput = await $elements.inputs.firstName
    const lastNameInput = await $elements.inputs.lastName
    const phoneInput = await $elements.inputs.phone
    const emailInput = await $elements.inputs.email
    const passwordInput = await $elements.inputs.password

    fireEvent.focus(firstNameInput)
    fireEvent.change(firstNameInput, {
      target: { value: formValues.firstName },
    })

    fireEvent.focus(lastNameInput)
    fireEvent.change(lastNameInput, {
      target: { value: formValues.lastName },
    })

    if (formValues.email) {
      fireEvent.focus(emailInput)
      fireEvent.change(emailInput, {
        target: { value: formValues.email },
      })
    }

    fireEvent.focus(phoneInput)
    fireEvent.change(phoneInput, {
      target: { value: formValues.phone },
    })

    fireEvent.focus(passwordInput)
    fireEvent.change(passwordInput, {
      target: { value: formValues.password },
    })
    fireEvent.blur(passwordInput)
  }

  it('should be able to register user', async () => {
    await act(async () => {
      await render(<RegisterWithProvider />)

      const formValues: RegisterUserParams = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(`+${DEFAULT_PHONE_CODE}##########`),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      await fillRegisterForm(formValues)

      const signUpButton = await $elements.buttons.signUp
      expect(signUpButton).not.toBeDisabled()

      fireEvent(signUpButton, eventUtils.mouseClickEvent())

      const [registerUserApiCallPromise, registerUserApiCallArgs] =
        await getRunningRequest(authenticationApi, 'registerUser')

      expect(registerUserApiCallPromise).toBeDefined()
      expect(registerUserApiCallArgs).toEqual(formValues)
    })
  })

  it.skip('should redirect to login page on button click', async () => {
    await act(async () => {
      mockRouter.setCurrentUrl({
        pathname: ROUTES.REGISTER,
      })
      await render(<RegisterWithProvider />)

      const loginButton = await $elements.buttons.login
      fireEvent(loginButton, await eventUtils.mouseClickEvent())
      expect(router.asPath).toEqual(ROUTES.LOGIN)
    })
  })

  it.skip('should send registration request with email from query param', async () => {
    await act(async () => {
      const email = faker.internet.email()
      mockRouter.setCurrentUrl({
        pathname: ROUTES.REGISTER,
        query: {
          email,
        },
      })
      await render(<RegisterWithProvider />)

      const formValues = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(`+${DEFAULT_PHONE_CODE}##########`),
        password: faker.internet.password(),
      }
      await fillRegisterForm(formValues)

      const signUpButton = await $elements.buttons.signUp
      expect(signUpButton).not.toBeDisabled()

      fireEvent(signUpButton, eventUtils.mouseClickEvent())

      const [registerUserApiCallPromise, registerUserApiCallArgs] =
        await getRunningRequest(authenticationApi, 'registerUser')

      expect(registerUserApiCallPromise).toBeDefined()
      expect(registerUserApiCallArgs).toEqual({ ...formValues, email })
    })
  })

  it('should send registration request with invitationToken', async () => {
    await act(async () => {
      const invitationToken = faker.datatype.hexaDecimal(10)
      mockRouter.setCurrentUrl({
        pathname: ROUTES.REGISTER,
        query: {
          invitationToken,
        },
      })
      await render(<RegisterWithProvider />)

      const formValues = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(`+${DEFAULT_PHONE_CODE}444444444`),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }
      await fillRegisterForm(formValues)

      const signUpButton = await $elements.buttons.signUp
      expect(signUpButton).not.toBeDisabled()

      fireEvent(signUpButton, eventUtils.mouseClickEvent())

      const [registerUserApiCallPromise, registerUserApiCallArgs] =
        await getRunningRequest(authenticationApi, 'registerUser')
      expect(registerUserApiCallPromise).toBeDefined()
      expect(registerUserApiCallArgs).toEqual({
        ...formValues,
        invitationToken,
      })
    })
  })
})
