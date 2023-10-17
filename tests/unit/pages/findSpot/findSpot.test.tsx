import { ROUTES } from '@constants/routes'
import { AppProvider } from '@pages/_app'
import FindSpotRoute from '@pages/index'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { authenticateAsAdmin } from '@tests/unit/utils/auth'
import mockRouter from 'next-router-mock'
import React, { FC } from 'react'

const FindSpotWithProvider: FC = () => {
  authenticateAsAdmin()

  return (
    <AppProvider>
      <FindSpotRoute />
    </AppProvider>
  )
}

describe('pages/index', () => {
  const navigateToFindSpot = () => {
    mockRouter.setCurrentUrl({
      pathname: ROUTES.HOME,
    })
  }

  const $elements = {
    buttons: {
      get findSearchBtn() {
        return screen.findByRole('button', { name: 'Apply' })
      },
      get findSearchBtnSpecificLocation() {
        return screen.findByText('At a Specific Location')
      },
      get findSearchBtnNearMyCurrentLocation() {
        return screen.findByText('Near my current location')
      },
      get findSearchBtnSearch() {
        return screen.findByRole('button', { name: 'Search' })
      },
      get findBtnSelect() {
        return screen.findByRole('button', { name: 'Select' })
      },
      get findBtnChange() {
        return screen.findByRole('button', { name: 'Change' })
      },
      get findBtnBack() {
        return screen.findByText('Back')
      },
    },
    data: {
      get queryFindSpot() {
        return screen.queryByText('Sydney NSW, Australia')
      },
      get findFindSpot() {
        return screen.findByText('Sydney NSW, Australia')
      },
    },
    inputs: {
      get searchOpen() {
        return screen.findByTestId('findSpotControlsAddress')
      },
      get search() {
        return screen.findByTestId('findPlacesAutocomplete')
      },
      get onClickToday() {
        return screen.findByText('Today')
      },
      get onClickTodayNow() {
        return screen.findByText('Now')
      },
      get onClickTodayLater() {
        return screen.findByText('Later')
      },
      get onClickTodaySpecificDay() {
        return screen.findByText('Specific day')
      },
    },
  }

  it('should go to the input search', async () => {
    await act(async () => {
      navigateToFindSpot()
      render(<FindSpotWithProvider />)
    })

    fireEvent.click(await $elements.inputs.searchOpen)

    await $elements.data.findFindSpot
    const searchInput = await $elements.inputs.search

    expect(await $elements.buttons.findSearchBtn).toBeDisabled()

    act(() => {
      fireEvent.change(searchInput, { target: { value: '_' } })
    })

    expect(await $elements.buttons.findSearchBtn).not.toBeDisabled()
  })
})
