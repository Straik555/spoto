import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import DashboardRoute from '@pages/house-manager/dashboard/index'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import { authenticateAsHouseManager } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'

const VisitorParkingWithProvider: FC = () => {
  return (
    <AppProvider>
      <DashboardRoute />
    </AppProvider>
  )
}

describe('pages/dashboard', () => {
  beforeEach(async () => {
    await authenticateAsHouseManager()
  })

  const navigateToVisitorParking = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOUSEMANAGER_DASHBOARD,
    })
  }

  const $elements = {
    header: {
      get title() {
        return screen.findByTestId('Dashboard-title')
      },
    },
    data: {
      get queryAvailableSpots() {
        return screen.findByText('Available')
      },
      get queryOccupiedSpots() {
        return screen.findByText('Occupied')
      },
    },
    inputs: {
      get search() {
        return screen.findByRole('textbox', {
          name: /search/i,
        })
      },
    },
  }

  it('should has proper title', async () => {
    await act(async () => {
      navigateToVisitorParking()
      render(<VisitorParkingWithProvider />)

      const el = await $elements.header.title

      expect(el).toHaveTextContent('Dashboard')
    })
  })

  it('should render Spots counter', async () => {
    await act(async () => {
      navigateToVisitorParking()
      render(<VisitorParkingWithProvider />)
      const houseOne = await $elements.data.queryAvailableSpots
      const houseTwo = await $elements.data.queryOccupiedSpots

      expect(houseOne).not.toBeNull()
      expect(houseTwo).not.toBeNull()
    })
  })
})
