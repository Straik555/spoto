import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import TowerRoute from '@pages/house-manager/houses/[houseId]/[towerId]'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { houses, tower } from '@tests/unit/api/houseManager/fixtures'
import { authenticateAsHouseManager } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'

const TowerWithProvider: FC = () => {
  return (
    <AppProvider>
      <TowerRoute />
    </AppProvider>
  )
}

describe('pages/house-manager/houses/[houseId]/[towerId]', () => {
  beforeEach(async () => {
    await authenticateAsHouseManager()
  })

  const navigateToHouse = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOUSEMANAGER_HOUSE_TOWER,
      query: {
        houseId: `${houses[0].id}`,
        towerId: `${tower.id}`,
      },
    })
  }

  const $elements = {
    header: {
      get title() {
        return screen.findByText(`${houses[0].name}, ${tower.name}`)
      },
    },
    data: {
      get queryFirstApartment() {
        return screen.queryByText(tower.apartments[0].name)
      },
      get findFirstApartment() {
        return screen.findByText(tower.apartments[0].name)
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
      navigateToHouse()
      render(<TowerWithProvider />)

      const el = await $elements.header.title

      expect(el).toHaveTextContent(`${houses[0].name}, ${tower.name}`)
    })
  })

  it('should render all apartments', async () => {
    await act(async () => {
      navigateToHouse()
      render(<TowerWithProvider />)
      const houseOne = await $elements.data.findFirstApartment

      expect(houseOne).not.toBeNull()
    })
  })
})
