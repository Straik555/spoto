import { DEFAULT_PHONE_CODE } from '@components/Form/Input/PhoneInput/constants'
import { ROUTES } from '@constants/routes'
import { faker } from '@faker-js/faker'

import { AppProvider } from '@pages/_app'
import VerifyPhoneRoute from '@pages/verify-phone'
import { act, fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import React from 'react'

const VerifyPhoneWithProvider: React.FC = () => (
  <AppProvider>
    <VerifyPhoneRoute />
  </AppProvider>
)

describe('pages/verify-phone', () => {
  const $elements = {
    inputs: {
      get phone() {
        return screen.findByPlaceholderText(/000000000/i)
      },
    },
    buttons: {
      get confirm() {
        return screen.findByRole('button', { name: /confirm/i })
      },
    },
  }

  const fillVerifyPhoneForm = async (formValues) => {
    const phoneInput = await $elements.inputs.phone

    fireEvent.focus(phoneInput)
    fireEvent.change(phoneInput, {
      target: { value: formValues.phone },
    })

    fireEvent.blur(phoneInput)
  }

  it('should be able to verify phone', async () => {
    await act(async () => {
      mockRouter.setCurrentUrl({
        pathname: ROUTES.VERIFY_PHONE,
        query: {
          confirmationCode: faker.datatype.hexaDecimal(10),
        },
      })
      await render(<VerifyPhoneWithProvider />)

      const formValues = {
        phone: faker.phone.phoneNumber(`+${DEFAULT_PHONE_CODE}##########`),
      }
      /** TODO: fix phone input  */
      await fillVerifyPhoneForm(formValues)

      const confirmButton = await $elements.buttons.confirm
      expect(confirmButton).not.toBeDisabled()

      // fireEvent(confirmButton, eventUtils.mouseClickEvent())

      // const [updatePhoneApiCallPromise, updatePhoneApiCallArgs] =
      //   await getRunningRequest(authenticationApi, 'updatePhone')

      // expect(updatePhoneApiCallPromise).toBeDefined()
      // expect(updatePhoneApiCallArgs).toEqual({ newPhone: formValues.phone })
    })
  })
})
