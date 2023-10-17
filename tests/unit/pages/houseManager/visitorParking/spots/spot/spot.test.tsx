import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import SpotParkingRoute from '@pages/house-manager/visitor-parking/[houseId]/[spotId]'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { houses, houseSpots } from '@tests/unit/api/houseManager/fixtures'
import { authenticateAsHouseManager } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'
import { eventUtils } from '@tests/unit/utils/eventUtils'

const SpotWithProvider: FC = () => {
  return (
    <AppProvider>
      <SpotParkingRoute />
    </AppProvider>
  )
}

describe(`pages/houseManager/visitorParking/[houseId]/[spotId]`, () => {
  beforeEach(async () => {
    await authenticateAsHouseManager()
  })

  const navigateToSpot = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOT,
      query: {
        houseId: `${houses[0].id}`,
        spotId: `${houseSpots[0].id}`,
      },
    })
  }

  const $elements = {
    header: {
      get title() {
        return screen.findByText(`Spot ${houseSpots[0].name}`)
      },
    },
    tabs: {
      get main() {
        return screen.findByText('Main')
      },
      get spollard() {
        return screen.findByText('Spollard')
      },
    },
  }

  it('should has proper title', async () => {
    await act(async () => {
      navigateToSpot()
      render(<SpotWithProvider />)

      const el = await $elements.header.title

      expect(el).toHaveTextContent(`Spot ${houseSpots[0].name}`)
    })
  })

  it('should switch between top level tabs', async () => {
    await act(async () => {
      navigateToSpot()
      render(<SpotWithProvider />)

      const mainTab = await $elements.tabs.main
      const spollardTab = await $elements.tabs.spollard

      expect(mainTab).toHaveAttribute('aria-selected', 'true')

      fireEvent(spollardTab, eventUtils.mouseClickEvent())

      expect(spollardTab).toHaveAttribute('aria-selected', 'true')
    })
  })
})
