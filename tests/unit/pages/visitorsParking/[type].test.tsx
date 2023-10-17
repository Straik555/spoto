import React, { FC } from 'react'
import { authenticateAsAdmin } from '@tests/unit/utils/auth'
import { AppProvider } from '@pages/_app'
import VisitorsParkingRoute from '@pages/visitors-parking'
import { act, render, screen, fireEvent } from '@testing-library/react'

const InviteWithProvider: FC = () => {
  authenticateAsAdmin()

  return (
    <AppProvider>
      <VisitorsParkingRoute />
    </AppProvider>
  )
}

describe('InviteRoute', () => {
  const $elements = {
    inputs: {
      get findInputEmail() {
        return screen.findByRole('textbox', { name: 'input' })
      },
      get findInputStartTime() {
        return screen.findByRole('input', { name: 'startTime' })
      },
      get findInputEndTime() {
        return screen.findByRole('input', { name: 'endTime' })
      },
    },
    buttons: {
      get findStartDate() {
        return screen.findByRole('button', { name: 'startData' })
      },
      get findEndDate() {
        return screen.findByRole('button', { name: 'endData' })
      },
      get findButtonSave() {
        return screen.findByRole('button', { name: 'Save' })
      },
    },
  }

  it('renders availability data', async () => {
    await act(async () => {
      render(<InviteWithProvider />)
    })
  })
})
