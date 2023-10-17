import React, { FC } from 'react'
import { authenticateAsAdmin } from '@tests/unit/utils/auth'
import { AppProvider } from '@pages/_app'
import MyVisitorsRoute from '@pages/my-visitors'
import { act, render, screen, fireEvent } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { ROUTES } from '@constants/routes'

const GuestWithProvider: FC = () => {
  authenticateAsAdmin()

  return (
    <AppProvider>
      <MyVisitorsRoute />
    </AppProvider>
  )
}

describe('pages/guest/', () => {
  const navigateToGuest = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.MY_VISITORS,
    })
  }

  const $elements = {
    buttons: {
      get findGuestBtn() {
        return screen.findByRole('button', { name: 'New Booking' })
      },
    },
  }

  it('should go to the page Invite', async () => {
    await act(async () => {
      navigateToGuest()
      render(<GuestWithProvider />)

      fireEvent.click(await $elements.buttons.findGuestBtn)
    })
  })
})
