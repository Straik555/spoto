import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import HouseRoute from '@pages/house-manager/houses/[houseId]'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { houses, towers } from '@tests/unit/api/houseManager/fixtures'
import { authenticateAsHouseManager } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'

const HouseWithProvider: FC = () => {
  return (
    <AppProvider>
      <HouseRoute />
    </AppProvider>
  )
}

describe('pages/house-manager/houses/[houseId]', () => {
  beforeEach(async () => {
    await authenticateAsHouseManager()
  })

  const navigateToHouse = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOUSEMANAGER_HOUSE,
      query: {
        houseId: `${houses[0].id}`,
      },
    })
  }

  const $elements = {
    header: {
      get title() {
        return screen.findByText(houses[0].name)
      },
    },
    data: {
      get queryFirstTower() {
        return screen.queryByText(towers[0].name)
      },
      get findFirstTower() {
        return screen.findByText(towers[0].name)
      },
      get querySecondTower() {
        return screen.queryByText(towers[1].name)
      },
      get findSecondTower() {
        return screen.findByText(towers[1].name)
      },
    },
  }

  it('should has proper title', async () => {
    await act(async () => {
      navigateToHouse()
      render(<HouseWithProvider />)

      const el = await $elements.header.title

      expect(el).toHaveTextContent(houses[0].name)
    })
  })

  it('should render all towers', async () => {
    await act(async () => {
      navigateToHouse()
      render(<HouseWithProvider />)
      const houseOne = await $elements.data.findFirstTower
      const houseTwo = await $elements.data.findSecondTower

      expect(houseOne).not.toBeNull()
      expect(houseTwo).not.toBeNull()
    })
  })
})
