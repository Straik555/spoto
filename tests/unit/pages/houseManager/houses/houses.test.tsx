import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import HousesRoute from '@pages/house-manager/houses/index'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { houses } from '@tests/unit/api/houseManager/fixtures'
import { authenticateAsHouseManager } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'

const HousesWithProvider: FC = () => {
  return (
    <AppProvider>
      <HousesRoute />
    </AppProvider>
  )
}

describe('pages/house-manager/houses', () => {
  beforeEach(async () => {
    await authenticateAsHouseManager()
  })

  const navigateToHouses = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOUSEMANAGER_HOUSES,
    })
  }

  const $elements = {
    header: {
      get title() {
        return screen.findByTestId('Occupants-title')
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

  it('should render all Houses', async () => {
    await act(async () => {
      navigateToHouses()
      render(<HousesWithProvider />)
      const houseOne = await $elements.data.findFirstHouse
      const houseTwo = await $elements.data.findSecondHouse

      expect(houseOne).not.toBeNull()
      expect(houseTwo).not.toBeNull()
    })
  })
})
