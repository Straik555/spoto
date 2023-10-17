import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import SpotsParkingRoute from '@pages/house-manager/visitor-parking/[houseId]'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { houses, houseSpots } from '@tests/unit/api/houseManager/fixtures'
import { authenticateAsHouseManager } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'
import { eventUtils } from '@tests/unit/utils/eventUtils'
import { elementUtils } from '@tests/unit/utils/elementUtils'
import { getRunningRequest } from '@tests/unit/utils/getRunningRequest'
import { spotApi } from '@api/spot'

const SpotsWithProvider: FC = () => {
  return (
    <AppProvider>
      <SpotsParkingRoute />
    </AppProvider>
  )
}

describe(`pages/houseManager/visitorParking/[houseId]`, () => {
  beforeEach(async () => {
    await authenticateAsHouseManager()
  })

  const navigateToSpots = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOUSEMANAGER_VISITOR_PARKING_SPOTS,
      query: {
        houseId: `${houses[0].id}`,
      },
    })
  }

  const $elements = {
    header: {
      get title() {
        return screen.findByText(`${houses[0].name}`)
      },
    },
    data: {
      get queryFirstHouseSpot() {
        return screen.queryByText(houseSpots[0].name)
      },
      get findFirstHouseSpot() {
        return screen.findByText(houseSpots[0].name)
      },
      get querySecondHouseSpot() {
        return screen.queryByText(houseSpots[1].name)
      },
      get findSecondHouseSpot() {
        return screen.findByText(houseSpots[1].name)
      },
    },
    buttons: {
      get addSpotBtn() {
        return screen.findByText('Add Spot')
      },
      get deleteSpotBtn() {
        return screen.findByRole('button', { name: /delete houseSpot/i })
      },
    },
  }

  it('should has proper title', async () => {
    await act(async () => {
      navigateToSpots()
      render(<SpotsWithProvider />)

      const el = await $elements.header.title

      expect(el).toHaveTextContent(houses[0].name)
    })
  })

  it('should render all Spots', async () => {
    await act(async () => {
      navigateToSpots()
      render(<SpotsWithProvider />)
      const houseOne = await $elements.data.findFirstHouseSpot

      expect(houseOne).not.toBeNull()
    })
  })

  it('should delete Spot', async () => {
    await act(async () => {
      navigateToSpots()
      render(<SpotsWithProvider />)

      await $elements.data.findFirstHouseSpot

      fireEvent(
        await $elements.buttons.deleteSpotBtn,
        eventUtils.mouseClickEvent()
      )
      fireEvent(
        await elementUtils.deleteConfirmationBtn,
        eventUtils.mouseClickEvent()
      )

      const [deleteSpotPromise, deleteSpotArgs] = await getRunningRequest(
        spotApi,
        'deleteSpotById'
      )
      expect(deleteSpotPromise).toBeDefined()
      expect(deleteSpotArgs).toEqual(houseSpots[0].id)
    })
  })
})
