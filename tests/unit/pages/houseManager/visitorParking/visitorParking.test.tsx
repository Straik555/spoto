import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import VisitorParkingRoute from '@pages/house-manager/visitor-parking/index'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { houses } from '@tests/unit/api/houseManager/fixtures'
import { authenticateAsHouseManager } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'

const VisitorParkingWithProvider: FC = () => {
  return (
    <AppProvider>
      <VisitorParkingRoute />
    </AppProvider>
  )
}

describe('pages/house-manager/visitor-parking', () => {
  beforeEach(async () => {
    await authenticateAsHouseManager()
  })

  const navigateToVisitorParking = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING,
    })
  }

  const $elements = {
    header: {
      get title() {
        return screen.findByTestId('Spots-title')
      },
    },
    data: {
      get queryFirstHouse() {
        return screen.queryByText(houses[0].name)
      },
      get findFirstHouse() {
        return screen.findByText(houses[0].name)
      },
      get querySecondHouse() {
        return screen.queryByText(houses[1].name)
      },
      get findSecondHouse() {
        return screen.findByText(houses[1].name)
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

      expect(el).toHaveTextContent('Spots')
    })
  })

  it('should render all Houses', async () => {
    await act(async () => {
      navigateToVisitorParking()
      render(<VisitorParkingWithProvider />)
      const houseOne = await $elements.data.findFirstHouse
      const houseTwo = await $elements.data.findSecondHouse

      expect(houseOne).not.toBeNull()
      expect(houseTwo).not.toBeNull()
    })
  })
})
